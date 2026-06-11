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
    res.json({ success: true });
  } catch (error) {
    console.error('❌ contact-clicks POST:', error.message);
    res.status(500).json({ success: false });
  }
});

// GET /api/contact-clicks/my-clicks — provider only
router.get('/my-clicks', authenticateToken, async (req, res) => {
  try {
    const spRows = await query(
      'SELECT id FROM service_providers WHERE user_id = ? LIMIT 1',
      [req.user.userId]
    );
    if (!spRows.length) return res.json({ success: true, clicks: [], totals: { call: 0, whatsapp: 0 } });

    const providerId = spRows[0].id;
    const clicks = await query(
      `SELECT id, click_type, clicked_at
       FROM contact_clicks
       WHERE provider_id = ?
       ORDER BY clicked_at DESC
       LIMIT 200`,
      [providerId]
    );

    const totals = clicks.reduce(
      (acc, c) => { acc[c.click_type] = (acc[c.click_type] || 0) + 1; return acc; },
      { call: 0, whatsapp: 0 }
    );

    res.json({ success: true, clicks, totals });
  } catch (error) {
    console.error('❌ contact-clicks GET:', error.message);
    res.status(500).json({ success: false, clicks: [], totals: { call: 0, whatsapp: 0 } });
  }
});

module.exports = router;
