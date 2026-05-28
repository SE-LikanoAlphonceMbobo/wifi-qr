const express = require('express');
const router = express.Router();
const { createVisitor } = require('./model');

/**
 * POST /api/register
 * Register a new visitor for WiFi access
 */
router.post('/register', async (req, res) => {
  try {
    const { fullName, business, phone, email, areaOfOperation, useCase } = req.body;

    // Server-side validation matching the UI requirements
    if (!fullName || fullName.trim() === '') {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!phone || phone.trim() === '') {
      return res.status(400).json({ success: false, error: 'Phone number is required' });
    }

    const visitor = await createVisitor({
      fullName: fullName.trim(),
      business: business ? business.trim() : null,
      phone: phone.trim(),
      email: email ? email.trim() : null,
      areaOfOperation: areaOfOperation || null,
      useCase: useCase || 'home'
    });

    res.status(201).json({ 
      success: true, 
      message: 'Device registered successfully',
      data: visitor 
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error during registration' 
    });
  }
});

/**
 * GET /api/config
 * Fetch WiFi network configuration for the frontend
 */
router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      ssid: process.env.WIFI_SSID || 'T-Connect WiFi',
      security: process.env.WIFI_SECURITY || 'WPA3'
    }
  });
});

module.exports = router;