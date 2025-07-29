# UnlockED - UNSW Course Review Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io/)

## 🎓 Overview

UnlockED is a modern, comprehensive course review and discovery platform built specifically for UNSW students. It empowers students to make informed academic decisions through peer reviews, detailed course analytics, and gamified community engagement.

### ✨ Key Features

🔍 **Smart Course Discovery** - Advanced search and filtering across all UNSW faculties  
⭐ **Peer Review System** - Authentic reviews from verified UNSW students  
🎯 **Skills Tracking** - Comprehensive skill development mapping per course  
🏆 **Gamification** - Point rewards, leaderboards, and achievement tracking  
📊 **Data Analytics** - Rating distributions, workload insights, and trends  
🎨 **Modern UI/UX** - Dark/light theme, mobile responsive, UNSW-branded design  
🔐 **Secure Authentication** - Role-based access with JWT token security

## 🚀 Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/luci582/UnlockED.git
cd UnlockED
npm install
cd backend && npm install && cd ..

# 2. Initialize database
cd backend
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
cd ..

# 3. Start development servers
# Terminal 1 - Backend (port 3001)
cd backend && npm run dev

# Terminal 2 - Frontend (port 8080)  
npm run dev
```

**🌐 Access**: http://localhost:8080  
**🔑 Login**: `test@example.com` / `password123`  
**📊 Database**: `npx prisma studio` (from backend folder)

## 📱 Current Features

### � Course Discovery & Reviews
- **Browse 50+ UNSW Courses** with real data across multiple faculties
- **Advanced Filtering** by faculty, skills, rating, workload, and delivery mode
- **Course Comparison** - Side-by-side comparison of up to 3 courses
- **Top Course 2024 Badges** for highly-rated courses (4.5+ stars)
- **Detailed Course Pages** with comprehensive information and reviews

### ⭐ Enhanced Review System
- **Multi-Step Review Submission** with progress tracking
- **Rating Breakdown** hidden for students (visible for instructors/admins)
- **Skills Development Tracking** - Select skills gained from 40+ options
- **Workload Assessment** with UNSW semester options (T1, T2, T3)
- **Character Validation** with real-time feedback and tips

### 🏆 Gamification & Community
- **Point System** - Earn 50 points per review submission
- **Enhanced Leaderboard** with streak tracking and achievements
- **User Stats Dashboard** with progress bars and next-level indicators
- **Community Recognition** with badges and ranking system

### 🎨 Modern UI/UX
- **UNSW Design System** with official colors and branding
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Dark/Light Theme Toggle** with system preference detection
- **Interactive Components** with hover effects and smooth animations
- **Skills Display** showing 4 main skills with expandable "+X more" option

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript and modern hooks
- **Vite 6** for lightning-fast development and builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library built on Radix UI
- **Lucide React** for beautiful, consistent icons
- **React Router** for client-side navigation

### Backend & Database
- **Node.js 18+** with Express.js framework
- **TypeScript** for type-safe server development
- **SQLite** database with Prisma ORM
- **JWT Authentication** with bcrypt password hashing
- **Express Rate Limiting** and CORS protection

### Development Tools
- **ESLint** for code quality and consistency
- **Prisma Studio** for database management
- **Vite HMR** for instant development feedback
- **TypeScript Strict Mode** for enhanced type safety

## � Project Structure

```
UnlockED/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── Course/        # CourseCard, CourseDetail, Rating components
│   │   ├── Filter/        # Advanced filtering and search
│   │   ├── Layout/        # Header, navigation, theme management
│   │   └── ui/            # shadcn/ui component library
│   ├── pages/             # Main application routes
│   │   ├── Homepage.tsx   # Landing page with featured courses
│   │   ├── CoursesDirectory.tsx # Main course browsing
│   │   ├── CourseDetail.tsx     # Individual course pages
│   │   ├── SubmitReview.tsx     # Enhanced review submission
│   │   ├── Leaderboard.tsx      # Community leaderboard
│   │   └── Login.tsx            # Authentication
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and configurations
│   └── types/             # TypeScript definitions
├── backend/               # Node.js Express API
│   ├── src/
│   │   ├── routes/        # API endpoints (auth, courses, reviews)
│   │   ├── middleware/    # Authentication and error handling
│   │   └── utils/         # Logging and utilities
│   ├── prisma/           # Database schema and seeds
│   │   ├── schema.prisma # Database model definitions
│   │   └── seed.ts       # Sample data population
│   └── package.json      # Backend dependencies
├── public/               # Static assets
├── package.json          # Frontend dependencies
├── vite.config.ts        # Vite configuration
└── tailwind.config.ts    # Tailwind CSS setup
```

## �️ Database & Authentication

### Current Data
- **8 UNSW Courses** with realistic ratings and comprehensive details
- **8 Faculty Categories** (Engineering, Science, Commerce, etc.)
- **40+ Skills** mapped to courses (React, JavaScript, Machine Learning, etc.)
- **User Roles**: Student, Instructor, Admin with role-based access

### Enhanced Features
- **COMP6080** - 9 web development skills (React, JavaScript, Node.js, etc.)
- **COMP3900** - 10 software engineering skills (Project Management, Agile, etc.)
- **Realistic Ratings** (3.8-4.8 stars) with "Top Course 2024" badges
- **Skills Progression** showing 4 main skills with expandable details

### Test Accounts
```
Student: test@example.com / password123
Admin: admin@example.com / admin123
```

## 🚀 Development Workflow

### Daily Development
```bash
# Backend (Terminal 1)
cd backend && npm run dev
# → Runs on http://localhost:3001

# Frontend (Terminal 2)  
npm run dev
# → Runs on http://localhost:8080
```

### Database Operations
```bash
cd backend

# View data in browser
npx prisma studio

# Reset with fresh data
npm run db:reset

# Apply schema changes
npx prisma migrate dev

# Add test users only
npx tsx prisma/seed.ts
```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server (port 8080)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - ESLint code quality check

#### Backend
- `npm run dev` - Start API server with hot reload
- `npm run build` - Compile TypeScript
- `npm run db:studio` - Open database GUI
- `npm run db:reset` - Reset and reseed database

## 🔧 Configuration

### Environment Setup
The application works out-of-the-box with SQLite. No additional configuration needed.

### Port Configuration
- **Frontend**: http://localhost:8080 (Vite dev server)
- **Backend**: http://localhost:3001 (Express API server)
- **Database**: SQLite file-based (no external server needed)

## 🐛 Common Issues & Solutions

### Backend Not Starting
```bash
# Check if port 3001 is available
sudo lsof -i :3001

# Restart backend
cd backend && npm run dev
```

### Frontend Build Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Database Issues
```bash
cd backend
# Reset database completely
npx prisma migrate reset --force
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

### Login Not Working
```bash
cd backend
# Ensure test users exist
npx tsx prisma/seed.ts
# Test: test@example.com / password123
```

## 🎯 Recent Enhancements (July 2025)

### UI/UX Improvements
- ✅ **Enhanced CourseCard** with skill prioritization and visual hierarchy
- ✅ **Improved Leaderboard** with stats cards, progress bars, and streak tracking
- ✅ **Advanced Submit Review Form** with progress tracking and validation
- ✅ **Better Skills Display** showing 4 skills with working "+X more" expansion
- ✅ **UNSW Semester Dropdown** with T1, T2, T3 options for 2022-2025

### Data Enhancements
- ✅ **Comprehensive Skills Database** with 40+ technical and soft skills
- ✅ **Course-Skill Mapping** for COMP6080 (9 skills) and COMP3900 (10 skills)
- ✅ **Realistic Course Ratings** across 8 courses with Top Course badges
- ✅ **Faculty Categories** properly assigned to all courses

### Functionality Fixes
- ✅ **Working Submit Button** with proper validation and feedback
- ✅ **Fixed Skills Expansion** in course cards
- ✅ **Enhanced Form Validation** with character limits and progress tracking
- ✅ **Improved Course Routing** supporting both UUID and course codes

## 📈 Upcoming Features

- **Course Recommendations** based on skill preferences
- **Advanced Analytics Dashboard** for instructors
- **Review Moderation System** with community voting
- **Mobile App** for iOS and Android
- **Integration with UNSW Systems** for real-time course data

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our coding standards
4. **Test thoroughly** including both development and production builds
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a clear description

### Development Guidelines
- Follow TypeScript best practices and maintain type safety
- Use consistent code formatting (ESLint configuration provided)
- Write meaningful commit messages
- Test both development and production builds
- Update documentation for new features
- Ensure mobile responsiveness for UI changes

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- **[React Documentation](https://react.dev/)** - Frontend framework
- **[Vite Documentation](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Prisma Documentation](https://www.prisma.io/docs)** - Database ORM
- **[Express.js](https://expressjs.com/)** - Backend framework

---

**Last Updated**: July 29, 2025  
**Status**: Active Development  
**Version**: 2.1.0 (Enhanced UI/UX Edition)

**UnlockED** - Empowering UNSW students to make informed course decisions through community-driven insights and modern technology. 🎓✨

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
