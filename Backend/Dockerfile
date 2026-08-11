# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package manifests
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

# Copy dependencies and source code from builder
COPY --from=builder /app /app

# Ensure correct permissions for temp and log directories
RUN mkdir -p /app/public/temp /app/logs && \
    chown -R nodeuser:nodejs /app

USER nodeuser

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/api/v1/health || exit 1

CMD ["node", "server.js"]
