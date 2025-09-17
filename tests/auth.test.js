const request = require('supertest');
const app = require('../src/index');

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      // Red: Expect 501 Not Implemented
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          password: 'testpass',
        });
      expect(res.statusCode).toBe(501);
    });
  });
});
