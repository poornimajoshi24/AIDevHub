import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { morganStream } from './config/logger.js';
import { ApiError } from './utils/ApiError.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

// Import Routes
import healthRouter from './routes/healthRoutes.js';

const app = express();

// 1. Global Security & Parsing Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// 2. HTTP Request Logger (Morgan -> Winston Stream)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: morganStream }));

// 3. API Routes
app.use('/api/v1/health', healthRouter);

// 4. Catch-all for 404 Unhandled Routes
app.use((req, res, next) => {
  next(new ApiError(404, `Cannot find route '${req.originalUrl}' on this server.`));
});

// 5. Global Error Handling Middleware (MUST be registered last)
app.use(errorMiddleware);

export { app };
