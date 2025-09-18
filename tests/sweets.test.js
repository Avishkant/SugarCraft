const request = require('supertest');
const app = require('../src/index');

let token;
let sweetId;

beforeAll(async () => {
  // Register and login a user to get token
  await request(app)
    .post('/api/auth/register')
    .send({ username: 'sweetuser', password: 'sweetpass' });
  const res = await request(app)
    .post('/api/auth/login')
    .send({ username: 'sweetuser', password: 'sweetpass' });
  token = res.body.token;
});

describe('Sweets API', () => {
  it('should add a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Barfi', category: 'Indian', price: 30, quantity: 50 });
    expect(res.statusCode).toBe(201);
    sweetId = res.body._id;
  });

  it('should get all sweets', async () => {
    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
