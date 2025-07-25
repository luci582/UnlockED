# Use Node.js Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package-docker.json package.json
COPY server-simple.js ./

# Install dependencies
RUN npm install --only=production

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Change ownership of the app directory
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Expose the port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/test', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "server-simple.js"]
