# UnlockED - UNSW Course Companion

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)

## Overview

UnlockED is a comprehensive course discovery and review platform designed specifically for UNSW students. It provides peer-reviewed insights, detailed course information, and advanced filtering capabilities to help students make informed decisions about their academic journey.

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/luci582/UnlockED.git
cd UnlockED
npm install
cd backend && npm install && cd ..

# 2. Set up database
cd backend
npx prisma migrate dev --name init
npx tsx prisma/quick-seed.ts
cd ..

# 3. Start servers (2 terminals)
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

**🌐 Open**: http://localhost:5173  
**🔑 Login**: `test@example.com` / `password123`

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
- **SQLite**: Lightweight, file-based database for local development
- **Prisma ORM**: Type-safe database operations and migrations
- **JWT Authentication**: Secure token-based authentication

### UI/UX Framework
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: High-quality, accessible component library
- **Radix UI**: Accessible primitive components for complex interactions
- **Lucide React**: Professional icon library with 1000+ icons
- **Recharts**: Data visualization and charting library

### DevOps & Deployment
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
- **Nginx**: Production-ready web server with optimized configuration
- **Production Build**: Optimized static assets with gzip compression

### State Management
- **React Hooks**: useState, useEffect, useMemo for local state
- **Local Storage**: Client-side persistence for user sessions
- **Context API**: Theme management and global state

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Git** - [Install Git](https://git-scm.com/downloads)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/luci582/UnlockED.git
   cd UnlockED
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```

4. **Set up the database**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Initialize the database with tables
   npx prisma migrate dev --name init
   
   # Seed the database with test data
   npx tsx prisma/quick-seed.ts
   
   # Return to root directory
   cd ..
   ```

5. **Run the application**
   ```bash
   # Start the backend (from the backend directory)
   cd backend
   npm run dev
   
   # In a new terminal, start the frontend (from the root directory)
   npm run dev
   ```

6. **Access the application**
   - **🌐 Frontend**: http://localhost:5173 (Vite dev server)
   - **🔧 Backend API**: http://localhost:3001 
   - **📊 API Health Check**: http://localhost:3001/api/health
   - **🗄️ Database Studio**: Run `npx prisma studio` in the backend directory

7. **Test Login Credentials**
   
   The database is seeded with these test accounts:
   
   **Student Account:**
   - Email: `test@example.com`
   - Password: `password123`
   
   **Admin Account:**
   - Email: `admin@example.com`
   - Password: `admin123`

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
   ```

3. **Database setup**
   ```bash
   cd backend
   # Create database tables
   npx prisma migrate dev --name init
   # Add test data
   npx tsx prisma/quick-seed.ts
   cd ..
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev

   # Terminal 2: Start frontend
   cd ../
   npm run dev
   ```

5. **Access development servers**
   - **Frontend**: http://localhost:5173
   - **Backend**: http://localhost:3001
   - **Database Studio**: `npx prisma studio` (from backend directory)

### Environment Configuration

UnlockED uses different environment configurations for development and production:

#### Development (`.env`)
```bash
# API Configuration - points to local backend
VITE_API_URL="http://localhost:3001/api"

# Database Configuration (SQLite file-based database)
DATABASE_URL="file:./dev.db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Development Settings
NODE_ENV="development"
```

#### Production (`.env.production`) 
```bash
# API Configuration - production API endpoint
VITE_API_URL="https://your-api-domain.com/api"

# Production Settings
NODE_ENV="production"
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
To access admin features:

**Option 1: Use Pre-created Admin Account**
- Email: `admin@example.com`
- Password: `admin123`

**Option 2: Create New Admin Account**
1. Register with any valid email and password
2. Enter the admin key: `teamlockedin124`
3. Your account will be granted admin privileges automatically

### Current Implementation
The application uses SQLite as the database with Prisma ORM for type-safe database operations. User authentication is handled via JWT tokens with bcrypt password hashing for security.

### Available Scripts

#### Development
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

#### Database Management
- `npm run db:generate` - Generate Prisma client from schema
- `npm run db:push` - Push schema changes to database  
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Populate database with sample data (full dataset)
- `npm run db:reset` - Reset and reseed database
- `npm run db:studio` - Open Prisma Studio (database GUI)

#### Quick Database Setup
- `npx tsx prisma/quick-seed.ts` - Add just test users for login (from backend directory)
- `npx prisma migrate dev --name init` - Initialize database with tables

## Project Structure

```
UnlockED/
├── backend/                 # Node.js Express API server
│   ├── src/
│   │   ├── routes/         # API endpoints (auth, courses, reviews)
│   │   ├── middleware/     # Authentication and error handling
│   │   └── utils/          # Logging and utilities
│   ├── prisma/             # Database schema and migrations
│   │   ├── schema.prisma   # Database schema definition
│   │   ├── seed.ts         # Database seeding script
│   │   └── migrations/     # Database migration files
│   ├── package.json        # Backend dependencies
│   └── server.ts           # Express server entry point
├── src/                    # React frontend application
│   ├── components/         # Reusable UI components
│   │   ├── Course/        # Course-related components
│   │   ├── Filter/        # Filtering and search components
│   │   ├── Layout/        # Header, navigation, theme components
│   │   └── ui/            # shadcn/ui component library
│   ├── pages/             # Route components and main views
│   │   ├── CoursesDirectory.tsx
│   │   ├── Homepage.tsx
│   │   ├── Login.tsx
│   │   ├── CourseDetail.tsx
│   │   └── Leaderboard.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and configurations
│   │   ├── database.ts    # Database operations and queries
│   │   ├── prisma.ts      # Prisma client configuration
│   │   └── utils.ts       # General utility functions
│   ├── types/             # TypeScript type definitions
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── package.json           # Frontend dependencies and scripts
├── vite.config.ts         # Vite build configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── README.md              # Project documentation
```
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
The application comes with test accounts for immediate use:

**Test Credentials:**
- **Student**: `test@example.com` / `password123`
- **Admin**: `admin@example.com` / `admin123`

For a full dataset with courses and reviews, run the complete seed:
```bash
cd backend
npm run db:seed
```

This will add:
- **6 Sample Courses** across different faculties
- **10 Skills** with prerequisite relationships  
- **Multiple Reviews** with ratings and detailed feedback
- **Additional Users** (Students, Teachers)

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

#### � Authentication Issues

**Login/Signup Not Working**
- **Cause**: Backend API not accessible from frontend
- **Fix**: Ensure both frontend and backend services are running
  ```bash
  # Test backend directly
  curl http://localhost:3001/api/health
  
  # Check if services are running
  ps aux | grep node
  ```

**Can't Login with Test Credentials**
- **Cause**: Database not seeded with test users
- **Solution**: Run the quick seed script
  ```bash
  cd backend
  npx tsx prisma/quick-seed.ts
  ```
- **Test with**: `test@example.com` / `password123`

**Database Issues**
- **Cause**: Database not initialized or corrupted
- **Solution**: Reset and recreate the database
  ```bash
  cd backend
  npx prisma migrate reset --force
  npx prisma migrate dev --name init
  npx tsx prisma/quick-seed.ts
  ```

**Port Already in Use**
- **Cause**: Another service is using ports 5173 or 3001
- **Solution**: Stop conflicting services or change ports
  ```bash
  # Check what's using the ports
  sudo lsof -i :5173
  sudo lsof -i :3001
  
  # Kill processes if needed
  sudo kill -9 <PID>
  ```

#### 🌐 Network & API Issues

**Frontend Not Loading**
- **Cause**: Development server not running or port blocked
- **Solution**: Check if the frontend is running
  ```bash
  # Check if Vite dev server is running
  ps aux | grep vite
  sudo netstat -tulpn | grep :5173
  ```

**API Requests Failing**
- **Cause**: CORS issues or incorrect API URL
- **Solution**: Verify environment configuration
  ```bash
  # Check current environment variables
  cat .env
  # Ensure VITE_API_URL points to the correct backend
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

- **Build Cache**: Clear npm cache if experiencing build issues: `npm cache clean --force`
- **Development**: Use `npm run dev` for hot reload during development
- **Production**: Optimize builds with `npm run build`

### Getting Help

If you encounter issues not covered here:
1. **Check application logs**: Look at console output from `npm run dev`
2. **Verify port availability**: `netstat -tulpn | grep :5173\|:3001`
3. **Test API directly**: `curl http://localhost:3001/api/health`
4. **Reset database**: `cd backend && npx prisma migrate reset --force`
5. **Review environment**: Ensure `.env` file exists and has correct values

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow the coding standards
4. **Test thoroughly** including production builds
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a clear description

### Development Guidelines
- Follow TypeScript best practices and maintain type safety
- Use consistent code formatting (ESLint configuration provided)
- Write meaningful commit messages
- Test both development and production builds
- Update documentation for new features

## Support & Resources

For questions, issues, or contributions:
- **🐛 Bug Reports**: [Open an issue](https://github.com/luci582/UnlockED/issues) on GitHub
- **💡 Feature Requests**: Use GitHub discussions for feature proposals  
- **📖 Documentation**: Check existing docs and README files
- **🔧 Technical Issues**: Include logs and system information

### Useful Links
- **[React Documentation](https://react.dev/)**: Frontend framework reference
- **[Vite Documentation](https://vitejs.dev/)**: Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Component library documentation
- **[Prisma Documentation](https://www.prisma.io/docs)**: Database ORM and tooling
- **[Express.js Documentation](https://expressjs.com/)**: Backend framework

## Development Workflow

### Daily Development
```bash
# Start both servers in development mode
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### Database Operations
```bash
# Initialize database (first time setup)
cd backend
npx prisma migrate dev --name init

# Add test users for login
npx tsx prisma/quick-seed.ts

# Reset and reseed database with full sample data
npm run db:reset

# View database in browser
npx prisma studio
```

### Building for Production
```bash
# Build frontend for production
npm run build

# Preview production build locally
npm run preview
```

---

**Last Updated**: July 2025  
**Status**: Active Development  
**Version**: 2.0.0 (SQLite Edition - Ready to Use)

**UnlockED** - Empowering UNSW students to make informed course decisions through community-driven insights, comprehensive data, and modern technology.
