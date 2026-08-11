import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { morganStream } from './config/logger.js';
import { ApiError } from './utils/ApiError.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { globalRateLimiter, authRateLimiter } from './middlewares/rateLimiter.middleware.js';
import { swaggerSpec } from './docs/swagger.js';

// Import Routes
import healthRouter from './routes/healthRoutes.js';
import authRouter from './routes/authRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import githubRouter from './routes/githubRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../Frontend/dist');


const app = express();

// 1. Global Security & Performance Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = (process.env.CORS_ORIGIN || 'http://localhost:5173')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      // Non-browser clients and same-origin requests may omit Origin
      if (!origin || allowed.includes('*') || allowed.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
  })
);

// Gzip HTTP Body Response Compression
app.use(compression());

// Body Parsers with 16kb payload limits
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// NoSQL Query Injection Protection (Strips $ and . from req.body/params/query)
app.use(mongoSanitize());

// Global Rate Limiter (100 req / 15m)
app.use(globalRateLimiter);

// 2. HTTP Request Logger (Morgan -> Winston Stream)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: morganStream }));

// 3. OpenAPI Swagger UI Interactive Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4. API Routes (Auth rate limiter applied specifically to login & register)
app.use('/api/v1/auth/login', authRateLimiter);
app.use('/api/v1/auth/register', authRateLimiter);

app.use('/api/v1/health', healthRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/resumes', resumeRouter);
app.use('/api/v1/github', githubRouter);

// 5. Serve Frontend Static Production Build Assets
app.use(express.static(frontendDistPath));

// 6. SPA Wildcard  Fallback Route (Serves React index.html for frontend pages)
app.get('*', (req, res, next) => {
    if (
        req.originalUrl.startsWith('/api') ||
        req.originalUrl.startsWith('/api-docs')
    ) {
        return next(
            new ApiError(
                404,
                `Cannot find route '${req.originalUrl}' on this server.`
            )
        );
    }

    res.sendFile(path.join(frontendDistPath, 'index.html'));
});
// 7. Global Error Handling Middleware (MUST be registered last)
app.use(errorMiddleware);


export { app };