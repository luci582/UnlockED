export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface SignupData {
  email: string;
  name: string;
  password: string;
  role?: Role;
  adminKey?: string;
}

export interface LoginData {
  email: string;
  password: string;
  adminKey?: string;
}
