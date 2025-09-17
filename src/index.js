require('dotenv').config({ path: './config/.env' });
const express = require('express');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    await User.create({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('SugarCraft API is running');
});

module.exports = app;
