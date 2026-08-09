export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
  id?: string;
  email: string;
  fullName: string;
  role: UserRole;
}