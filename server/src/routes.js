const express = require('express');
const router = express.Router();
const { createVisitor, getHotspots, getHotspotCredentials } = require('./model');

console.log('===== WIFI CONFIG LOADED =====');
console.log('SSID:', process.env.WIFI_SSID);
console.log('Security:', process.env.WIFI_SECURITY);
console.log('==============================');

router.post('/register', async (req, res) => {
  try {
    // UPDATED: Destructure knowsTConnect instead of useCase
    const { fullName, connectReason, phone, email, hotspotId, knowsTConnect } = req.body;

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
      business: connectReason || null,
      phone: phone.trim(),
      email: email ? email.trim() : null,
      area: hotspotId || null,
      // MAP: 'yes'/'no' maps to 'business'/'home' to satisfy DB constraint
      useCase: knowsTConnect === 'yes' ? 'business' : 'home' 
    });

    res.status(201).json({
      success: true,
      message: 'Device registered successfully',
      data: {
        id: visitor.id,
        fullName: `${visitor.first_name} ${visitor.last_name}`.trim(),
        business: visitor.business,
        useCase: visitor.use_case,
        connectedAt: visitor.connected_at,
        knowsTConnect: knowsTConnect // Pass it back to the frontend for the Success page logic
      }
    });

  } catch (error) {
    // ... (keep existing error handling)
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

router.get('/hotspots', async (req, res) => {
  try {
    const hotspots = await getHotspots();
    res.json({ success: true, data: hotspots });
  } catch (error) {
    console.error('Error fetching hotspots:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch hotspots' });
  }
});

router.get('/hotspot/:id', async (req, res) => {
  try {
    const credentials = await getHotspotCredentials(req.params.id);
    if (!credentials) {
      return res.status(404).json({ success: false, error: 'Hotspot not found' });
    }
    res.json({ success: true, data: credentials });
  } catch (error) {
    console.error('Error fetching hotspot credentials:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch credentials' });
  }
});

router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      splashUrl: process.env.SPLASH_URL || null
    }
  });
});

module.exports = router;