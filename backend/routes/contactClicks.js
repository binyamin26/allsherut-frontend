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
    console.log(`📞 contact-click: provider=${provider_id} type=${click_type}`);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ contact-clicks POST:', error.message);
    res.status(500).json({ success: false });
  }
});

// GET /api/contact-clicks/my-clicks?period=month&page=1&limit=20
// period: today | week | month | year | all  (default: month)
router.get('/my-clicks', authenticateToken, async (req, res) => {
  try {
    const spRows = await query(
      'SELECT id FROM service_providers WHERE user_id = ? LIMIT 1',
      [req.user.userId]
    );
    if (!spRows.length) {
      return res.json({ success: true, clicks: [], monthly: { call: 0, whatsapp: 0, total: 0 }, pagination: { page: 1, totalPages: 1, total: 0 } });
    }

    const providerId = spRows[0].id;
    const period = req.query.period || 'month';
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 20;
    const offset = (page - 1) * limit;

    // Monthly totals (always current calendar month)
    const monthlyRows = await query(
      `SELECT click_type, COUNT(*) as cnt
       FROM contact_clicks
       WHERE provider_id = ?
         AND YEAR(clicked_at) = YEAR(NOW())
         AND MONTH(clicked_at) = MONTH(NOW())
       GROUP BY click_type`,
      [providerId]
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
      `SELECT COUNT(*) as total FROM contact_clicks WHERE provider_id = ? ${periodWhere}`,
      [providerId]
    );
    const total = Number(countRows[0].total);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    // Paginated clicks
    const clicks = await query(
      `SELECT id, click_type, clicked_at
       FROM contact_clicks
       WHERE provider_id = ? ${periodWhere}
       ORDER BY clicked_at DESC
       LIMIT ? OFFSET ?`,
      [providerId, limit, offset]
    );

    res.json({ success: true, clicks, monthly, pagination: { page, totalPages, total, limit } });
  } catch (error) {
    console.error('❌ contact-clicks GET:', error.message);
    res.status(500).json({ success: false, clicks: [], monthly: { call: 0, whatsapp: 0, total: 0 }, pagination: { page: 1, totalPages: 1, total: 0 } });
  }
});

module.exports = router;
