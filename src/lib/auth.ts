import { User, Role, AuthResult, SignupData, LoginData } from '../types/user';

// API base URL - use nginx proxy
const API_BASE = '/api';

// Simulated current user for demo
let currentUser: User | null = null;

export async function authenticateUser(email: string, password: string, adminKey?: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        ...(adminKey && { adminKey })
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }

    const data = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    currentUser = data.user;
    return data.user;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function createUser(
  email: string, 
  password: string, 
  firstName: string,
  lastName: string,
  role: Role = 'STUDENT',
  adminKey?: string
): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        role,
        adminKey
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Account creation failed');
    }

    const data = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    currentUser = data.user;
    return data.user;
  } catch (error) {
    console.error('Account creation error:', error);
    throw error;
  }
}

export function getCurrentUser(): User | null {
  try {
    if (currentUser) {
      return currentUser;
    }
    
    // Try to get user from localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Validate that the parsed user has required fields
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.id && parsedUser.email) {
          currentUser = parsedUser;
          return currentUser;
        } else {
          console.warn('Invalid user data in localStorage, clearing...');
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    // Clear potentially corrupted data
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    return null;
  }
  
  return null;
}

export function signOut(): void {
  currentUser = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function hasRole(role: Role): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}

export function isAdmin(): boolean {
  return hasRole('ADMIN');
}

export function isInstructor(): boolean {
  const user = getCurrentUser();
  return user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN';
}

export function isStudent(): boolean {
  return hasRole('STUDENT');
}

export function canAccessAdmin(): boolean {
  return isAdmin();
}

export function canAccessInstructor(): boolean {
  return isInstructor();
}

// Legacy API for backward compatibility
export const login = async (loginData: LoginData): Promise<AuthResult> => {
  const user = await authenticateUser(loginData.email, loginData.password, loginData.adminKey);
  return {
    success: user !== null,
    user: user || undefined,
    error: user ? undefined : 'Authentication failed'
  };
};

export const signup = async (signupData: SignupData): Promise<AuthResult> => {
  try {
    const [firstName, ...lastNameParts] = signupData.name.split(' ');
    const lastName = lastNameParts.join(' ') || '';
    
    const user = await createUser(
      signupData.email,
      signupData.password,
      firstName,
      lastName,
      signupData.role,
      signupData.adminKey
    );
    return {
      success: user !== null,
      user: user || undefined,
      error: user ? undefined : 'Account creation failed'
    };
  } catch (error: any) {
    return {
      success: false,
      user: undefined,
      error: error.message || 'Account creation failed'
    };
  }
};
