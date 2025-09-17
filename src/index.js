require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('SugarCraft API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
