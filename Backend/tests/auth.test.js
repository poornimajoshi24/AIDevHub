import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app.js';
import { User } from '../src/models/User.model.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('🔐 Auth API Integration Test Suite', () => {
  const testUser = {
    name: 'Jest Test Lead',
    email: `jest.auth.${Date.now()}@aidevhub.io`,
    password: 'SuperSecretPass2026!',
  };

  let authCookie;

  it('1. POST /api/v1/auth/register -> should register new user successfully', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUser.email.toLowerCase());
    expect(res.headers['set-cookie']).toBeDefined();

    authCookie = res.headers['set-cookie'];
  });

  it('2. POST /api/v1/auth/register -> should reject registration with duplicate email (409)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('already exists');
  });

  it('3. POST /api/v1/auth/login -> should fail login with invalid password (401)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: 'WrongInvalidPassword!',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('4. POST /api/v1/auth/login -> should login successfully with valid password (200)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.name).toBe(testUser.name);
  });

  it('5. GET /api/v1/auth/me -> should fetch profile of authenticated user', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Cookie', authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUser.email.toLowerCase());
  });

  it('6. POST /api/v1/auth/logout -> should logout user and clear cookies', async () => {
    const res = await request(app)
      .post('/api/v1/auth/logout')
      .set('Cookie', authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
