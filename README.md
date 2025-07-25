# UnlockED - UNSW Course Companion

## Overview

UnlockED is a comprehensive course discovery and review platform designed specifically for UNSW students. It provides peer-reviewed insights, detailed course information, and advanced filtering capabilities to help students make informed decisions about their academic journey.

## Features

### 🎓 Course Discovery
- **Comprehensive Course Directory**: Browse and search through UNSW courses across all faculties
- **Advanced Filtering**: Filter by faculty, rating, delivery mode, and specific skills
- **Smart Search**: Search by course code, title, faculty, or skills
- **Multiple View Modes**: Grid and list views for optimal browsing experience

### ⭐ Peer Reviews & Ratings
- **Student Reviews**: Read authentic reviews from fellow UNSW students
- **Star Ratings**: Quick visual assessment of course quality
- **Review Submission**: Share your own course experiences
- **Leaderboard**: Top-rated courses and active reviewers

### 🎨 Modern User Experience
- **UNSW-Themed Design**: Official university color scheme and branding
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Interactive Components**: Clickable skill tags, expandable course details

### 🔐 User Authentication
- **Secure Login/Signup**: Student account management
- **Profile System**: Track your reviews and course history
- **Session Management**: Persistent login across browser sessions

## Technical Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing and navigation

### Database & Backend
- **PostgreSQL**: Production-ready relational database
- **Prisma ORM**: Type-safe database operations and migrations
- **bcryptjs**: Secure password hashing and authentication
- **Role-Based Access Control**: Multi-tier permission system (Student, Teacher, Admin)

### UI/UX
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: High-quality, accessible component library
- **Radix UI**: Accessible primitive components
- **Lucide React**: Professional icon library
- **Chart.js**: Interactive data visualization

### Development Tools
- **ESLint**: Code quality and consistency
- **Prisma Studio**: Database management interface
- **TypeScript Strict Mode**: Enhanced type safety
- **Vite HMR**: Fast development with hot module replacement
- **Lucide React**: Beautiful, customizable icons
- **Radix UI**: Unstyled, accessible components (via shadcn/ui)

### State Management
- **React Hooks**: useState, useEffect, useMemo for local state
- **Local Storage**: Client-side persistence for user sessions
- **Context API**: Theme management and global state

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/luci582/uni-unlockedlockedin.git
   cd uni-unlockedlockedin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL database credentials
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Environment Configuration

Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/unlocked_db"

# Optional: Enable Prisma Studio
PRISMA_STUDIO_PORT=5555
```

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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For questions, issues, or contributions, please:
- **Open an issue** on GitHub for bug reports or feature requests
- **Submit a pull request** for code improvements
- **Check the documentation** in `DATABASE_README.md` for database questions
- **Review the migration guide** in `DATABASE_MIGRATION.md` for deployment help

## Additional Resources

- **[Database Schema Documentation](./DATABASE_README.md)**: Complete database reference
- **[Migration Guide](./DATABASE_MIGRATION.md)**: Production deployment instructions
- **[Screenshot Gallery](./screenshots/README.md)**: Visual feature documentation
- **[Prisma Studio](http://localhost:5555)**: Database management interface (when running)

---

**UnlockED** - Empowering UNSW students to make informed course decisions through community-driven insights, comprehensive data, and modern technology.
