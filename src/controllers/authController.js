const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  console.log('Registration request received:', req.body);
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'Name, email, and password required' });
  }
  try {
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists');
      return res.status(409).json({ message: 'Email already exists' });
    }
    console.log('Creating new user...');
    const user = new User({ name, email, password, role: role || 'customer' });
    await user.save();
    console.log('User saved successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) { 
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token, role: user.role || 'customer' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  // For JWT, instruct client to delete token
  res.status(200).json({ message: 'Logout successful. Please remove token from client.' });
};
