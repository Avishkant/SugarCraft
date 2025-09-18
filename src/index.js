require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

// Allow requests from Vite frontend
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true,
}));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors());

const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.get('/', (req, res) => {
  res.send('SugarCraft API is running');
});

module.exports = app;
