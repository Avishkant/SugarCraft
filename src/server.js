require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const app = require('./index');


// Extract port from BACKEND_URL if available, else use process.env.PORT or 3000
const getPortFromUrl = (url) => {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.port ? parseInt(u.port) : (u.protocol === 'http:' ? 80 : u.protocol === 'https:' ? 443 : undefined);
  } catch {
    return undefined;
  }
};
const PORT = getPortFromUrl(process.env.BACKEND_URL) || process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
