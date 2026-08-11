import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    },
    role: {
      type: String,
      enum: ['developer', 'senior_engineer', 'staff_architect', 'admin'],
      default: 'senior_engineer',
    },
    githubUsername: {
      type: String,
      default: '',
    },
    tier: {
      type: String,
      default: 'Pro AI Architect',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save Mongoose Hook: Hashes password with bcryptjs before persisting
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Custom Instance Method: Verifies candidate password against stored bcryptjs hash
 */
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Custom Instance Method: Generates short-lived Access Token JWT (15 minutes)
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET || 'aidevhub_access_secret_key_2026_super_secure',
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    }
  );
};

/**
 * Custom Instance Method: Generates long-lived Refresh Token JWT (7 days)
 */
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET || 'aidevhub_refresh_secret_key_2026_super_secure',
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    }
  );
};

/**
 * Custom Instance Method: Generates SHA256 hashed temporary reset token
 */
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

export const User = mongoose.model('User', userSchema);
