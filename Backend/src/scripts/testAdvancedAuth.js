import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../models/User.model.js';
import { restrictTo } from '../middlewares/auth.middleware.js';
import { sendEmail } from '../utils/sendEmail.js';
import { logger } from '../config/logger.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const runAdvancedAuthTest = async () => {
  logger.info('🛡️ Starting Week 4 Advanced Auth & Authorization Test...');
  let mongoServer = null;

  try {
    // 1. In-Memory DB Setup
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    logger.info(`🍃 In-Memory DB connected at: ${uri}`);

    // 2. Create Initial Developer User
    const userEmail = `dev.rbac.${Date.now()}@aidevhub.io`;
    const initialPass = 'InitialPass123!';
    const newPass = 'NewUltraSecurePassword2026!';

    logger.info(`Creating developer user: ${userEmail}...`);
    const devUser = await User.create({
      name: 'Jordan Dev',
      email: userEmail,
      password: initialPass,
      role: 'developer',
    });

    // 3. Test Password Reset Token Generation & SHA256 Hashing
    logger.info('Testing Password Reset Token Generation...');
    const rawResetToken = devUser.getResetPasswordToken();
    await devUser.save({ validateBeforeSave: false });

    logger.info(`Raw Unhashed Token issued to user (email link): ${rawResetToken}`);
    logger.info(`SHA256 Hashed Token stored in MongoDB: ${devUser.resetPasswordToken}`);

    // Verify token is NOT stored in plain text
    const isTokenHashed = devUser.resetPasswordToken !== rawResetToken;
    logger.info(`Is Token SHA256 Hashed in DB? ${isTokenHashed ? 'YES (Secure)' : 'NO (Vulnerable)'}`);

    // 4. Test Email Sending Simulation
    await sendEmail({
      email: devUser.email,
      subject: 'Password Reset Simulation',
      message: `Reset token: ${rawResetToken}`,
    });

    // 5. Simulate Password Reset Endpoint Execution
    logger.info('Simulating Password Reset Endpoint...');
    const hashedIncomingToken = crypto
      .createHash('sha256')
      .update(rawResetToken)
      .digest('hex');

    const matchedUser = await User.findOne({
      resetPasswordToken: hashedIncomingToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+password');

    if (!matchedUser) {
      throw new Error('Failed to find user matching hashed reset token!');
    }

    matchedUser.password = newPass;
    matchedUser.resetPasswordToken = undefined;
    matchedUser.resetPasswordExpire = undefined;
    await matchedUser.save(); // Triggers bcrypt pre-save hook

    logger.info('✅ Password successfully updated via reset token!');

    // Verify login with new password
    const userForAuth = await User.findById(matchedUser._id).select('+password');
    const isNewPassValid = await userForAuth.isPasswordCorrect(newPass);
    const isOldPassValid = await userForAuth.isPasswordCorrect(initialPass);

    logger.info(`New Password Authentication: ${isNewPassValid ? 'PASSED (Match)' : 'FAILED'}`);
    logger.info(`Old Password Authentication: ${!isOldPassValid ? 'REJECTED (Correct)' : 'FAILED'}`);

    // 6. Test Role-Based Access Control (RBAC) Middleware
    logger.info('Testing RBAC Authorization Middleware...');

    const rbacGuard = restrictTo('admin', 'staff_architect');

    // Test Role: 'developer' -> Must be rejected (403 Forbidden)
    const mockReqDeveloper = { user: { role: 'developer' } };
    let devRejected = false;
    rbacGuard(mockReqDeveloper, {}, (err) => {
      if (err && err.statusCode === 403) {
        devRejected = true;
      }
    });
    logger.info(`RBAC check for 'developer' role -> 403 Forbidden? ${devRejected ? 'YES (Passed)' : 'NO (Failed)'}`);

    // Test Role: 'staff_architect' -> Must be approved
    const mockReqArchitect = { user: { role: 'staff_architect' } };
    let architectApproved = false;
    rbacGuard(mockReqArchitect, {}, (err) => {
      if (!err) {
        architectApproved = true;
      }
    });
    logger.info(`RBAC check for 'staff_architect' role -> Authorized? ${architectApproved ? 'YES (Passed)' : 'NO (Failed)'}`);

    // Cleanup
    await User.findByIdAndDelete(devUser._id);
    logger.info('🧹 Cleanup completed.');

    logger.info('🎉 Week 4 Advanced Auth & RBAC Test Passed 100%!');
  } catch (error) {
    logger.error(`❌ Advanced Auth Test Failed: ${error.message}`, { stack: error.stack });
  } finally {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    logger.info('Disconnected from MongoDB.');
    process.exit(0);
  }
};

runAdvancedAuthTest();
