const mongoose = require('mongoose');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});
