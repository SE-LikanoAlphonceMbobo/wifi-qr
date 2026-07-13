import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLang } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <Box
      onClick={toggleLang}
      sx={{
        display: 'flex', borderRadius: 2, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.15)',
        cursor: 'pointer', userSelect: 'none',
      }}
    >
      {['en', 'st'].map(l => (
        <Typography
          key={l}
          sx={{
            px: 1.2, py: 0.4, fontSize: '0.7rem',
            fontWeight: 700, letterSpacing: 0.5,
            bgcolor: lang === l ? 'rgba(255,81,0,0.25)' : 'transparent',
            color: lang === l ? '#FF5100' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s ease',
          }}
        >
          {l.toUpperCase()}
        </Typography>
      ))}
    </Box>
  );
}