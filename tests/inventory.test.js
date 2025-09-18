const request = require('supertest');
const app = require('../src/index');

let token;
let adminToken;
let sweetId;

beforeEach(async () => {
  // Register and login a user
  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Inv User', email: 'invuser@example.com', password: 'invpass' });
  const res = await request(app)
    .post('/api/auth/login')
  .send({ email: 'invuser@example.com', password: 'invpass' });
  token = res.body.token;

  // Register and login an admin
  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Admin Inv', email: 'admininv@example.com', password: 'adminpass', role: 'admin' });
  const adminRes = await request(app)
    .post('/api/auth/login')
  .send({ email: 'admininv@example.com', password: 'adminpass' });
  adminToken = adminRes.body.token;

  // Add a sweet as admin (so admin can restock it)
  const sweetRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${adminToken}`)
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
