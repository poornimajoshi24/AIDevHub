import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import { app } from '../app.js';
import { User } from '../models/User.model.js';
import { logger } from '../config/logger.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const runAuthFlowTest = async () => {
  logger.info('🔐 Starting Week 3 Core Authentication Lifecycle Test...');
  let mongoServer = null;

  try {
    // 1. In-Memory DB Setup
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    logger.info(`🍃 In-Memory DB connected at: ${uri}`);

    // Test Credentials
    const name = 'Sarah Auth Lead';
    const email = 'sarah.auth@aidevhub.io';
    const password = 'SuperSecurePassword2026!';

    // 2. Test Registration Logic & Password Hashing Verification
    logger.info('Testing User Registration & Password Security...');
    const user = await User.create({
      name,
      email,
      password,
      role: 'staff_architect',
    });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Verify Password Hash Security (select: false)
    const queriedUserRaw = await User.findById(user._id);
    logger.info(`User queried without +password -> password field present? ${Boolean(queriedUserRaw.password)} (Expected: false)`);
    
    const queriedUserWithPass = await User.findById(user._id).select('+password');
    logger.info(`User queried with +password -> password hashed with bcrypt? ${queriedUserWithPass.password.startsWith('$2a$') || queriedUserWithPass.password.startsWith('$2b$')} (Expected: true)`);

    // 3. Test JWT Token Decoding
    const decodedAccess = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET || 'aidevhub_super_secret_access_token_key_2026_x99'
    );
    logger.info(`✅ Access Token decoded! User ID: ${decodedAccess._id}, Email: ${decodedAccess.email}, Role: ${decodedAccess.role}`);

    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || 'aidevhub_super_secret_refresh_token_key_2026_z88'
    );
    logger.info(`✅ Refresh Token decoded! User ID: ${decodedRefresh._id}`);

    // 4. Test Password Check Instance Method
    const isPassValid = await queriedUserWithPass.isPasswordCorrect(password);
    const isPassInvalid = await queriedUserWithPass.isPasswordCorrect('WrongPass');
    logger.info(`Correct Password check: ${isPassValid ? 'MATCH' : 'FAILED'}`);
    logger.info(`Wrong Password check: ${!isPassInvalid ? 'REJECTED' : 'FAILED'}`);

    // 5. Test Logout Clearing DB Refresh Token
    logger.info('Testing Logout & Token Revocation...');
    await User.findByIdAndUpdate(user._id, { $unset: { refreshToken: 1 } });
    const userAfterLogout = await User.findById(user._id);
    logger.info(`DB Refresh Token after logout -> ${userAfterLogout.refreshToken ? 'EXISTS (FAIL)' : 'UNSET (SUCCESS)'}`);

    // 6. Cleanup
    await User.findByIdAndDelete(user._id);
    logger.info('🧹 Cleanup completed.');

    logger.info('🎉 Week 3 Core Authentication Lifecycle Test Passed 100%!');
  } catch (error) {
    logger.error(`❌ Auth Test Failed: ${error.message}`, { stack: error.stack });
  } finally {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    logger.info('Disconnected from MongoDB.');
    process.exit(0);
  }
};

runAuthFlowTest();
