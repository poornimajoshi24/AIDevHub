import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { logger } from '../config/logger.js';

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'aidevhub-demo',
  api_key: process.env.CLOUDINARY_API_KEY || '1234567890',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'secret_key',
});

/**
 * Uploads local temporary file to Cloudinary CDN
 * Automatically cleans up local disk file after upload or error
 * 
 * @param {String} localFilePath - Path to temporary file on disk
 * @returns {Object|null} Cloudinary response object { url, public_id } or null on fallback
 */
export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    // If real Cloudinary API keys are configured, upload to Cloudinary CDN
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_CLOUD_NAME !== 'aidevhub-demo') {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto',
        folder: 'aidevhub_resumes',
      });

      // Remove local temporary file
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }

      logger.info(`☁️ Asset uploaded to Cloudinary: ${response.secure_url}`);
      return response;
    } else {
      // Development fallback: Return simulated CDN asset URL & clean temp file
      const fileName = path.basename(localFilePath);
      const simulatedUrl = `https://cdn.aidevhub.io/resumes/${Date.now()}_${fileName}`;

      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }

      logger.info(`☁️ [DEV STORAGE SIMULATION] File processed: ${simulatedUrl}`);
      return {
        url: simulatedUrl,
        secure_url: simulatedUrl,
        public_id: `resumes_${Date.now()}`,
      };
    }
  } catch (error) {
    logger.error(`Cloudinary upload failure: ${error.message}`);
    // Ensure temp file is unlinked on failure
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

/**
 * Deletes file from Cloudinary CDN
 * 
 * @param {String} publicId - Public ID of asset on Cloudinary
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;

  try {
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_CLOUD_NAME !== 'aidevhub-demo') {
      const result = await cloudinary.uploader.destroy(publicId);
      logger.info(`🗑️ Deleted asset from Cloudinary: ${publicId}`);
      return result;
    }
    return { result: 'ok' };
  } catch (error) {
    logger.error(`Cloudinary delete failure: ${error.message}`);
    return null;
  }
};
