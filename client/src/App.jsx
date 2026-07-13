import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import SuccessPage from './pages/SuccessPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF5100', light: '#FF7A33', dark: '#CC4100' },
    background: { default: '#000000', paper: '#0A0A0A' },
    text: { primary: '#FFFFFF', secondary: '#888888' },
    divider: '#1A1A1A',
    success: { main: '#4CAF50' }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 12, padding: '13px 28px', fontSize: '1rem' },
      }
    }
  }
});

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{
          '@keyframes pulseRing': {
            '0%': { transform: 'scale(0.88)', opacity: 0.4 },
            '50%': { transform: 'scale(1.1)', opacity: 0.05 },
            '100%': { transform: 'scale(0.88)', opacity: 0.4 }
          },
          'body': { margin: 0, padding: 0, overscrollBehavior: 'none', background: '#000000', fontFamily: "'Inter', sans-serif" },
          '*': { boxSizing: 'border-box' },
          '::-webkit-scrollbar': { width: 3 },
          '::-webkit-scrollbar-thumb': { background: 'rgba(255,81,0,0.12)', borderRadius: 3 },
          '.MuiPaper-root.MuiMenu-paper': { backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.06)' },
          '.MuiMenuItem-root': { color: '#CCCCCC', '&:hover': { backgroundColor: 'rgba(255,81,0,0.08)' }, '&.Mui-selected': { backgroundColor: 'rgba(255,81,0,0.12)', color: '#FF5100' } }
        }} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}