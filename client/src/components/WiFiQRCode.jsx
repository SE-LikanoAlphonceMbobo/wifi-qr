import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { QRCodeSVG } from 'qrcode.react';

export default function WiFiQRCode({ ssid, password, security = 'WPA' }) {
  // Standard WiFi QR format: handles WPA, WEP, and Open (nopass) networks
  const wifiString = `WIFI:T:${security === 'Open' ? 'nopass' : security};S:${ssid};P:${password || ''};;`;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      {/* White container for the QR code */}
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
          fgColor="#FF5100"
          level="M"
          includeMargin={false}
        />
      </Paper>

      <Typography sx={{
        color: 'rgba(255,255,255,0.50)',
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