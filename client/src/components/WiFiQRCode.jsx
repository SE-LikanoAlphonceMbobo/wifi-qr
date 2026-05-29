import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { QRCodeSVG } from 'qrcode.react';
import WifiIcon from '@mui/icons-material/Wifi';

export default function WiFiQRCode({ ssid, password, security = 'WPA' }) {
  // Standard WiFi QR format: handles WPA, WEP, and Open (nopass) networks automatically
  // Phones will auto-join without typing when scanning this
  const wifiString = `WIFI:T:${security === 'Open' ? 'nopass' : security};S:${ssid};P:${password || ''};;`;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      {/* White container for the QR code to ensure reliable scanning */}
      <Paper elevation={0} sx={{
        p: 2.5,
        bgcolor: '#FFFFFF',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 2
      }}>
        <QRCodeSVG
          value={wifiString}
          size={180}
          bgColor="#FFFFFF"
          fgColor="#FF5100"  // T-Connect Orange
          level="M"
          includeMargin={false}
        />
      </Paper>

      {/* Network name below QR */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
        <WifiIcon sx={{ fontSize: 16, color: '#FF5100' }} />
        <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
          {ssid}
        </Typography>
      </Box>

      <Typography sx={{
        color: 'rgba(255,255,255,0.45)',
        fontSize: '0.75rem',
        textAlign: 'center',
        lineHeight: 1.5,
        maxWidth: 260
      }}>
        {security === 'Open' 
          ? 'Scan to auto-connect to this open network' 
          : 'Scan to auto-connect without typing the password'}
      </Typography>
    </Box>
  );
}