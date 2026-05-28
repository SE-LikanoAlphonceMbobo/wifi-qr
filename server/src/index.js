require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { initDatabase } = require('./model');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow React frontend to communicate
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use('/api', routes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'T-Connect Server Running', uptime: process.uptime() });
});

// Start Server
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`T-CONNECT Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();