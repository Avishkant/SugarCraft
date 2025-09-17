require('dotenv').config({ path: './config/.env' });
const express = require('express');

const app = express();
app.use(express.json());

// Auth routes
app.post('/api/auth/register', (req, res) => {
  res.status(501).json({ message: 'Not Implemented' });
});

app.get('/', (req, res) => {
  res.send('SugarCraft API is running');
});

module.exports = app;
