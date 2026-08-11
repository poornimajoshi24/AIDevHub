import nodemailer from 'nodemailer';
import { logger } from '../config/logger.js';

/**
 * Utility function to dispatch out-of-band emails (password resets, notifications)
 * 
 * @param {Object} options - Email parameters: { email, subject, message, html }
 */
export const sendEmail = async (options) => {
  const { email, subject, message, html } = options;

  // Check if custom SMTP credentials exist
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"AIDevHub Security" <${process.env.SMTP_FROM || 'noreply@aidevhub.io'}>`,
      to: email,
      subject: subject,
      text: message,
      html: html || `<p>${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`📧 Out-of-band email sent to [${email}] — MessageID: ${info.messageId}`);
    return info;
  } else {
    // Development fallback: Log email message content via Winston logger
    logger.info(`📧 [DEV EMAIL SIMULATION] To: ${email} | Subject: ${subject}`);
    logger.info(`Body: ${message}`);
    return { messageId: 'simulated-dev-id' };
  }
};
