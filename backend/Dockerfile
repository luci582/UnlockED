# Multi-stage build for Node.js backend with Alpine Linux

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ openssl

# Copy package files
COPY package*.json ./

# Install dependencies including dev dependencies for building
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Install security updates and runtime dependencies
RUN apk update && apk upgrade && apk add --no-cache \
    curl \
    openssl \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S backend-user && \
    adduser -S -D -H -u 1001 -h /var/cache/backend -s /sbin/nologin -G backend-user -g backend-user backend-user

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Change ownership to non-root user
RUN chown -R backend-user:backend-user /app

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3001/api/health || exit 1

# Switch to non-root user
USER backend-user

# Start the application
CMD ["npm", "start"]
