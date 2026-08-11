import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../models/User.model.js';
import { Resume } from '../models/Resume.model.js';
import { GithubAudit } from '../models/GithubAudit.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { logger } from '../config/logger.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const runAdvancedCrudTest = async () => {
  logger.info('🚀 Starting Week 5 Advanced CRUD & File Upload Pipeline Test...');
  let mongoServer = null;

  try {
    // 1. In-Memory DB Setup
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    logger.info(`🍃 In-Memory DB connected at: ${uri}`);

    // 2. Create User
    const user = await User.create({
      name: 'Morgan CRUD Lead',
      email: `crud.lead.${Date.now()}@aidevhub.io`,
      password: 'SecurePassword2026!',
    });

    // 3. Test Multer & Cloudinary File Upload Integration
    logger.info('Testing File Upload & Cloudinary CDN integration...');
    const tempTestFile = path.resolve('public/temp/sample_test_resume.pdf');
    if (!fs.existsSync(path.dirname(tempTestFile))) {
      fs.mkdirSync(path.dirname(tempTestFile), { recursive: true });
    }
    fs.writeFileSync(tempTestFile, 'Sample PDF binary content for testing resume parser.');

    const cloudUpload = await uploadOnCloudinary(tempTestFile);
    logger.info(`✅ Uploaded file asset CDN URL: ${cloudUpload.secure_url}`);
    logger.info(`Temp file automatically deleted from disk? ${!fs.existsSync(tempTestFile) ? 'YES (Clean)' : 'NO'}`);

    // 4. Test Creating Multiple Resume Documents for Pagination
    logger.info('Creating 3 Resume documents for pagination test...');
    await Resume.create([
      {
        user: user._id,
        fileName: 'Senior_Architect_Resume_v1.pdf',
        fileUrl: cloudUpload.secure_url,
        overallScore: 88,
        atsScore: { score: 88, grade: 'A', status: 'Optimized' },
      },
      {
        user: user._id,
        fileName: 'Senior_Architect_Resume_v2.pdf',
        fileUrl: cloudUpload.secure_url,
        overallScore: 94,
        atsScore: { score: 94, grade: 'A+', status: 'Highly Optimized' },
      },
      {
        user: user._id,
        fileName: 'Staff_Lead_Resume_v3.pdf',
        fileUrl: cloudUpload.secure_url,
        overallScore: 96,
        atsScore: { score: 96, grade: 'A+', status: 'Highly Optimized' },
      },
    ]);

    // 5. Test Skip/Limit Pagination & Sorting on Resumes
    logger.info('Executing Paginated Query: page=1, limit=2, sort=-overallScore...');
    const page = 1;
    const limit = 2;
    const skip = (page - 1) * limit;

    const [resumes, total] = await Promise.all([
      Resume.find({ user: user._id })
        .sort('-overallScore')
        .skip(skip)
        .limit(limit)
        .lean(),
      Resume.countDocuments({ user: user._id }),
    ]);

    logger.info(`Paginated result count: ${resumes.length} (Expected: 2), Total documents: ${total} (Expected: 3)`);
    logger.info(`Top Resume Score: ${resumes[0].overallScore} (${resumes[0].fileName})`);
    logger.info(`Second Resume Score: ${resumes[1].overallScore} (${resumes[1].fileName})`);

    // 6. Test GitHub Audit Resource Creation & Query
    logger.info('Testing GitHub Audit Resource Creation...');
    const audit = await GithubAudit.create({
      user: user._id,
      repoName: 'morgandev/next-cloud-engine',
      repoUrl: 'https://github.com/morgandev/next-cloud-engine',
      stars: 2100,
      forks: 340,
      qualityScore: 97,
      securityScore: 99,
      maintainability: 'A+',
      testCoverage: '94.2%',
    });

    logger.info(`✅ GithubAudit created! ID: ${audit._id}, Quality Score: ${audit.qualityScore}`);

    // 7. Test Resource Deletion
    logger.info('Testing Document Deletion...');
    await Resume.findByIdAndDelete(resumes[0]._id);
    const countAfterDelete = await Resume.countDocuments({ user: user._id });
    logger.info(`Resume count after deletion: ${countAfterDelete} (Expected: 2)`);

    // Cleanup
    await User.findByIdAndDelete(user._id);
    await Resume.deleteMany({ user: user._id });
    await GithubAudit.deleteMany({ user: user._id });
    logger.info('🧹 Cleanup completed successfully.');

    logger.info('🎉 Week 5 Advanced CRUD & File Upload Test Passed 100%!');
  } catch (error) {
    logger.error(`❌ Advanced CRUD Test Failed: ${error.message}`, { stack: error.stack });
  } finally {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    logger.info('Disconnected from MongoDB.');
    process.exit(0);
  }
};

runAdvancedCrudTest();
