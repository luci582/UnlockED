# UnlockED Docker Deployment

This guide explains how to run the UnlockED platform using Docker with Alpine Linux base images.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd uni-unlockedlockedin
   ```

2. **Build and start the services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3001

## Architecture

The application consists of two services:

### Backend Service
- **Base Image:** `node:18-alpine`
- **Port:** 3001
- **Features:**
  - Express.js API server
  - JWT authentication
  - In-memory data storage
  - Health checks
  - Non-root user security

### Frontend Service
- **Base Image:** `nginx:alpine`
- **Port:** 80
- **Features:**
  - React application built with Vite
  - Nginx web server
  - API proxy to backend
  - Static asset caching
  - Security headers
  - Client-side routing support

## Development vs Production

### Development Mode
```bash
# Start frontend dev server
npm run dev

# Start backend dev server
cd backend && node server-simple.js
```

### Production Mode (Docker)
```bash
# Build and run with Docker Compose
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Docker Commands

### Build individual services
```bash
# Build backend
docker build -t unlockedin-backend ./backend

# Build frontend
docker build -t unlockedin-frontend .
```

### Run individual containers
```bash
# Run backend
docker run -p 3001:3001 unlockedin-backend

# Run frontend (requires backend)
docker run -p 80:80 unlockedin-frontend
```

### Management Commands
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs [service-name]

# Restart services
docker-compose restart

# Update and rebuild
docker-compose up --build --force-recreate

# Clean up
docker-compose down --volumes --remove-orphans
```

## Configuration

### Environment Variables
- `NODE_ENV`: Set to 'production' in Docker
- `PORT`: Backend port (default: 3001)

### Admin Access
- Admin key: `teamlockedin124`
- Use this key during signup to get admin privileges

### API Endpoints
- `GET /api/test` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/reviews` - Submit review
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/admin/*` - Admin endpoints

## Security Features

### Container Security
- Non-root users in both containers
- Minimal Alpine Linux base images
- Health checks for monitoring
- Secure nginx configuration

### Application Security
- JWT authentication
- CORS configuration
- Security headers
- Input validation

## Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Change ports in docker-compose.yml
   ports:
     - "8080:80"  # Frontend
     - "3002:3001"  # Backend
   ```

2. **Build failures:**
   ```bash
   # Clean build
   docker-compose down --volumes
   docker system prune -a
   docker-compose up --build
   ```

3. **API connection issues:**
   - Check backend health: http://localhost:3001/api/test
   - Verify network connectivity between containers
   - Check docker-compose logs

### Logs and Debugging
```bash
# View all logs
docker-compose logs

# Follow specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute commands in running container
docker-compose exec backend sh
docker-compose exec frontend sh
```

## Production Deployment

For production deployment, consider:

1. **Use external database** instead of in-memory storage
2. **Configure SSL/TLS** with reverse proxy
3. **Set up monitoring** and log aggregation
4. **Use secrets management** for sensitive data
5. **Configure backup strategies**
6. **Set resource limits** in docker-compose.yml

## Performance Optimization

### Frontend
- Static assets are cached for 1 year
- Gzip compression enabled
- Minified production build

### Backend
- Health checks for reliability
- CORS optimized for specific origins
- Efficient JSON responses

## License

MIT License - see LICENSE file for details
