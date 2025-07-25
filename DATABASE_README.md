# UnlockED Database Documentation

## PostgreSQL Database Schema with Prisma ORM

This document outlines the complete database design and implementation for the UnlockED platform - a university course review system.

## 🏗️ Architecture Overview

The database is designed with PostgreSQL and managed through Prisma ORM, providing:
- **Type-safe database access** with TypeScript
- **Automated migrations** and schema management
- **Rich relationships** between entities
- **Performance optimizations** with proper indexing
- **Data integrity** through constraints and validations

## 📊 Database Schema

### Core Entities

#### Users
- **Purpose**: Store user accounts, profiles, and authentication data
- **Key Features**: Role-based access (Student, Instructor, Admin), gamification points, review streaks
- **Relationships**: Reviews, Enrollments, Achievements, Skill Proficiencies

#### Courses
- **Purpose**: Central course information and metadata
- **Key Features**: Multi-difficulty levels, pricing, prerequisites, learning outcomes
- **Relationships**: Skills, Categories, Tags, Reviews, Enrollments, Modules

#### Skills
- **Purpose**: Categorized technical and soft skills taught in courses
- **Key Features**: Hierarchical prerequisites, proficiency levels, color coding
- **Relationships**: Courses (many-to-many), User Proficiencies, Prerequisites

#### Reviews
- **Purpose**: Detailed course reviews with multiple rating dimensions
- **Key Features**: Multi-aspect ratings, pros/cons, skill-specific ratings, verification
- **Relationships**: Users, Courses, Skill Ratings, Votes

### Supporting Entities

#### Categories & Tags
- **Categories**: Hierarchical course organization (Programming > Web Development)
- **Tags**: Flexible labeling system (Beginner Friendly, Project Based, etc.)

#### Achievements & Gamification
- **Achievements**: Unlockable badges for various activities
- **User Achievements**: Track user progress and accomplishments
- **Points System**: Reward system for engagement

#### Course Structure
- **Course Modules**: Organized course content structure
- **Course Skills**: Many-to-many with skill intensity levels
- **Enrollments**: Track user progress and completion

## 🚀 Setup Instructions

### 1. Prerequisites
```bash
# Ensure you have Node.js, npm, and PostgreSQL installed
node --version  # Should be 18+
npm --version   # Should be 9+
psql --version  # Should be 13+
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb unlocked_db

# Or using psql
psql -U postgres
CREATE DATABASE unlocked_db;
CREATE USER unlocked_user WITH PASSWORD 'unlocked_password';
GRANT ALL PRIVILEGES ON DATABASE unlocked_db TO unlocked_user;
\\q
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your database credentials
DATABASE_URL="postgresql://unlocked_user:unlocked_password@localhost:5432/unlocked_db"
```

### 4. Install Dependencies & Generate Client
```bash
# Install Prisma and related packages
npm install

# Generate Prisma client
npm run db:generate
```

### 5. Database Migration & Seeding
```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed

# Optional: Reset database and reseed
npm run db:reset
```

## 📝 Available Scripts

```bash
# Database Management
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes to database
npm run db:studio      # Open Prisma Studio (GUI)
npm run db:seed        # Seed database with sample data
npm run db:reset       # Reset and reseed database

# Development
npm run dev            # Start development server
npm run build          # Build for production
```

## 🔍 Database Utilities

The `src/lib/database.ts` file provides high-level utilities for common operations:

### Course Operations
```typescript
import { getCourses, getCourseById, searchCourses } from '@/lib/database'

// Get filtered courses
const courses = await getCourses({
  search: 'javascript',
  skills: ['React', 'TypeScript'],
  difficulty: 'INTERMEDIATE',
  isFree: false,
  limit: 20
})

// Get course details
const course = await getCourseById('course-id')

// Search courses
const results = await searchCourses('machine learning')
```

### Review Operations
```typescript
import { createReview } from '@/lib/database'

// Create a comprehensive review
const review = await createReview({
  userId: 'user-id',
  courseId: 'course-id',
  overallRating: 5,
  difficultyRating: 4,
  contentQuality: 5,
  title: 'Excellent Course!',
  content: 'Great explanations and projects.',
  pros: ['Clear content', 'Good projects'],
  cons: ['Could be longer'],
  skillRatings: [
    { skillId: 'javascript-id', rating: 5 },
    { skillId: 'react-id', rating: 4 }
  ]
})
```

### User Operations
```typescript
import { getUserById, getLeaderboard } from '@/lib/database'

// Get user profile with all related data
const user = await getUserById('user-id')

// Get top users for leaderboard
const leaders = await getLeaderboard(10)
```

## 🎯 Sample Data

The seed script creates realistic sample data including:

### Users (5 accounts)
- **Admin User**: Full system access
- **Students**: Various skill levels and interests
- **Instructor**: Course creator permissions

### Courses (6 courses)
- JavaScript fundamentals
- React development
- Machine Learning
- CS50 (Harvard)
- UI/UX Design
- Node.js backend

### Skills (10 skills)
- Programming: JavaScript, Python, TypeScript
- Frontend: React, UI/UX Design
- Backend: Node.js, SQL
- Data Science: Machine Learning, Data Analysis
- DevOps: Docker

### Sample Credentials
```bash
# Admin Account
Email: admin@unlocked.edu
Password: password123

# Student Accounts
Email: john.doe@student.com
Email: jane.smith@student.com
Email: sarah.chen@student.com
Password: password123 (for all)
```

## 🔐 Security Features

### Password Protection
- **bcrypt hashing** with salt rounds
- **Environment-based** JWT secrets
- **Role-based** access control

### Data Validation
- **Prisma schema** type validation
- **Constraint enforcement** at database level
- **Referential integrity** through foreign keys

### Performance Optimizations
- **Indexed fields** for search operations
- **Computed fields** for statistics (rating, review count)
- **Efficient queries** with proper includes/selects

## 🛠️ Development Tools

### Prisma Studio
```bash
npm run db:studio
```
Opens a web-based GUI at `http://localhost:5555` for:
- Browsing all tables and data
- Creating/editing records
- Testing queries
- Visualizing relationships

### Database Inspection
```bash
# Connect to database
psql postgresql://unlocked_user:unlocked_password@localhost:5432/unlocked_db

# List all tables
\\dt

# Describe table structure
\\d users
\\d courses
\\d reviews
```

## 📈 Analytics & Reporting

The database includes several computed fields and utilities for analytics:

### Course Statistics
- Average ratings across all dimensions
- Review count and distribution
- Enrollment metrics
- Skill coverage analysis

### User Analytics
- Points and achievement tracking
- Review quality metrics
- Learning progress reports
- Skill proficiency mapping

### Platform Metrics
```typescript
import { getDashboardStats } from '@/lib/database'

const stats = await getDashboardStats()
// Returns: totalCourses, totalReviews, totalUsers, avgRating
```

## 🔄 Migration Strategy

### Schema Changes
1. Modify `prisma/schema.prisma`
2. Run `npm run db:push` for development
3. Generate migrations for production: `npx prisma migrate dev`

### Data Migrations
- Custom migration scripts in `prisma/migrations/`
- Backup data before major changes
- Test migrations on staging environment

## 🤝 Contributing

### Adding New Features
1. Update schema in `prisma/schema.prisma`
2. Add database utilities in `src/lib/database.ts`
3. Update seed data if needed
4. Add proper TypeScript types
5. Test with Prisma Studio

### Code Standards
- Use descriptive model and field names
- Add comments for complex relationships
- Follow consistent naming conventions
- Include proper constraints and validations

## 🐛 Troubleshooting

### Common Issues

**"Database doesn't exist"**
```bash
createdb unlocked_db
```

**"Migration conflicts"**
```bash
npm run db:reset
```

**"Client generation errors"**
```bash
npm run db:generate
```

**"Connection refused"**
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify DATABASE_URL in `.env`
- Check firewall settings

### Performance Issues
- Use `EXPLAIN ANALYZE` for slow queries
- Check index usage with Prisma Studio
- Monitor connection pool size
- Consider read replicas for heavy queries

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Database Design Patterns](https://www.patterns.dev/posts/database-patterns)
- [TypeScript Best Practices](https://typescript-eslint.io/docs/)

---

This database implementation provides a solid foundation for the UnlockED platform with room for future enhancements and scalability.
