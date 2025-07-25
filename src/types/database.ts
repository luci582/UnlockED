// These imports will be available after running `npm run db:push` and `npm run db:generate`
// import type { 
//   User, 
//   Course, 
//   Review, 
//   Skill, 
//   Category, 
//   Tag, 
//   Achievement,
//   CourseSkill,
//   ReviewSkillRating,
//   UserSkillProficiency,
//   CourseEnrollment,
//   Difficulty,
//   SkillLevel,
//   UserRole,
//   AchievementType,
//   CourseStatus
// } from '@prisma/client'

// Temporary type definitions (replace with Prisma types after database setup)
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
export type SkillLevel = 'LIGHT' | 'MEDIUM' | 'HEAVY' | 'VERY_HEAVY'
export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'
export type AchievementType = 'REVIEW_COUNT' | 'COURSE_COMPLETION' | 'STREAK' | 'RATING_QUALITY' | 'FIRST_REVIEW' | 'HELPFUL_REVIEWS' | 'SKILL_MASTERY' | 'COMMUNITY_CONTRIBUTOR'
export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'UNDER_REVIEW'

// Base type interfaces (will be replaced by Prisma generated types)
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  profileImage?: string
  bio?: string
  role: UserRole
  isVerified: boolean
  totalPoints: number
  reviewStreak: number
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  courseUrl: string
  instructor: string
  institution?: string
  duration?: string
  difficulty: Difficulty
  status: CourseStatus
  price?: number
  isFree: boolean
  language: string
  rating?: number
  reviewCount: number
  enrollmentCount: number
  prerequisites: string[]
  learningOutcomes: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  userId: string
  courseId: string
  overallRating: number
  difficultyRating?: number
  contentQuality?: number
  instructorRating?: number
  valueForMoney?: number
  wouldRecommend?: boolean
  title: string
  content: string
  pros: string[]
  cons: string[]
  isAnonymous: boolean
  isVerified: boolean
  helpfulCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  id: string
  name: string
  description?: string
  category?: string
  icon?: string
  color?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  parentId?: string
  sortOrder: number
  isActive: boolean
}

export interface Tag {
  id: string
  name: string
  color?: string
  createdAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon?: string
  type: AchievementType
  criteria: Record<string, any>
  points: number
  isActive: boolean
  createdAt: Date
}

export interface CourseSkill {
  id: string
  courseId: string
  skillId: string
  level: SkillLevel
  isCore: boolean
  percentage?: number
}

export interface ReviewSkillRating {
  id: string
  reviewId: string
  skillId: string
  rating: number
}

export interface UserSkillProficiency {
  id: string
  userId: string
  skillId: string
  level: SkillLevel
  yearsExperience?: number
  isVerified: boolean
  verificationSource?: string
}

export interface CourseEnrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
  completedAt?: Date
  progress: number
  status: string
}

// Extended types with relations
export type CourseWithDetails = Course & {
  skills: (CourseSkill & {
    skill: Skill
  })[]
  categories: {
    category: Category
  }[]
  tags: {
    tag: Tag
  }[]
  reviews: (Review & {
    user: Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'profileImage'>
    skillRatings: (ReviewSkillRating & {
      skill: Skill
    })[]
  })[]
  _count: {
    reviews: number
    enrollments: number
  }
}

export type CourseCardData = Course & {
  skills: (CourseSkill & {
    skill: Skill
  })[]
  categories: {
    category: Category
  }[]
  tags: {
    tag: Tag
  }[]
  _count: {
    reviews: number
    enrollments: number
  }
}

export type UserWithDetails = User & {
  reviews: (Review & {
    course: Pick<Course, 'id' | 'title' | 'imageUrl'>
  })[]
  enrollments: (CourseEnrollment & {
    course: Pick<Course, 'id' | 'title' | 'imageUrl' | 'difficulty' | 'instructor'>
  })[]
  achievements: {
    achievement: Achievement
  }[]
  skillProficiencies: (UserSkillProficiency & {
    skill: Skill
  })[]
}

export type ReviewWithDetails = Review & {
  user: Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'profileImage'>
  course: Pick<Course, 'id' | 'title' | 'imageUrl' | 'instructor'>
  skillRatings: (ReviewSkillRating & {
    skill: Skill
  })[]
}

export type LeaderboardUser = Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'profileImage' | 'totalPoints' | 'reviewStreak'> & {
  _count: {
    reviews: number
    achievements: number
  }
}

export type SkillWithCourseCount = Skill & {
  _count: {
    courses: number
  }
}

export type CategoryWithCourseCount = Category & {
  children: Category[]
  _count: {
    courses: number
  }
}

// Filter types
export interface CourseFilters {
  search?: string
  skills?: string[]
  difficulty?: Difficulty
  category?: string
  isFree?: boolean
  minRating?: number
  maxPrice?: number
  instructor?: string
  institution?: string
  limit?: number
  offset?: number
  sortBy?: 'rating' | 'reviewCount' | 'price' | 'createdAt' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export interface ReviewFilters {
  courseId?: string
  userId?: string
  minRating?: number
  isVerified?: boolean
  limit?: number
  offset?: number
  sortBy?: 'createdAt' | 'helpfulCount' | 'overallRating'
  sortOrder?: 'asc' | 'desc'
}

// Form types
export interface CreateReviewData {
  courseId: string
  overallRating: number
  difficultyRating?: number
  contentQuality?: number
  instructorRating?: number
  valueForMoney?: number
  wouldRecommend?: boolean
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  isAnonymous?: boolean
  skillRatings?: {
    skillId: string
    rating: number
  }[]
}

export interface CreateCourseData {
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  courseUrl: string
  instructor: string
  institution?: string
  duration?: string
  difficulty: Difficulty
  price?: number
  isFree: boolean
  language: string
  prerequisites?: string[]
  learningOutcomes?: string[]
  skillIds?: string[]
  categoryIds?: string[]
  tagIds?: string[]
}

export interface UpdateUserProfileData {
  firstName?: string
  lastName?: string
  bio?: string
  profileImage?: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Dashboard statistics
export interface DashboardStats {
  totalCourses: number
  totalReviews: number
  totalUsers: number
  avgRating: number
  recentReviews: ReviewWithDetails[]
  topCourses: CourseCardData[]
  activeUsers: LeaderboardUser[]
}

// Search results
export interface SearchResults {
  courses: CourseCardData[]
  skills: Skill[]
  categories: Category[]
  total: number
  query: string
}

// Notification types
export interface NotificationData {
  id: string
  title: string
  message: string
  type: 'review_reply' | 'achievement_earned' | 'course_update' | 'enrollment_confirmation'
  isRead: boolean
  data?: Record<string, any>
  createdAt: Date
}

// Authentication types
export interface AuthUser {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: UserRole
  profileImage?: string
  totalPoints: number
  isVerified: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

// Skill assessment types
export interface SkillAssessment {
  skillId: string
  level: SkillLevel
  yearsExperience?: number
  source: 'self_reported' | 'course_completion' | 'test_verified' | 'portfolio_verified'
}

// Course comparison types
export interface CourseComparison {
  courses: CourseWithDetails[]
  comparisonFields: {
    field: string
    label: string
    type: 'text' | 'number' | 'rating' | 'array' | 'boolean'
  }[]
}

// After database setup, uncomment and use Prisma generated types:
// export type {
//   User,
//   Course,
//   Review,
//   Skill,
//   Category,
//   Tag,
//   Achievement,
//   CourseSkill,
//   ReviewSkillRating,
//   UserSkillProficiency,
//   CourseEnrollment,
//   Difficulty,
//   SkillLevel,
//   UserRole,
//   AchievementType,
//   CourseStatus
// } from '@prisma/client'
