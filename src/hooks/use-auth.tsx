import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getCurrentUser, signOut, isAuthenticated } from '../lib/auth'
import { User } from '../types/user'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    // Create and store session
    const sessionData = {
      user: userData,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }
    localStorage.setItem('userSession', JSON.stringify(sessionData))
  }

  const logout = () => {
    setUser(null)
    signOut()
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      
      // Update session storage
      const sessionData = localStorage.getItem('userSession')
      if (sessionData) {
        const session = JSON.parse(sessionData)
        session.user = updatedUser
        localStorage.setItem('userSession', JSON.stringify(session))
      }
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook for checking permissions
export const usePermissions = () => {
  const { user } = useAuth()
  
  return {
    canManageCourses: user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN',
    canModerateReviews: user?.role === 'ADMIN',
    canManageUsers: user?.role === 'ADMIN',
    isAdmin: user?.role === 'ADMIN',
    isInstructor: user?.role === 'INSTRUCTOR',
    isStudent: user?.role === 'STUDENT'
  }
}
