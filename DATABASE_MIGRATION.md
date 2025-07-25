# Database Migration Guide

## 🚀 Quick Start (New Setup)

If you're setting up the database for the first time:

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env with your PostgreSQL credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# 4. Generate Prisma client
npm run db:generate

# 5. Deploy schema to database
npm run db:push

# 6. Seed with sample data
npm run db:seed

# 7. Verify setup
npm run db:check

# 8. Start development server
npm run dev
```

## 🔄 For Existing Projects

If you're adding the database to an existing UnlockED installation:

### Step 1: Install New Dependencies
```bash
npm install prisma @prisma/client bcryptjs @types/bcryptjs tsx
```

### Step 2: Environment Setup
```bash
# Copy the new environment template
cp .env.example .env

# Edit .env with your database credentials
# Make sure PostgreSQL is running and database exists
```

### Step 3: Database Setup
```bash
# Generate the Prisma client
npm run db:generate

# Deploy the schema
npm run db:push

# Add sample data
npm run db:seed
```

### Step 4: Integration with React App

Update your components to use the database utilities:

```typescript
// In your components, you can now import and use:
import { getCourses, getCourseById, createReview } from '@/lib/database'
import type { CourseWithDetails, CourseFilters } from '@/types/database'

// Example: Fetching courses with filters
const courses = await getCourses({
  search: 'javascript',
  skills: ['React', 'TypeScript'],
  difficulty: 'INTERMEDIATE'
})
```

## 📊 Database Overview

### Core Tables Created:
- **users** - User accounts and profiles
- **courses** - Course information and metadata  
- **reviews** - Course reviews with multiple rating dimensions
- **skills** - Technical skills taught in courses
- **categories** - Course organization and categorization
- **achievements** - Gamification and user achievements

### Sample Data Included:
- 5 user accounts (including admin and students)
- 6 sample courses with realistic data
- 10 skills across different categories
- Course reviews and ratings
- Achievement system data

## 🛠️ Available Commands

```bash
# Database Management
npm run db:generate    # Generate Prisma client
npm run db:push        # Deploy schema to database
npm run db:studio      # Open database GUI
npm run db:seed        # Add sample data
npm run db:reset       # Reset and reseed database
npm run db:check       # Verify database setup

# Development
npm run dev            # Start development server with database
npm run build          # Build for production
```

## 🔍 Verification Steps

After setup, verify everything is working:

1. **Run the database check:**
   ```bash
   npm run db:check
   ```

2. **Open Prisma Studio:**
   ```bash
   npm run db:studio
   ```
   Visit http://localhost:5555 to see your data

3. **Test the application:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:8082

## 🧪 Sample Login Credentials

Use these credentials to test the application:

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

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Create database if it doesn't exist
createdb your_database_name

# Test connection manually
psql postgresql://username:password@localhost:5432/database_name
```

### Schema Issues
```bash
# Force reset if tables are corrupted
npm run db:reset

# Check for migration conflicts
npx prisma migrate reset
npx prisma db push
```

### Client Generation Issues
```bash
# Clear and regenerate client
rm -rf node_modules/@prisma/client
npm run db:generate
```

## 📈 Next Steps

Once the database is set up, you can:

1. **Customize the schema** - Edit `prisma/schema.prisma`
2. **Add more sample data** - Modify `prisma/seed.ts`
3. **Create API endpoints** - Use utilities from `src/lib/database.ts`
4. **Build frontend components** - Use types from `src/types/database.ts`

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Setup Guide](https://www.postgresql.org/download/)
- [Database Schema Reference](./DATABASE_README.md)

---

The database layer provides a solid foundation for the UnlockED platform with room for future enhancements and scalability.
