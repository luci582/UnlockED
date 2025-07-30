# UnlockED Docker Deployment

This project is fully containerized using Docker with Alpine Linux for optimal performance and security.

## 🚀 Quick Start

### Prerequisites
- Docker (version 20.10+)
- Docker Compose (version 2.0+)
- 4GB+ RAM available
- 10GB+ disk space

### 1. Clone and Setup
```bash
git clone <repository-url>
cd UnlockED
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

### 3. Deploy Application
```bash
# Development mode
./deploy.sh dev

# Production mode  
./deploy.sh prod
```

### 4. Access Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001/api
- **Database**: localhost:5432
- **Redis**: localhost:6379

## 🏗️ Architecture

### Services
- **Frontend** (nginx:alpine + React): Serves the web application
- **Backend** (node:18-alpine): REST API server
- **Database** (postgres:15-alpine): Primary data storage
- **Redis** (redis:7-alpine): Caching layer

### Security Features
- Non-root users in all containers
- Security headers and CORS protection
- Rate limiting and request validation
- Health checks for all services
- Secure secrets management

## 📋 Management Commands

```bash
# View service status
./deploy.sh status

# View logs
./deploy.sh logs                # All services
./deploy.sh logs-backend       # Backend only
./deploy.sh logs-frontend      # Frontend only
./deploy.sh logs-db           # Database only

# Service control
./deploy.sh start             # Start services
./deploy.sh stop              # Stop services
./deploy.sh restart           # Restart services

# Development tools
./deploy.sh shell-backend     # Backend container shell
./deploy.sh shell-db          # Database shell

# Cleanup
./deploy.sh cleanup           # Remove all containers and volumes
```

## 🔧 Configuration

### Environment Variables (.env)
```env
# Database
DATABASE_NAME=unlocked
DATABASE_USER=unlocked_user
DATABASE_PASSWORD=your_secure_password
DATABASE_PORT=5432

# Backend
BACKEND_PORT=3001
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production

# Frontend
FRONTEND_PORT=80

# Redis
REDIS_PASSWORD=your_redis_password
REDIS_PORT=6379
```

### Port Configuration
| Service  | Internal Port | External Port | Configurable |
|----------|---------------|---------------|--------------|
| Frontend | 80            | 80            | Yes          |
| Backend  | 3001          | 3001          | Yes          |
| Database | 5432          | 5432          | Yes          |
| Redis    | 6379          | 6379          | Yes          |

## 🔍 Health Monitoring

### Health Check Endpoints
- **Frontend**: `GET /health`
- **Backend**: `GET /api/health`

### Service Status
```bash
# Check all services
docker-compose ps

# Check specific service health
curl http://localhost/health
curl http://localhost:3001/api/health
```

## 🛠️ Development

### Hot Reloading
For development with hot reloading:

```bash
# Start database only
docker-compose up -d postgres redis

# Run frontend and backend locally
npm run dev                    # Frontend (port 8080)
cd backend && npm run dev      # Backend (port 3001)
```

### Database Operations
```bash
# Run migrations
docker-compose exec backend npx prisma db push

# Seed database
docker-compose exec backend npm run db:seed

# Reset database
docker-compose exec backend npm run db:reset

# Open Prisma Studio
docker-compose exec backend npx prisma studio
```

## 🔒 Security

### Container Security
- All containers run as non-root users
- Minimal Alpine Linux base images
- Security-focused nginx configuration
- Environment variable secrets
- Network isolation

### Application Security
- CORS protection
- Rate limiting
- Security headers
- Input validation
- JWT authentication

## 📦 Production Deployment

### Resource Requirements
- **CPU**: 2+ cores recommended
- **RAM**: 4GB+ recommended
- **Storage**: 20GB+ for data persistence
- **Network**: 1Gbps+ for optimal performance

### Scaling
```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Scale with load balancer (requires nginx.conf updates)
docker-compose up -d --scale backend=3 --scale frontend=2
```

### Backup
```bash
# Database backup
docker-compose exec postgres pg_dump -U unlocked_user unlocked > backup.sql

# Restore database
docker-compose exec -T postgres psql -U unlocked_user -d unlocked < backup.sql
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using ports
   lsof -i :80
   lsof -i :3001
   lsof -i :5432
   ```

2. **Database connection issues**
   ```bash
   # Check database logs
   ./deploy.sh logs-db
   
   # Test database connection
   docker-compose exec postgres pg_isready -U unlocked_user
   ```

3. **Out of disk space**
   ```bash
   # Clean up Docker system
   docker system prune -a
   
   # Remove unused volumes
   docker volume prune
   ```

4. **Memory issues**
   ```bash
   # Check container resource usage
   docker stats
   
   # Restart services with more memory
   docker-compose down
   docker-compose up -d
   ```

### Logs Analysis
```bash
# Follow all logs
./deploy.sh logs

# Search for errors
./deploy.sh logs | grep -i error

# Check last 100 lines
./deploy.sh logs --tail=100
```

## 📝 Environment Examples

### Development (.env)
```env
NODE_ENV=development
DATABASE_PASSWORD=dev_password
JWT_SECRET=dev_jwt_secret
FRONTEND_PORT=8080
CORS_ORIGIN=http://localhost:8080
```

### Production (.env)
```env
NODE_ENV=production
DATABASE_PASSWORD=super_secure_password_123!
JWT_SECRET=ultra_secure_jwt_secret_key_with_256_bits
FRONTEND_PORT=80
CORS_ORIGIN=https://yourdomain.com
```

## 🔄 Updates

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
./deploy.sh stop
./deploy.sh prod

# Or use restart for minor updates
./deploy.sh restart
```

### Updating Dependencies
```bash
# Rebuild containers with --no-cache
docker-compose build --no-cache
./deploy.sh restart
```

## 📞 Support

For issues or questions:
1. Check the logs: `./deploy.sh logs`
2. Verify service health: `./deploy.sh status`
3. Review this documentation
4. Contact the development team
