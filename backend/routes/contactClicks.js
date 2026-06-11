const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'נדרש אימות' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'טוקן לא תקין' });
    req.user = user;
    next();
  });
};

// POST /api/contact-clicks — public, log a click
router.post('/', async (req, res) => {
  try {
    const { provider_id, click_type } = req.body;
    if (!provider_id || !['call', 'whatsapp'].includes(click_type)) {
      return res.status(400).json({ success: false, message: 'Invalid payload' });
    }
    await query(
      'INSERT INTO contact_clicks (provider_id, click_type) VALUES (?, ?)',
      [provider_id, click_type]
    );
    const lastId = await query('SELECT LAST_INSERT_ID() as newId');
    const newId = lastId[0]?.newId;
    console.log(`📞 contact-click: provider=${provider_id} type=${click_type} newId=${newId}`);
    res.json({ success: true, newId, insertedProviderId: provider_id });
  } catch (error) {
    console.error('❌ contact-clicks POST:', error.message);
    res.status(500).json({ success: false });
  }
});

// GET /api/contact-clicks/my-clicks?period=month&page=1&limit=20
// period: today | week | month | year | all  (default: month)
router.get('/my-clicks', authenticateToken, async (req, res) => {
  try {
    console.log(`📊 my-clicks: userId=${req.user.userId} period=${req.query.period}`);
    // Get ALL provider records for this user (handles duplicate/migrated records)
    const spRows = await query(
      'SELECT id FROM service_providers WHERE user_id = ?',
      [req.user.userId]
    );
    if (!spRows.length) {
      return res.json({ success: true, clicks: [], monthly: { call: 0, whatsapp: 0, total: 0 }, pagination: { page: 1, totalPages: 1, total: 0 } });
    }

    const providerIds = spRows.map(r => r.id);
    const inClause = providerIds.map(() => '?').join(',');
    console.log(`📊 my-clicks: userId=${req.user.userId} providerIds=${providerIds}`);

    const period = req.query.period || 'month';
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 20;
    const offset = (page - 1) * limit;

    // Monthly totals (always current calendar month)
    const monthlyRows = await query(
      `SELECT click_type, COUNT(*) as cnt
       FROM contact_clicks
       WHERE provider_id IN (${inClause})
         AND YEAR(clicked_at) = YEAR(NOW())
         AND MONTH(clicked_at) = MONTH(NOW())
       GROUP BY click_type`,
      providerIds
    );
    const monthly = { call: 0, whatsapp: 0, total: 0 };
    monthlyRows.forEach(r => { monthly[r.click_type] = Number(r.cnt); });
    monthly.total = monthly.call + monthly.whatsapp;

    // Period WHERE clause
    const periodWhere = {
      today: `AND DATE(clicked_at) = CURDATE()`,
      week:  `AND clicked_at >= NOW() - INTERVAL 7 DAY`,
      month: `AND YEAR(clicked_at) = YEAR(NOW()) AND MONTH(clicked_at) = MONTH(NOW())`,
      year:  `AND YEAR(clicked_at) = YEAR(NOW())`,
      all:   ``
    }[period] || `AND YEAR(clicked_at) = YEAR(NOW()) AND MONTH(clicked_at) = MONTH(NOW())`;

    // Count for pagination
    const countRows = await query(
      `SELECT COUNT(*) as total FROM contact_clicks WHERE provider_id IN (${inClause}) ${periodWhere}`,
      providerIds
    );
    const total = Number(countRows[0].total);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    // Paginated clicks
    const clicks = await query(
      `SELECT id, click_type, clicked_at
       FROM contact_clicks
       WHERE provider_id IN (${inClause}) ${periodWhere}
       ORDER BY clicked_at DESC
       LIMIT ? OFFSET ?`,
      [...providerIds, limit, offset]
    );

    res.json({ success: true, clicks, monthly, pagination: { page, totalPages, total, limit }, _providerIds: providerIds });
  } catch (error) {
    console.error('❌ contact-clicks GET:', error.message);
    res.status(500).json({ success: false, clicks: [], monthly: { call: 0, whatsapp: 0, total: 0 }, pagination: { page: 1, totalPages: 1, total: 0 } });
  }
});

// POST /api/contact-clicks/claim-provider — link an orphan provider record to the logged-in user
// Body: { provider_id: 213 }
// Allowed if provider's current user_id no longer exists in users table (truly orphaned)
router.post('/claim-provider', authenticateToken, async (req, res) => {
  try {
    const { provider_id } = req.body;
    if (!provider_id) return res.status(400).json({ success: false, message: 'provider_id requis' });

    const rows = await query(
      `SELECT sp.id, sp.user_id,
              (SELECT COUNT(*) FROM users u WHERE u.id = sp.user_id) AS owner_exists
       FROM service_providers sp WHERE sp.id = ?`,
      [provider_id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Provider introuvable' });

    const { user_id: currentOwner, owner_exists } = rows[0];

    // Allow claim if: no owner, or owner account no longer exists, or already same user
    if (owner_exists > 0 && currentOwner !== req.user.userId) {
      return res.status(403).json({ success: false, message: `Ce provider appartient à un compte actif (userId=${currentOwner})` });
    }

    await query('UPDATE service_providers SET user_id = ? WHERE id = ?', [req.user.userId, provider_id]);
    console.log(`🔗 claim-provider: userId=${req.user.userId} claimed providerId=${provider_id} (was userId=${currentOwner})`);
    res.json({ success: true, message: `Provider ${provider_id} lié à userId ${req.user.userId}` });
  } catch (error) {
    console.error('❌ claim-provider:', error.message);
    res.status(500).json({ success: false });
  }
});

// GET /api/contact-clicks/claim/:providerId — same as POST but as GET for easy browser use
router.get('/claim/:providerId', authenticateToken, async (req, res) => {
  try {
    const provider_id = parseInt(req.params.providerId);
    if (!provider_id) return res.status(400).json({ success: false, message: 'provider_id invalide' });

    const rows = await query(
      `SELECT sp.id, sp.user_id,
              (SELECT COUNT(*) FROM users u WHERE u.id = sp.user_id) AS owner_exists
       FROM service_providers sp WHERE sp.id = ?`,
      [provider_id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Provider introuvable' });

    const { user_id: currentOwner, owner_exists } = rows[0];
    if (owner_exists > 0 && currentOwner !== req.user.userId) {
      return res.status(403).json({ success: false, message: `Provider appartient à un compte actif (userId=${currentOwner})` });
    }

    await query('UPDATE service_providers SET user_id = ? WHERE id = ?', [req.user.userId, provider_id]);
    console.log(`🔗 claim GET: userId=${req.user.userId} claimed providerId=${provider_id}`);
    res.json({ success: true, message: `Provider ${provider_id} lié à userId ${req.user.userId}` });
  } catch (error) {
    console.error('❌ claim GET:', error.message);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
