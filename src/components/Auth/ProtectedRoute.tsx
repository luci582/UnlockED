import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import { Role } from '../../types/user'
import { Alert, AlertDescription } from '../ui/alert'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: Role
  requireAuth?: boolean
  fallbackPath?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requireAuth = true,
  fallbackPath = '/login'
}) => {
  const { user, isLoading } = useAuth()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Check if authentication is required
  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} replace />
  }

  // Check role permissions if required
  if (requiredRole && user) {
    const roleHierarchy = {
      'STUDENT': 1,
      'INSTRUCTOR': 2,
      'ADMIN': 3
    }

    const userLevel = roleHierarchy[user.role]
    const requiredLevel = roleHierarchy[requiredRole]

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertDescription>
              You don't have permission to access this page. 
              {requiredRole === 'ADMIN' && ' Admin access required.'}
              {requiredRole === 'INSTRUCTOR' && ' Instructor or Admin access required.'}
            </AlertDescription>
          </Alert>
        </div>
      )
    }
  }

  return <>{children}</>
}

// Convenience components for specific roles
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="ADMIN">
    {children}
  </ProtectedRoute>
)

export const InstructorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="INSTRUCTOR">
    {children}
  </ProtectedRoute>
)

export const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="STUDENT">
    {children}
  </ProtectedRoute>
)
