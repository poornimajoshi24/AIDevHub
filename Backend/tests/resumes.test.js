import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app.js';

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

describe('📄 Resumes API Integration Test Suite', () => {
  let authCookie;

  beforeAll(async () => {
    // Create test user and obtain auth cookies
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Resume Tester',
        email: `resume.jest.${Date.now()}@aidevhub.io`,
        password: 'TestPassword2026!',
      });
    authCookie = regRes.headers['set-cookie'];
  });

  it('1. GET /api/v1/resumes -> should fetch empty resume array for new user', async () => {
    const res = await request(app)
      .get('/api/v1/resumes')
      .set('Cookie', authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.resumes).toBeDefined();
    expect(res.body.data.pagination.total).toBe(0);
  });

  it('2. POST /api/v1/resumes/upload -> should upload sample resume and compute ATS score', async () => {
    const res = await request(app)
      .post('/api/v1/resumes/upload')
      .set('Cookie', authCookie)
      .attach('resume', Buffer.from('Dummy resume text content for testing'), 'test_resume.pdf');

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.resume.overallScore).toBeGreaterThanOrEqual(80);
    expect(res.body.data.resume.atsScore).toBeDefined();
  });

  it('3. GET /api/v1/resumes -> should now return 1 resume document with pagination', async () => {
    const res = await request(app)
      .get('/api/v1/resumes')
      .set('Cookie', authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.resumes.length).toBe(1);
    expect(res.body.data.pagination.total).toBe(1);
  });
});
