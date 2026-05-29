import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import PlaceIcon from '@mui/icons-material/Place';
import WifiIcon from '@mui/icons-material/Wifi';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TConnectLogo from '../components/TConnectLogo';
import WiFiQRCode from '../components/WiFiQRCode';
import AppBackground from '../components/AppBackground';

export default function SuccessPage() {
  const location = useLocation();
  const formData = location.state?.formData;

  const [vis, setVis] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [wifiConfig, setWifiConfig] = React.useState(null);
  const [toastOpen, setToastOpen] = React.useState(false);

  // Fetch WiFi credentials from the server's .env
  React.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/config');
        const data = await res.json();
        if (data.success) {
          setWifiConfig(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch WiFi config', err);
      }
    };
    fetchConfig();
  }, []);

  React.useEffect(() => { setTimeout(() => setVis(true), 250); }, []);

  React.useEffect(() => {
    const id = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmtTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const copyPassword = () => {
    if (wifiConfig?.password) {
      navigator.clipboard.writeText(wifiConfig.password);
      setToastOpen(true);
    }
  };

  return (
    <Box sx={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', px: 3, py: 5, overflow: 'hidden',
      bgcolor: '#000000'
    }}>
      
      <AppBackground />

      <Fade in={vis} timeout={1000}>
        <Box sx={{
          textAlign: 'center', zIndex: 2, maxWidth: 420, width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          
          {/* Connected Check Badge */}
          <Zoom in={vis} timeout={1200}>
            <Avatar sx={{
              width: 56, height: 56, mb: 2,
              bgcolor: 'rgba(255,81,0,0.15)',
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
            color: 'rgba(255,255,255,0.60)', fontSize: '0.85rem',
            lineHeight: 1.5, mb: 3
          }}>
            Scan the QR code to auto-connect your phone
          </Typography>

          {/* WiFi QR Code — driven by .env data */}
          {wifiConfig ? (
            <WiFiQRCode 
              ssid={wifiConfig.ssid} 
              password={wifiConfig.password} 
              security={wifiConfig.security} 
            />
          ) : (
            <Typography sx={{ color: '#888', mb: 3 }}>Loading WiFi details...</Typography>
          )}

          {/* Copy Password Button for PC Users */}
          {wifiConfig?.password && (
            <Button 
              variant="outlined" 
              size="small"
              onClick={copyPassword}
              startIcon={<ContentCopyIcon />}
              sx={{
                mt: 2, mb: 3, borderColor: 'rgba(255,81,0,0.4)', 
                color: '#FF5100', textTransform: 'none',
                '&:hover': { borderColor: '#FF5100', bgcolor: 'rgba(255,81,0,0.08)' }
              }}
            >
              Copy Password 
            </Button>
          )}

          {/* Connection Details Card — SSID from .env */}
          <Paper elevation={0} sx={{
            width: '100%', mb: 3,
            bgcolor: 'rgba(0,0,0,0.60)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 3, overflow: 'hidden',
            backdropFilter: 'blur(20px)'
          }}>
            {/* Network (SSID from .env) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: '#888', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1, mb: 0.5 }}>Network</Typography>
                <Typography sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.2 }}>
                  {wifiConfig?.ssid || 'Loading...'}
                </Typography>
              </Box>
              <WifiIcon sx={{ fontSize: 22, color: '#FF5100' }} />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Security type from .env */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: '#888', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1, mb: 0.5 }}>Security</Typography>
                <Typography sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.2 }}>
                  {wifiConfig?.security || 'WPA'}
                </Typography>
              </Box>
              <Chip label="Secured" size="small" sx={{ bgcolor: 'rgba(76,175,80,0.10)', color: '#4CAF50', fontWeight: 600, fontSize: '0.68rem' }} />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: '#888', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1, mb: 0.5 }}>Status</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50', boxShadow: '0 0 8px rgba(76,175,80,0.5)' }} />
                  <Typography sx={{ fontWeight: 600, color: '#4CAF50', fontSize: '0.95rem', lineHeight: 1.2 }}>Connected</Typography>
                </Box>
              </Box>
              <Chip label={fmtTime(elapsed)} size="small" sx={{ bgcolor: 'rgba(255,81,0,0.08)', color: '#FF5100', fontWeight: 600, fontSize: '0.72rem' }} />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Venue */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: '#888', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1, mb: 0.5 }}>Venue</Typography>
                <Typography sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.2 }}>Default</Typography>
              </Box>
              <PlaceIcon sx={{ fontSize: 22, color: 'rgba(255,255,255,0.2)' }} />
            </Box>
          </Paper>

          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', lineHeight: 1.6, mb: 3, maxWidth: 280 }}>
            Keep this page open to see your session status. Share the QR code with others to connect.
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            
            <Typography sx={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: 1, lineHeight: 1 }}>
              T-CONNECT
            </Typography>
            <TConnectLogo size={20} />
          </Box>
        </Box>
      </Fade>

      <Typography sx={{ position: 'fixed', bottom: 16, right: 20, color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem', zIndex: 2 }}>
        Made by Atoms
      </Typography>

      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setToastOpen(false)} severity="success" variant="filled"
          sx={{ bgcolor: '#FF5100', color: '#FFFFFF', fontWeight: 600, width: '100%' }}>
          Password copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}