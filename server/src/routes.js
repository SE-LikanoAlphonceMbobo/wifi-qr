const express = require('express');
const router = express.Router();
const { createVisitor } = require('./model');

// Log WiFi config on startup to verify .env is loaded
console.log('===== WIFI CONFIG LOADED =====');
console.log('SSID:', process.env.WIFI_SSID);
console.log('Security:', process.env.WIFI_SECURITY);
console.log('==============================');

router.post('/register', async (req, res) => {
  try {
    const { fullName, business, phone, email, areaOfOperation, useCase } = req.body;

    if (!fullName || fullName.trim() === '') {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!phone || phone.trim() === '') {
      return res.status(400).json({ success: false, error: 'Phone number is required' });
    }

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const visitor = await createVisitor({
      firstName,
      lastName,
      business: business ? business.trim() : null,
      phone: phone.trim(),
      email: email ? email.trim() : null,
      area: areaOfOperation || null,
      useCase: useCase || 'home'
    });

    res.status(201).json({
      success: true,
      message: 'Device registered successfully',
      data: {
        id: visitor.id,
        fullName: `${visitor.first_name} ${visitor.last_name}`.trim(),
        business: visitor.business,
        useCase: visitor.use_case,
        connectedAt: visitor.connected_at
      }
    });

  } catch (error) {
    console.error('===== REGISTRATION ERROR =====');
    console.error('Message:', error.message);
    console.error('Detail:', error.detail);
    console.error('Code:', error.code);
    console.error('==============================');
    res.status(500).json({
      success: false,
      error: 'Registration failed. Please try again.',
      debug: error.message
    });
  }
});

// WiFi config endpoint — reads directly from .env, ZERO hardcoding
router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      ssid: process.env.WIFI_SSID,
      password: process.env.WIFI_PASSWORD,
      security: process.env.WIFI_SECURITY
    }
  });
});

module.exports = router;