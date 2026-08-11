import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/User.model.js';
import { addEmailToQueue } from '../queues/email.queue.js';

/**
 * Generates Access and Refresh Tokens for User & saves Refresh Token to DB
 */
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating security tokens.');
  }
};

/**
 * Cookie options for HttpOnly secure JWT delivery
 */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * POST /api/v1/auth/register
 */
export const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if ([name, email, password].some((field) => !field || field.trim() === '')) {
    throw new ApiError(400, 'All fields (name, email, password) are required.');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists.');
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: role || 'senior_engineer',
  });

  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    throw new ApiError(500, 'User registration failed.');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(createdUser._id);

  // Offload Welcome Email job to BullMQ queue (< 5ms)
  addEmailToQueue({
    to: createdUser.email,
    subject: 'Welcome to AIDevHub!',
    message: `Hello ${createdUser.name}, welcome to AIDevHub! Your AI-powered developer platform account is ready.`,
  });

  return res
    .status(201)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, accessToken, refreshToken },
        'User registered and authenticated successfully.'
      )
    );
});

/**
 * POST /api/v1/auth/login
 */
export const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required.');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    throw new ApiError(404, 'User does not exist with this email.');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid user credentials.');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  const loggedInUser = await User.findById(user._id);

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'User logged in successfully.'
      )
    );
});

/**
 * POST /api/v1/auth/logout
 */
export const logoutUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(200, {}, 'User logged out successfully.'));
});

/**
 * POST /api/v1/auth/refresh-token
 */
export const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request: Missing refresh token.');
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET || 'aidevhub_refresh_secret_key_2026_super_secure'
    );
  } catch {
    throw new ApiError(401, 'Refresh token is expired or invalid.');
  }

  const user = await User.findById(decodedToken?._id);
  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, 'Refresh token is expired or invalid.');
  }

  const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', newRefreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        'Access token refreshed successfully.'
      )
    );
});

/**
 * GET /api/v1/auth/me
 */
export const getCurrentUser = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, 'Current user profile fetched successfully.'));
});

/**
 * POST /api/v1/auth/forgot-password
 * Offloads password reset email to BullMQ background queue (< 5ms)
 */
export const forgotPassword = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, 'Please provide an email address.');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(404, 'No account found with this email address.');
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

  // Offload Password Reset Email job to BullMQ queue (< 5ms)
  addEmailToQueue({
    to: user.email,
    subject: 'AIDevHub - Password Reset Request',
    message: `You requested a password reset. Please click this link: ${resetUrl}`,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { resetTokenSent: true },
        'Password reset link generated and enqueued to background queue successfully.'
      )
    );
});

/**
 * POST /api/v1/auth/reset-password/:token
 */
export const resetPassword = AsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 8) {
    throw new ApiError(400, 'New password must be at least 8 characters long.');
  }

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+password');

  if (!user) {
    throw new ApiError(400, 'Password reset token is invalid or has expired.');
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        'Password reset successful. User re-authenticated.'
      )
    );
});
