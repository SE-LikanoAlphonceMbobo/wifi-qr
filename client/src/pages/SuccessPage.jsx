import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import CheckIcon from '@mui/icons-material/Check';
import PlaceIcon from '@mui/icons-material/Place';
import WifiIcon from '@mui/icons-material/Wifi';
import TConnectLogo from '../components/TConnectLogo';
import WiFiQRCode from '../components/WiFiQRCode';

// WiFi Credentials 
// In production, you can fetch these dynamically from your /api/config endpoint
// Change security to 'Open' if there is no password
const WIFI_CREDS = {
  ssid: 'T-Connect WiFi',
  password: 'Tc0nn3ct$2024',
  security: 'WPA'  // Use 'WPA', 'WEP', or 'Open'
};

export default function SuccessPage() {
  const location = useLocation();
  const formData = location.state?.formData;

  const [vis, setVis] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => { setTimeout(() => setVis(true), 250); }, []);

  React.useEffect(() => {
    const id = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmtTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <Box sx={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', px: 3, py: 5, overflow: 'hidden',
      backgroundImage: 'url(/background.jpg)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', bgcolor: '#000000'
    }}>
      
      {/* Dark overlay */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', zIndex: 0 }} />

      {/* Orange glow */}
      <Box sx={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,81,0,0.08) 0%, transparent 60%)',
        filter: 'blur(70px)', zIndex: 1
      }} />

      <Fade in={vis} timeout={1000}>
        <Box sx={{
          textAlign: 'center', zIndex: 2, maxWidth: 420, width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          
          {/* Connected Check Badge */}
          <Zoom in={vis} timeout={1200}>
            <Avatar sx={{
              width: 56, height: 56, mb: 2,
              bgcolor: 'rgba(255,81,0,0.12)',
              border: '2px solid #FF5100'
            }}>
              <CheckIcon sx={{ fontSize: 28, color: '#FF5100' }} />
            </Avatar>
          </Zoom>

          <Typography sx={{
            color: '#FFFFFF', fontSize: { xs: '1.4rem', sm: '1.8rem' },
            fontWeight: 700, lineHeight: 1.2, mb: 0.5
          }}>
            You're Connected!
          </Typography>

          <Typography sx={{
            color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem',
            lineHeight: 1.5, mb: 3
          }}>
            Scan the QR code to connect your device instantly
          </Typography>

          {/* WiFi QR Code Component */}
          <WiFiQRCode 
            ssid={WIFI_CREDS.ssid} 
            password={WIFI_CREDS.password} 
            security={WIFI_CREDS.security} 
          />

          {/* Connection Details Card */}
          <Paper elevation={0} sx={{
            width: '100%', mt: 3, mb: 3,
            bgcolor: 'rgba(0,0,0,0.60)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 3, overflow: 'hidden',
            backdropFilter: 'blur(16px)'
          }}>
            {/* Network */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: '#777', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1, mb: 0.5 }}>Network</Typography>
                <Typography sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.9rem', lineHeight: 1.2 }}>{WIFI_CREDS.ssid}</Typography>
              </Box>
              <WifiIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.15)' }} />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: '#777', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1, mb: 0.5 }}>Status</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50', boxShadow: '0 0 8px rgba(76,175,80,0.5)' }} />
                  <Typography sx={{ fontWeight: 600, color: '#4CAF50', fontSize: '0.9rem', lineHeight: 1.2 }}>Connected</Typography>
                </Box>
              </Box>
              <Chip label={fmtTime(elapsed)} size="small" sx={{ bgcolor: 'rgba(255,81,0,0.08)', color: '#FF5100', fontWeight: 600, fontSize: '0.72rem' }} />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Venue */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: '#777', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1, mb: 0.5 }}>Venue</Typography>
                <Typography sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.9rem', lineHeight: 1.2 }}>Default</Typography>
              </Box>
              <PlaceIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.15)' }} />
            </Box>
          </Paper>

          <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', lineHeight: 1.6, mb: 3, maxWidth: 280 }}>
            Keep this page open to see your session status. Share the QR code with others to connect.
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TConnectLogo size={20} />
            <Typography sx={{ color: 'rgba(255,255,255,0.30)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: 1, lineHeight: 1 }}>
              T-CONNECT
            </Typography>
          </Box>
        </Box>
      </Fade>

      <Typography sx={{ position: 'fixed', bottom: 16, right: 20, color: 'rgba(255,255,255,0.12)', fontSize: '0.6rem', zIndex: 2 }}>
        Made by Atoms
      </Typography>
    </Box>
  );
}