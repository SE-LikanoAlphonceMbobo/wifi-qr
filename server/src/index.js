require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { initDatabase } = require('./model');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'T-Connect Server Running', uptime: process.uptime() });
});

// Only run the database init and listen locally
if (process.env.NODE_ENV !== 'production') {
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
}

// Export the app for Vercel Serverless
module.exports = app;