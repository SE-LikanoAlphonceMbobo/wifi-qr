import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiIcon from '@mui/icons-material/Wifi';
import AppBackground from '../components/AppBackground';

const AREAS = [
  'Maseru', 'Butha-Buthe', 'Leribe', 'Berea',
  'Mafeteng', "Mohale's Hoek", 'Quthing', "Qacha's Nek",
  'Mokhotlong', 'Thaba-Tseka', 'Other'
];

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    bgcolor: 'rgba(255,255,255,0.06)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&.Mui-focused fieldset': { borderColor: '#FF5100', borderWidth: 2 }
  },
  '& .MuiInputBase-input': { color: '#FFFFFF' },
  '& .MuiInputBase-input::placeholder': { color: '#666', opacity: 1 }
};

const adornment = (IconComp) => (
  <InputAdornment position="start">
    <IconComp sx={{ fontSize: 20, color: '#888' }} />
  </InputAdornment>
);

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    fullName: '', business: '', phone: '',
    email: '', areaOfOperation: '', useCase: 'home'
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [vis, setVis] = React.useState(false);

  React.useEffect(() => { setTimeout(() => setVis(true), 150); }, []);

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[\d\s+()\-]{7,16}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('https://t-connect-wifi-qr-server.vercel.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        navigate('/success', { state: { formData: data.data } });
      } else {
        setErrors({ phone: data.error || 'Registration failed' });
      }
    } catch (err) {
      setErrors({ phone: 'Network error. Check your connection.' });
    }
    setLoading(false);
  };

  const labelSx = {
    color: '#BBBBBB', fontWeight: 500,
    fontSize: '0.78rem', mb: 1, lineHeight: 1
  };

  return (
    <Box sx={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      position: 'relative', bgcolor: '#000000'
    }}>
      
      <AppBackground />

      {/* Header */}
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', zIndex: 2 }}>
        <IconButton onClick={() => navigate('/')} sx={{ color: '#FFFFFF', bgcolor: 'rgba(0,0,0,0.3)' }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Container maxWidth="sm" sx={{ py: 0, zIndex: 2, flex: 1, px: 3, pb: 4 }}>
        <Fade in={vis} timeout={700}>
          {/* Frosted Glass Card Container */}
          <Paper elevation={0} sx={{
            p: 4, 
            borderRadius: 4,
            bgcolor: 'rgba(0, 0, 0, 0.60)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem', mb: 0.5, lineHeight: 1.3 }}>
              Quick Registration
            </Typography>
            <Typography sx={{ color: '#AAAAAA', fontSize: '0.85rem', mb: 4, lineHeight: 1.4 }}>
              Fill in your details to get connected
            </Typography>

            {/* Full Names * */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={labelSx}>Full Names *</Typography>
              <TextField fullWidth placeholder="Enter your full name"
                value={form.fullName} onChange={set('fullName')}
                error={!!errors.fullName} helperText={errors.fullName}
                variant="outlined" size="small"
                InputProps={{ startAdornment: adornment(PersonIcon) }}
                sx={inputSx} />
            </Box>

            {/* Business */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={labelSx}>Business</Typography>
              <TextField fullWidth placeholder="Your business name (optional)"
                value={form.business} onChange={set('business')}
                variant="outlined" size="small"
                InputProps={{ startAdornment: adornment(BusinessIcon) }}
                sx={inputSx} />
            </Box>

            {/* Phone * */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={labelSx}>Phone *</Typography>
              <TextField fullWidth placeholder="+266 XXXX XXXX" type="tel"
                value={form.phone} onChange={set('phone')}
                error={!!errors.phone} helperText={errors.phone}
                variant="outlined" size="small"
                InputProps={{ startAdornment: adornment(PhoneIcon) }}
                sx={inputSx} />
            </Box>

            {/* Email */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={labelSx}>Email</Typography>
              <TextField fullWidth placeholder="your@email.com (optional)" type="email"
                value={form.email} onChange={set('email')}
                variant="outlined" size="small"
                InputProps={{ startAdornment: adornment(EmailIcon) }}
                sx={inputSx} />
            </Box>

            {/* Area of Operation */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={labelSx}>Area of Operation</Typography>
              <FormControl fullWidth size="small">
                <Select value={form.areaOfOperation}
                  onChange={set('areaOfOperation')}
                  displayEmpty
                  startAdornment={adornment(LocationOnIcon)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    color: form.areaOfOperation ? '#FFFFFF' : '#666',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FF5100', borderWidth: 2 },
                    '& .MuiSelect-icon': { color: '#888' }
                  }}>
                  <MenuItem value="" disabled>Select your area</MenuItem>
                  {AREAS.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            {/* Use Case */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={labelSx}>Use Case</Typography>
              <ToggleButtonGroup value={form.useCase} exclusive
                onChange={(_, v) => v && setForm(p => ({ ...p, useCase: v }))}
                fullWidth sx={{
                  '& .MuiToggleButton-root': {
                    py: 1.4, borderColor: 'rgba(255,255,255,0.1)', color: '#888',
                    textTransform: 'none', fontWeight: 500, borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255,81,0,0.15)', color: '#FF5100',
                      borderColor: 'rgba(255,81,0,0.40)',
                      '&:hover': { bgcolor: 'rgba(255,81,0,0.20)' }
                    }
                  }
                }}>
                <ToggleButton value="home">
                  <HomeIcon sx={{ mr: 1, fontSize: 18 }} />Home
                </ToggleButton>
                <ToggleButton value="business">
                  <ApartmentIcon sx={{ mr: 1, fontSize: 18 }} />Business
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Submit */}
            <Button variant="contained" size="large" onClick={submit} disabled={loading}
              endIcon={loading ? <CircularProgress size={20} sx={{ color: 'rgba(255,255,255,0.5)' }} /> : <WifiIcon />}
              sx={{
                width: '100%', py: 1.7, borderRadius: 3,
                background: '#FF5100', color: '#FFFFFF',
                fontWeight: 600, fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(255,81,0,0.30)',
                '&:hover': { background: '#FF6A2A' }
              }}>
              {loading ? 'Connecting...' : 'Connect Now'}
            </Button>
          </Paper>
        </Fade>
      </Container>

      <Typography sx={{
        textAlign: 'right', px: 3, py: 2, zIndex: 2,
        color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem'
      }}>
        Made by Atoms
      </Typography>
    </Box>
  );
}