import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../models/User.model.js';
import { Resume } from '../models/Resume.model.js';
import { GithubAudit } from '../models/GithubAudit.model.js';
import { logger } from '../config/logger.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const testDatabasePipeline = async () => {
  logger.info('🧪 Starting Database Connection & Model Pipeline Test...');
  let mongoServer = null;

  try {
    let uri = process.env.MONGODB_URI;

    // Spin up in-memory MongoDB instance for testing if local daemon is absent
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
      logger.info(`🍃 Connected to MongoDB Instance: ${mongoose.connection.host}`);
    } catch (e) {
      logger.info('⚡ Local MongoDB instance not detected. Launching in-memory MongoMemoryServer...');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      await mongoose.connect(uri);
      logger.info(`🍃 Connected to Memory Mongo Server at: ${uri}`);
    }

    // 2. Instantiate and save a Test User
    const testEmail = `test.dev.${Date.now()}@aidevhub.io`;
    const testPassword = 'SecurePassword123!';

    logger.info(`Creating test user document for ${testEmail}...`);
    const newUser = await User.create({
      name: 'Alex Test Engineer',
      email: testEmail,
      password: testPassword,
      role: 'staff_architect',
      githubUsername: 'alextest-dev',
    });

    logger.info(`✅ User created! ID: ${newUser._id}`);

    // 3. Verify Pre-Save Password Hashing & Instance Method
    const isPasswordMatch = await newUser.isPasswordCorrect(testPassword);
    const isWrongMatch = await newUser.isPasswordCorrect('WrongPass');
    logger.info(`Password hash check result: ${isPasswordMatch ? 'MATCH (Correct)' : 'FAILED'}`);
    logger.info(`Wrong password check result: ${!isWrongMatch ? 'REJECTED (Correct)' : 'FAILED'}`);

    // 4. Instantiate and save a Resume document linked to User
    logger.info('Creating test Resume document...');
    const testResume = await Resume.create({
      user: newUser._id,
      fileName: 'Staff_Architect_Resume.pdf',
      overallScore: 94,
      atsScore: {
        score: 95,
        grade: 'A+',
        status: 'Highly Optimized',
        keywordsFound: ['React', 'TypeScript', 'Node.js', 'Distributed Systems'],
        keywordsMissing: ['Kubernetes Native'],
      },
      breakdown: { impact: 96, formatting: 92, relevance: 94, brevity: 90 },
      detectedSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      skillGaps: [{ skill: 'Kubernetes Cluster Ops', priority: 'High', demand: '88% of postings' }],
      tips: [{ category: 'Impact', type: 'critical', text: 'Quantify latency metrics in lead role.' }],
    });
    logger.info(`✅ Resume created! ID: ${testResume._id}`);

    // 5. Instantiate and save a GithubAudit document linked to User
    logger.info('Creating test GithubAudit document...');
    const testAudit = await GithubAudit.create({
      user: newUser._id,
      repoName: 'alextest-dev/cloud-mesh-engine',
      repoUrl: 'https://github.com/alextest-dev/cloud-mesh-engine',
      stars: 340,
      forks: 42,
      language: 'TypeScript',
      qualityScore: 96,
      securityScore: 100,
      fileTree: [{ name: 'src/engine.ts', quality: 98, issues: 0, lines: 350 }],
      aiSuggestions: [
        { title: 'Memoize cache provider', severity: 'Medium', file: 'src/cache.ts', description: 'Prevent re-instantiation' },
      ],
    });
    logger.info(`✅ GithubAudit created! ID: ${testAudit._id}`);

    // 6. Query and Populate References
    const fetchedResume = await Resume.findById(testResume._id).populate('user', 'name email role tier');
    logger.info(`✅ Populated Resume user reference: ${fetchedResume.user.name} (${fetchedResume.user.role})`);

    // 7. Cleanup Test Records
    await User.findByIdAndDelete(newUser._id);
    await Resume.findByIdAndDelete(testResume._id);
    await GithubAudit.findByIdAndDelete(testAudit._id);
    logger.info('🧹 Cleanup completed successfully.');

    logger.info('🎉 Database & Model Pipeline Test Passed Perfectly!');
  } catch (error) {
    logger.error(`❌ DB Test Error: ${error.message}`, { stack: error.stack });
  } finally {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    logger.info('Disconnected from MongoDB.');
    process.exit(0);
  }
};

testDatabasePipeline();
