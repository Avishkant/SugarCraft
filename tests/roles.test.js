const request = require('supertest');
const app = require('../src/index');

let customerToken;
let adminToken;
let sweetId;

beforeEach(async () => {
  // Register and login a customer
  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Role User', email: 'roleuser@example.com', password: 'rolepass' });
  const res = await request(app)
    .post('/api/auth/login')
  .send({ email: 'roleuser@example.com', password: 'rolepass' });
  customerToken = res.body.token;

  // Register and login an admin
  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Admin Role', email: 'adminrole@example.com', password: 'adminpass', role: 'admin' });
  const adminRes = await request(app)
    .post('/api/auth/login')
  .send({ email: 'adminrole@example.com', password: 'adminpass' });
  adminToken = adminRes.body.token;

  // Add a sweet as admin (so admin can delete it)
  const sweetRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ name: 'Kaju Katli', category: 'Indian', price: 40, quantity: 20 });
  sweetId = sweetRes.body._id;
});

describe('Role-based Access', () => {
  it('should forbid customer from deleting sweet', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${customerToken}`);
    expect(res.statusCode).toBe(403);
  });

  it('should allow admin to delete sweet', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });
});
