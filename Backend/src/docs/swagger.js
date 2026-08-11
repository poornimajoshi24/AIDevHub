import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AIDevHub REST API Documentation',
      version: '1.0.0',
      description:
        'Enterprise AI-Powered Developer Platform API. Provides resume ATS optimization, GitHub repository code quality auditing, JWT authentication, and background queue processing.',
      contact: {
        name: 'AIDevHub Engineering Team',
        url: 'https://aidevhub.io',
      },
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development Server (Single-Port Single SPA Architecture)',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
          description: 'HttpOnly Access Token JWT Cookie',
        },
      },
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', example: 200 },
            data: { type: 'object' },
            message: { type: 'string', example: 'Operation completed successfully.' },
            success: { type: 'boolean', example: true },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a71f1c29039312a1e514c91' },
            name: { type: 'string', example: 'Morgan Architect' },
            email: { type: 'string', example: 'morgan@aidevhub.io' },
            role: { type: 'string', example: 'senior_engineer' },
            tier: { type: 'string', example: 'Pro AI Architect' },
            isVerified: { type: 'boolean', example: true },
          },
        },
        Resume: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            fileName: { type: 'string', example: 'Staff_Engineer_Resume.pdf' },
            fileUrl: { type: 'string', example: 'https://cdn.aidevhub.io/resumes/resume.pdf' },
            overallScore: { type: 'integer', example: 94 },
            atsScore: {
              type: 'object',
              properties: {
                score: { type: 'integer', example: 94 },
                grade: { type: 'string', example: 'A+' },
                status: { type: 'string', example: 'Highly Optimized' },
              },
            },
          },
        },
        GithubAudit: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            repoName: { type: 'string', example: 'morgandev/next-cloud-engine' },
            repoUrl: { type: 'string', example: 'https://github.com/morgandev/next-cloud-engine' },
            qualityScore: { type: 'integer', example: 97 },
            securityScore: { type: 'integer', example: 99 },
            maintainability: { type: 'string', example: 'A+' },
          },
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/app.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
