const request = require('supertest');
const app = require('../src/index');

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User1',
          email: 'testuser1@example.com',
          password: 'testpass1',
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toMatch(/registered/i);
    });

    it('should not allow duplicate registration', async () => {
      await request(app)
        .post('/api/auth/register')
  .send({ name: 'Test User2', email: 'testuser2@example.com', password: 'testpass2' });
      const res = await request(app)
        .post('/api/auth/register')
  .send({ name: 'Test User2', email: 'testuser2@example.com', password: 'testpass2' });
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toMatch(/already exists/i);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a registered user', async () => {
      await request(app)
        .post('/api/auth/register')
  .send({ name: 'Test User3', email: 'testuser3@example.com', password: 'testpass3' });
      const res = await request(app)
        .post('/api/auth/login')
  .send({ email: 'testuser3@example.com', password: 'testpass3' });
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should not login with wrong password', async () => {
      await request(app)
        .post('/api/auth/register')
  .send({ name: 'Test User4', email: 'testuser4@example.com', password: 'testpass4' });
      const res = await request(app)
        .post('/api/auth/login')
  .send({ email: 'testuser4@example.com', password: 'wrongpass' });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });
});
