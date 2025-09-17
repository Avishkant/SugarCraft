require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.get('/', (req, res) => {
  res.send('SugarCraft API is running');
});

module.exports = app;
