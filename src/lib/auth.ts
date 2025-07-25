import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

// Define types based on Prisma schema
export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: UserRole
  totalPoints: number
  isVerified: boolean
  profileImage?: string | null
  bio?: string | null
}

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

export interface SignupData {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  role?: UserRole
  adminKey?: string
}

// Hash password for storage
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

// Verify password against hash
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

// Authenticate user with email and password
export const authenticateUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        totalPoints: true,
        isVerified: true,
        profileImage: true,
        bio: true,
        passwordHash: true
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash)
    if (!isValidPassword) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Update last active time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() }
    })

    // Return user without password hash
    const { passwordHash, ...userWithoutPassword } = user
    return {
      success: true,
      user: userWithoutPassword
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return {
      success: false,
      error: 'Authentication failed'
    }
  }
}

// Create new user account
export const createUser = async (userData: SignupData): Promise<AuthResult> => {
  try {
    // Check if email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { username: userData.username }
        ]
      }
    })

    if (existingUser) {
      return {
        success: false,
        error: existingUser.email === userData.email 
          ? 'Email already registered' 
          : 'Username already taken'
      }
    }

    // Determine user role
    let role = userData.role || 'STUDENT'
    
    // Check for admin key
    if (userData.adminKey === 'teamlockedin124') {
      role = 'ADMIN'
    }

    // Hash password
    const passwordHash = await hashPassword(userData.password)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        passwordHash,
        role,
        isVerified: false // In a real app, you'd send verification email
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        totalPoints: true,
        isVerified: true,
        profileImage: true,
        bio: true
      }
    })

    return {
      success: true,
      user: newUser
    }
  } catch (error) {
    console.error('User creation error:', error)
    return {
      success: false,
      error: 'Failed to create account'
    }
  }
}

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        totalPoints: true,
        isVerified: true,
        profileImage: true,
        bio: true
      }
    })

    return user
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

// Permission checking utilities
export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy = {
    'STUDENT': 1,
    'INSTRUCTOR': 2,
    'ADMIN': 3
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const canManageCourses = (userRole: UserRole): boolean => {
  return hasPermission(userRole, 'INSTRUCTOR')
}

export const canModerateReviews = (userRole: UserRole): boolean => {
  return hasPermission(userRole, 'ADMIN')
}

export const canManageUsers = (userRole: UserRole): boolean => {
  return userRole === 'ADMIN'
}

// Check if user can edit/delete their own content
export const canEditOwnContent = (userId: string, contentUserId: string, userRole: UserRole): boolean => {
  return userId === contentUserId || hasPermission(userRole, 'ADMIN')
}

// Session management utilities
export const createSession = (user: User): string => {
  // In a real app, you'd create a proper JWT token
  // For now, we'll use a simple session stored in localStorage
  const sessionData = {
    user,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
  }
  
  return JSON.stringify(sessionData)
}

export const validateSession = (sessionData: string): User | null => {
  try {
    const session = JSON.parse(sessionData)
    const expiresAt = new Date(session.expiresAt)
    
    if (expiresAt < new Date()) {
      return null // Session expired
    }
    
    return session.user
  } catch (error) {
    return null // Invalid session
  }
}

export const clearSession = (): void => {
  localStorage.removeItem('userSession')
}
