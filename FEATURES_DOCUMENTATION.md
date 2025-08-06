# UnlockED Platform - User Features Documentation

## Overview
UnlockED is a comprehensive course review and discovery platform built specifically for UNSW students. It provides authentic peer reviews, detailed course analytics, workload insights, and gamified community engagement to help students make informed academic decisions.

## Core User-Facing Features

### 🔍 Course Discovery & Browsing

#### Course Directory
- **Advanced Search**: Real-time search with fuzzy matching across course codes, titles, and descriptions
- **Multi-Filter System**: Filter by faculty, difficulty level, delivery mode (online, in-person, hybrid), skills, and ratings
- **View Modes**: Toggle between grid and list views for different browsing preferences
- **Smart Sorting**: Sort courses by rating, popularity, difficulty, or workload

#### Course Comparison Tool
- **Side-by-Side Comparison**: Compare up to multiple courses simultaneously
- **Detailed Metrics**: Compare ratings, workload, skills, pricing, and delivery modes
- **Persistent Selection**: Selected courses remain in comparison tray across sessions
- **Export/Share**: Compare and share course comparisons with peers

#### Course Details
- **Comprehensive Information**: Detailed course descriptions, prerequisites, learning outcomes
- **Instructor Details**: Instructor names and ratings
- **Pricing Information**: 
  - Local students (CSP): $9,240 per semester
  - International students: $22,080-$24,960 per semester
- **Enrollment Statistics**: Number of students enrolled and review count
- **Skills Development**: Tagged skills students will develop
- **Difficulty Assessment**: Workload indicators (Light/Moderate/Heavy/Very Heavy)

### ⭐ Review & Rating System

#### Review Submission
- **Multi-Step Review Process**: Guided review submission with progress tracking
- **Comprehensive Rating System**: 
  - Overall course rating (1-5 stars, mandatory)
  - Optional detailed written reviews
  - Workload assessment
  - Teaching quality evaluation
  - Assessment fairness rating
- **Skills Tagging**: Tag skills developed during the course
- **Semester Tracking**: Record when the course was taken
- **Anonymous Options**: Option to submit reviews anonymously

#### Review Display & Interaction
- **Rating Distribution Charts**: Visual breakdown of rating patterns
- **Review Sorting**: Sort by most recent, highest/lowest rated, most helpful
- **Helpful Voting**: Users can mark reviews as helpful
- **Review Filtering**: Filter reviews by semester, rating, or other criteria

### 🏆 Gamification & Community Features

#### Points & Rewards System
- **Review Points**: Earn points for submitting comprehensive reviews
- **Quality Bonuses**: Additional points for helpful, detailed reviews
- **Streak System**: Consecutive review submission streaks for bonus points

#### Leaderboard
- **Global Rankings**: See top reviewers across the platform
- **Achievement Badges**: Various badges for different milestones
- **User Statistics**: Track personal review count, points, and rank
- **Community Recognition**: Recognition for helpful contributions

#### User Profiles
- **Personal Dashboard**: View your reviews, points, and achievements
- **Review History**: Access all your submitted reviews
- **Achievement Showcase**: Display earned badges and milestones
- **Statistics Tracking**: Monitor your contribution to the community

### 🎯 Special Features

#### Hidden Gems Section
- **Curated Courses**: Specially highlighted courses (COMP2521, MATH1131, ACCT1501)
- **New Course Indicators**: Special badges for recently added courses
- **Limited Review Data**: "Not enough reviews" indicators for new courses
- **Discovery Focus**: Help students find lesser-known quality courses

#### Featured Courses
- **Top Course 2024 Badges**: Courses with ratings ≥ 4.5
- **Quality Indicators**: Visual badges for highly-rated courses
- **Trending Courses**: Popular and well-reviewed course recommendations

### 🔐 Authentication & User Management

#### User Accounts
- **Role-Based Access**: Student, Instructor, and Admin roles
- **Secure Authentication**: JWT-based authentication system
- **Profile Management**: Update personal information and preferences
- **Privacy Controls**: Control visibility of reviews and profile information

#### Protected Routes
- **Course Access**: Authentication required for course browsing
- **Review Submission**: Login required to submit reviews
- **Profile Access**: Personal dashboard and settings protection

### 📱 User Interface & Experience

#### Responsive Design
- **Mobile-First**: Optimized for mobile devices with touch-friendly interfaces
- **Bottom Tab Navigation**: Mobile-specific navigation bar with key actions
- **Desktop Layout**: Full-featured desktop experience with sidebar navigation
- **Adaptive Components**: UI elements that adapt to screen size

#### Theme Support
- **Dark/Light Mode**: System-preference aware theme switching
- **Consistent Branding**: UNSW-inspired color scheme and styling
- **Accessibility**: High contrast ratios and keyboard navigation support

#### Interactive Elements
- **Loading States**: Skeleton loading for better perceived performance
- **Toast Notifications**: Success/error feedback for user actions
- **Progress Indicators**: Visual feedback during multi-step processes
- **Hover Effects**: Interactive feedback on clickable elements

### 🛡️ Administrative Features

#### Admin Dashboard
- **User Management**: View, edit, and manage user accounts
- **Review Moderation**: Monitor and moderate submitted reviews
- **Course Management**: Add, edit, and manage course listings
- **Analytics Dashboard**: Platform usage statistics and insights
- **Content Moderation**: Flag and remove inappropriate content

#### Instructor Tools
- **Course Insights**: View reviews and ratings for taught courses
- **Student Feedback**: Access detailed feedback from students
- **Performance Metrics**: Track course popularity and satisfaction

### 🔍 Search & Discovery

#### Smart Search
- **Real-Time Results**: Instant search results as you type
- **Fuzzy Matching**: Find courses even with typos or partial information
- **Search Highlighting**: Highlighted search terms in results
- **Search History**: Recently searched terms for quick access

#### Content Organization
- **Faculty Categorization**: Courses organized by UNSW faculties
- **Skill-Based Filtering**: Find courses that develop specific skills
- **Difficulty Levels**: Filter by course difficulty and workload
- **Delivery Mode**: Filter by online, in-person, or hybrid delivery

### 📊 Analytics & Insights

#### Course Analytics
- **Rating Trends**: Historical rating patterns for courses
- **Enrollment Statistics**: Student enrollment numbers and trends
- **Review Volume**: Number of reviews over time
- **Satisfaction Metrics**: Overall student satisfaction indicators

#### Personal Analytics
- **Review Impact**: See how helpful your reviews are to others
- **Points History**: Track your point earnings over time
- **Achievement Progress**: Monitor progress toward badges and milestones
- **Activity Timeline**: Your platform engagement history

### 🔄 Data Integration

#### UNSW Integration
- **Official Course Data**: Integration with UNSW course information
- **Pricing Updates**: Real-time UNSW fee information
- **Academic Calendar**: Semester and term information alignment
- **Faculty Structure**: Matches UNSW organizational structure

#### External Features
- **Social Sharing**: Share course recommendations on social media
- **Export Options**: Export course comparisons and reviews
- **API Access**: Programmatic access to course data (for developers)

### 🚀 Performance Features

#### Optimization
- **Fast Loading**: Optimized for quick page loads and interactions
- **Caching**: Smart caching for frequently accessed data
- **Progressive Loading**: Load content progressively for better performance
- **Offline Capability**: Basic functionality available offline

#### Scalability
- **Database Optimization**: Efficient queries and indexing
- **CDN Integration**: Fast global content delivery
- **Load Balancing**: Distributed server architecture
- **Auto-scaling**: Dynamic resource allocation based on demand

## Technical Stack Summary

- **Frontend**: React 18 with TypeScript, Vite build system
- **Backend**: Node.js with Express and Prisma ORM
- **Database**: SQLite/PostgreSQL with comprehensive schema
- **Authentication**: JWT-based secure authentication
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Docker containers with nginx proxy
- **Infrastructure**: Scalable cloud deployment ready

## User Journey Examples

### New Student Onboarding
1. Register with UNSW email
2. Browse featured and hidden gem courses
3. Use filters to find courses matching interests
4. Compare selected courses side-by-side
5. Read peer reviews and ratings
6. Make informed enrollment decisions

### Active Reviewer Journey
1. Complete a course semester
2. Submit comprehensive review via multi-step form
3. Earn points and achievements
4. Climb leaderboard rankings
5. Help peers with course selection
6. Build reputation in the community

### Course Discovery Journey
1. Search for specific skills or subjects
2. Apply filters for workload and difficulty
3. Read authentic peer experiences
4. Compare course options
5. Check pricing and logistics
6. Make confident course choices

This comprehensive feature set makes UnlockED a powerful platform for UNSW students to discover, evaluate, and share insights about their academic courses.
