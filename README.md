# UnlockED - UNSW Course Companion

# UnlockED - UNSW Course Companion

## Overview

UnlockED is a comprehensive course discovery and review platform designed specifically for UNSW students. It provides peer-reviewed insights, detailed course information, and advanced filtering capabilities to help students make informed decisions about their academic journey.

## Features

### 🎓 Course Discovery
- **Comprehensive Course Directory**: Browse and search through UNSW courses across all faculties
- **Advanced Filtering**: Filter by faculty, rating, delivery mode, and specific skills
- **Smart Search**: Search by course code, title, faculty, or skills
- **Course Comparison**: Side-by-side comparison of multiple courses
- **Multiple View Modes**: Grid and list views for optimal browsing experience

### ⭐ Peer Reviews & Ratings
- **Student Reviews**: Read authentic reviews from fellow UNSW students
- **Detailed Rating System**: Rate courses on multiple criteria (content, teaching, difficulty, workload)
- **Review Submission**: Multi-step review process with rich feedback options
- **Rating Distribution**: Visual charts showing rating breakdowns
- **Leaderboard**: Top-rated courses and most active reviewers

### 🎨 Modern User Experience
- **UNSW-Themed Design**: Official university color scheme and branding
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Interactive Components**: Clickable skill tags, expandable course details, animated transitions
- **Loading States**: Skeleton loaders and smooth transitions

### 🔐 User Authentication & Authorization
- **Secure Login/Signup**: Student account management with validation
- **Role-Based Access**: Different permissions for Students, Teachers, and Admins
- **Profile System**: Track your reviews, points, and course history
- **Admin Dashboard**: Course and user management for administrators
- **Session Management**: Persistent login with JWT tokens

### 📊 Analytics & Gamification
- **Point System**: Earn points for submitting reviews and engaging with content
- **Leaderboard**: Compete with other students for top reviewer status
- **Review Analytics**: Track your contribution to the community
- **Course Insights**: Data-driven course recommendations

## Technical Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing and navigation

### Backend & Database
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework for API development
- **PostgreSQL**: Production-ready relational database
- **Prisma ORM**: Type-safe database operations and migrations
- **JWT Authentication**: Secure token-based authentication

### UI/UX Framework
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: High-quality, accessible component library
- **Radix UI**: Accessible primitive components for complex interactions
- **Lucide React**: Professional icon library with 1000+ icons
- **Recharts**: Data visualization and charting library

### DevOps & Deployment
- **Docker**: Containerization for consistent deployments
- **Docker Compose**: Multi-container application orchestration
- **Nginx**: Web server and reverse proxy for production
- **GitHub Actions**: CI/CD pipeline automation
- **Chart.js**: Interactive data visualization

### Development Tools
- **ESLint**: Code quality and consistency
- **Prisma Studio**: Database management interface
- **TypeScript Strict Mode**: Enhanced type safety
- **Vite HMR**: Fast development with hot module replacement
- **Lucide React**: Beautiful, customizable icons
- **Radix UI**: Unstyled, accessible components (via shadcn/ui)

### Deployment & Infrastructure
- **Docker**: Containerized deployment with Alpine Linux base images
- **Docker Compose**: Multi-service orchestration
- **Nginx**: Production-ready web server with optimized configuration
- **Health Checks**: Automated container health monitoring
- **Production Build**: Optimized static assets with gzip compression

### State Management
- **React Hooks**: useState, useEffect, useMemo for local state
- **Local Storage**: Client-side persistence for user sessions
- **Context API**: Theme management and global state

## Getting Started

### Prerequisites
- **Docker & Docker Compose** - [Install Docker](https://docs.docker.com/get-docker/) (Recommended)
- OR **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Git** - [Install Git](https://git-scm.com/downloads)

### Quick Start with Docker (Recommended)

UnlockED is fully containerized and can be launched with a single command:

1. **Clone the repository**
   ```bash
   git clone https://github.com/luci582/UnlockED.git
   cd UnlockED
   ```

2. **Launch the application**
   ```bash
   # Option 1: Use Docker Compose directly
   docker compose up -d --build
   
   # Option 2: Use the deploy script (Linux/macOS)
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Access the application**
   - **🌐 Frontend**: http://localhost (port 80)
   - **🔧 Backend API**: http://localhost:3001 
   - **📊 Health Check**: http://localhost/api/test

4. **Default Admin Access**
   - Use admin key: `teamlockedin124` during signup for admin privileges
   - Regular users can sign up without any admin key

### Docker Management Commands

```bash
# View real-time logs
docker compose logs -f

# View specific service logs
docker compose logs -f frontend
docker compose logs -f backend

# Stop all services
docker compose down

# Rebuild and restart (after code changes)
docker compose down
docker compose build --no-cache
docker compose up -d

# Check service status and health
docker compose ps
docker ps

# Access backend container shell
docker compose exec backend sh

# Remove all containers and volumes (clean reset)
docker compose down -v
docker system prune -f
```

### Development Setup (Local)

For development with hot reload and debugging:

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/luci582/UnlockED.git
   cd UnlockED
   npm install
   cd backend && npm install && cd ..
   ```

2. **Environment setup**
   ```bash
   # Copy environment files
   cp .env.example .env
   # Edit .env with your configuration if needed
   ```

3. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev

   # Terminal 2: Start frontend
   cd ../
   npm run dev
   ```

4. **Access development servers**
   - **Frontend**: http://localhost:5173
   - **Backend**: http://localhost:3001

### Environment Configuration

UnlockED uses different environment configurations for development and production:

#### Development (`.env`)
```bash
# API Configuration - points to local backend
VITE_API_URL="http://localhost:3001/api"

# Database Configuration (if using local PostgreSQL)
DATABASE_URL="postgresql://unlocked_user:unlocked_password@localhost:5432/unlocked_db"

# Development Settings
NODE_ENV="development"
ENABLE_QUERY_LOGGING="true"
PRISMA_QUERY_LOG_LEVEL="info"
```

#### Production (`.env.production`) 
```bash
# API Configuration - uses nginx proxy in Docker
VITE_API_URL="/api"

# Production Settings
NODE_ENV="production"
ENABLE_QUERY_LOGGING="false"
PRISMA_QUERY_LOG_LEVEL="error"
```

#### Optional Configuration
```bash
# JWT Configuration (for future database integration)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# File Upload Configuration
MAX_FILE_SIZE="5MB"
ALLOWED_IMAGE_TYPES="jpg,jpeg,png,webp"

# Optional: Enable Prisma Studio
PRISMA_STUDIO_PORT=5555
```

## Authentication System

UnlockED features a role-based authentication system with three user types:

### User Roles
- **👨‍🎓 STUDENT**: Default role, can browse courses and submit reviews
- **👨‍🏫 TEACHER**: Can manage course content and moderate reviews  
- **👨‍💼 ADMIN**: Full system access, user management, and analytics

### Authentication Features
- **Secure Registration**: Email-based account creation with validation
- **Role Assignment**: Automatic student role or admin promotion with key
- **Session Management**: JWT-based persistent login sessions
- **Protected Routes**: Role-based access control for sensitive pages
- **Profile Management**: User profile with review history and points

### Getting Admin Access
To access admin features during signup:
1. Register with any valid email and password
2. Enter the admin key: `teamlockedin124`
3. Your account will be granted admin privileges automatically

### Current Implementation
The current version uses an in-memory authentication system for demonstration. In production, this integrates with PostgreSQL and Prisma for persistent user management.

### Available Scripts

#### Development
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

#### Database Management
- `npm run db:generate` - Generate Prisma client from schema
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Populate database with sample data
- `npm run db:reset` - Reset and reseed database
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:check` - Verify database connection and schema

#### Database Utilities
- `npm run db:migrate` - Run database migrations
- `npm run db:deploy` - Deploy migrations to production
- `npm run db:format` - Format Prisma schema file

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Course/         # Course-related components
│   ├── Filter/         # Filtering and search components
│   ├── Layout/         # Header, navigation, theme components
│   ├── Review/         # Review submission and display
│   └── ui/             # shadcn/ui component library
├── pages/              # Route components
│   ├── CoursesDirectory.tsx
│   ├── Homepage.tsx
│   ├── Login.tsx
│   ├── CourseDetail.tsx
│   └── Leaderboard.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
│   ├── database.ts     # Database operations and queries
│   ├── prisma.ts       # Prisma client configuration
│   └── utils.ts        # General utility functions
├── types/              # TypeScript type definitions
│   └── database.ts     # Database type definitions
└── main.tsx            # Application entry point

prisma/
├── schema.prisma       # Database schema definition
├── seed.ts            # Database seeding script
└── migrations/        # Database migration files

scripts/
├── check-database.js  # Database verification utility
└── setup-env.js      # Environment setup helper
```

## Database Features & Authentication

### Role-Based Access Control
- **Student Role**: Can view courses, submit reviews, track achievements
- **Teacher Role**: Can manage courses, moderate reviews, view analytics
- **Admin Role**: Full system access including user management

### User Management
- **Secure Authentication**: bcrypt password hashing with session management
- **User Profiles**: Track skills, achievements, and course history
- **Achievement System**: XP tracking and gamification features
- **Skill Framework**: Hierarchical skill system with prerequisites

### Course Management
- **Comprehensive Course Data**: 50+ fields including prerequisites, skills, faculty info
- **Skill Relationships**: Many-to-many mapping between courses and skills
- **Category System**: Organized course taxonomy with hierarchical structure
- **Review Analytics**: Rating calculations and review moderation

### Sample Data & Demo Accounts
The application comes with realistic sample data including:
- **5 User Accounts** (Students, Teachers, Admin)
- **6 Sample Courses** across different faculties
- **10 Skills** with prerequisite relationships
- **Multiple Reviews** with ratings and detailed feedback

**Demo Credentials:**
- **Admin**: `admin@unsw.edu.au` / `password`
- **Teacher**: `teacher@unsw.edu.au` / `password`
- **Student**: `student@unsw.edu.au` / `password`

## Docker Architecture

### Container Services
- **Frontend Container**: Nginx + React production build
  - Alpine Linux base image for minimal size
  - Multi-stage build for optimized production assets
  - Gzip compression and security headers
  - Health checks with automatic restart
  
- **Backend Container**: Node.js Express API
  - Alpine Linux base image with Node.js 18
  - Non-root user for enhanced security
  - In-memory data storage for simplicity
  - Health checks and graceful shutdown

### Production Features
- **Load Balancer Ready**: Nginx reverse proxy configuration
- **Security**: Non-root containers, security headers, restricted permissions
- **Monitoring**: Health checks for all services with automatic recovery
- **Scalability**: Stateless backend design for horizontal scaling
- **Optimization**: Gzip compression, static asset caching, optimized builds

## Key Features Implementation

### Advanced Filtering System
- **Multi-criteria Filtering**: Combine faculty, rating, mode, and skill filters
- **Real-time Updates**: Instant course list updates as filters change
- **Persistent State**: Filter selections maintained across navigation
- **Smart Skill Matching**: Courses must match ALL selected skills for precise results

### Responsive Course Cards
- **Expandable Skills**: Show/hide additional skill tags with "+X more" functionality
- **Clickable Tags**: All skill tags are interactive for quick filtering
- **Visual Feedback**: Hover effects and selection states
- **Consistent Information**: Rating, reviews, delivery mode, and effort level

### Theme System
- **UNSW Branding**: Official yellow primary color (#FFD700)
- **Dark Mode Support**: Complete dark theme with proper contrast
- **Theme Persistence**: User preference saved across sessions
- **Gradient Elements**: Modern visual effects with brand colors

## Database Documentation

📚 **[Complete Database Guide →](./DATABASE_README.md)**

Comprehensive documentation covering:
- **Schema Design**: 13+ interconnected tables with relationships
- **Setup Instructions**: Step-by-step database configuration
- **Sample Data**: Realistic courses, users, and reviews
- **API Reference**: Database operations and utility functions
- **Migration Guide**: Production deployment procedures

🔧 **[Migration Instructions →](./DATABASE_MIGRATION.md)**

Detailed migration guide for:
- **Production Setup**: Environment configuration and deployment
- **Data Migration**: Moving from development to production
- **Backup Procedures**: Database maintenance and recovery
- **Performance Optimization**: Indexing and query optimization

## Screenshots & Visual Documentation

📸 **[View Complete Screenshot Gallery →](./screenshots/README.md)**

Comprehensive visual documentation showcasing all application features across:
- ✨ Light and dark themes
- 📱 Desktop and mobile viewports  
- 🎯 Interactive features and user flows
- 🔍 Course filtering and search functionality
- 📊 Course detail pages and navigation

Perfect for understanding the user experience, design decisions, and feature implementations.

## Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## Development Guidelines

### Frontend Development
- **TypeScript**: Use proper typing for all components and functions
- **Component Structure**: Follow the established pattern for new components
- **Styling**: Use Tailwind CSS classes and shadcn/ui components
- **Accessibility**: Ensure all interactive elements are keyboard accessible
- **Responsive Design**: Test on multiple screen sizes

### Database Development
- **Schema Changes**: Always use Prisma migrations for schema modifications
- **Type Safety**: Leverage Prisma's generated types for database operations
- **Transactions**: Use database transactions for multi-step operations
- **Seeding**: Update seed script when adding new data requirements
- **Performance**: Consider indexing for frequently queried fields

### Security Practices
- **Authentication**: Never store passwords in plain text
- **Authorization**: Implement proper role-based access controls
- **Input Validation**: Validate all user inputs before database operations
- **SQL Injection**: Use Prisma's type-safe queries to prevent injection attacks

## Troubleshooting

### Common Issues and Solutions

#### 🐳 Docker Issues

**"Cannot GET /api/auth/login" Error**
- **Cause**: API routing issue between frontend and backend containers
- **Solution**: Restart Docker services
  ```bash
  docker compose down
  docker compose up -d --build
  ```

**Port Already in Use**
- **Cause**: Another service is using ports 80 or 3001
- **Solution**: Stop conflicting services or change ports in `docker-compose.yml`
  ```bash
  # Check what's using the ports
  sudo lsof -i :80
  sudo lsof -i :3001
  
  # Kill processes if needed
  sudo kill -9 <PID>
  ```

**Container Health Check Failures**
- **Cause**: Services not ready or networking issues
- **Solution**: Check logs and restart services
  ```bash
  docker compose logs -f backend
  docker compose logs -f frontend
  docker compose restart
  ```

#### 🔐 Authentication Issues

**Login/Signup Not Working**
- **Cause**: Backend API not accessible from frontend
- **Fix**: Ensure Docker containers are running and communicating
  ```bash
  # Test backend directly
  curl http://localhost:3001/api/test
  
  # Check container networking
  docker compose ps
  docker compose logs backend
  ```

**Admin Key Not Working**
- **Cause**: Incorrect admin key or case sensitivity
- **Solution**: Use exact key: `teamlockedin124` (case-sensitive)

#### 🌐 Network & API Issues

**Frontend Not Loading**
- **Cause**: Nginx container not running or port 80 blocked
- **Solution**: Check Docker status and port availability
  ```bash
  docker compose ps
  sudo netstat -tulpn | grep :80
  ```

**API Requests Failing**
- **Cause**: CORS issues or incorrect API URL
- **Solution**: Verify environment configuration
  ```bash
  # Check if .env.production is being used in Docker
  docker compose exec frontend cat /app/.env
  ```

#### 💾 Development Setup Issues

**npm install Failures**
- **Cause**: Node version compatibility or network issues
- **Solution**: Use correct Node version and clear cache
  ```bash
  nvm use 18
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

**Vite Build Errors**
- **Cause**: TypeScript errors or missing dependencies
- **Solution**: Fix TypeScript issues and reinstall
  ```bash
  npm run lint
  npm install
  npm run build
  ```

### Performance Optimization

- **Docker**: Use `docker compose down -v` to clear volumes if experiencing data issues
- **Build Cache**: Use `--no-cache` flag when rebuilding containers after significant changes
- **Logs**: Regularly check `docker compose logs` for performance bottlenecks
- **Resources**: Ensure Docker has sufficient memory allocation (4GB+ recommended)

### Getting Help

If you encounter issues not covered here:
1. **Check Docker logs**: `docker compose logs -f`
2. **Verify port availability**: `netstat -tulpn | grep :80\|:3001`
3. **Test API directly**: `curl http://localhost:3001/api/test`
4. **Review environment**: Ensure `.env.production` is properly configured

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow the coding standards
4. **Test thoroughly** including Docker builds
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a clear description

### Development Guidelines
- Follow TypeScript best practices and maintain type safety
- Use consistent code formatting (ESLint configuration provided)
- Write meaningful commit messages
- Test both development and Docker production builds
- Update documentation for new features

## Support & Resources

For questions, issues, or contributions:
- **🐛 Bug Reports**: [Open an issue](https://github.com/luci582/UnlockED/issues) on GitHub
- **💡 Feature Requests**: Use GitHub discussions for feature proposals  
- **📖 Documentation**: Check existing docs and README files
- **🔧 Technical Issues**: Include Docker logs and system information

### Useful Links
- **[Docker Documentation](https://docs.docker.com/)**: Container platform guide
- **[React Documentation](https://react.dev/)**: Frontend framework reference
- **[Vite Documentation](https://vitejs.dev/)**: Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Component library documentation

---

**UnlockED** - Empowering UNSW students to make informed course decisions through community-driven insights, comprehensive data, and modern technology.
