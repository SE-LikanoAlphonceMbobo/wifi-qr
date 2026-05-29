import React from 'react';
import Box from '@mui/material/Box';

export default function Starfield() {
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      seed();
    };

    const seed = () => {
      const count = Math.min(220, Math.floor((canvas.width * canvas.height) / 3000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.003
      }));
    };

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      stars.forEach(s => {
        const twinkle = Math.sin(time * s.speed + s.phase);
        const alpha = s.baseAlpha + twinkle * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, alpha)})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', resize);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <Box component="canvas" ref={canvasRef} sx={{
      position: 'fixed', inset: 0,
      width: '100%', height: '100%',
      zIndex: 0, pointerEvents: 'none'
    }} />
  );
}