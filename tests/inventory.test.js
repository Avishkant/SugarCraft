const request = require('supertest');
const app = require('../src/index');

let token;
let adminToken;
let sweetId;

beforeAll(async () => {
  // Register and login a user
  await request(app)
    .post('/api/auth/register')
    .send({ username: 'invuser', password: 'invpass' });
  const res = await request(app)
    .post('/api/auth/login')
    .send({ username: 'invuser', password: 'invpass' });
  token = res.body.token;

  // Register and login an admin
  await request(app)
    .post('/api/auth/register')
    .send({ username: 'admininv', password: 'adminpass', role: 'admin' });
  const adminRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'admininv', password: 'adminpass' });
  adminToken = adminRes.body.token;

  // Add a sweet
  const sweetRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Jalebi', category: 'Indian', price: 20, quantity: 10 });
  sweetId = sweetRes.body._id;
});

describe('Inventory API', () => {
  it('should purchase a sweet', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 2 });
    expect(res.statusCode).toBe(200);
  });

  it('should restock a sweet (admin only)', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 10 });
    expect(res.statusCode).toBe(200);
  });
});
