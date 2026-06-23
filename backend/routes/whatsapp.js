const express = require('express');
const router = express.Router();

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// Normalize Israeli phone → international format (972XXXXXXXXX)
function normalizePhone(phone) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('972')) return digits;
  if (digits.startsWith('0')) return '972' + digits.slice(1);
  return '972' + digits;
}

// POST /api/whatsapp/notify
router.post('/notify', async (req, res) => {
  try {
    const { providerPhone, providerName, serviceName } = req.body;

    if (!providerPhone) {
      return res.status(400).json({ success: false, message: 'providerPhone required' });
    }

    const to = normalizePhone(providerPhone);

    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: `שלום ${providerName || ''}! 👋\nלקוח חדש מעוניין בשירותי ${serviceName || 'השירות שלך'} דרך AllSherut.\nהוא ניסה ליצור איתך קשר — אנא חזור אליו בהקדם! 🏠`,
      },
    };

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API error:', data);
      return res.status(500).json({ success: false, message: 'WhatsApp send failed', error: data });
    }

    return res.json({ success: true, messageId: data.messages?.[0]?.id });
  } catch (err) {
    console.error('WhatsApp route error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
