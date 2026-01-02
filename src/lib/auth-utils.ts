import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

// Get session on the server side
export async function getSession(req: any, res: any) {
  return await getServerSession(req, res, authOptions);
}

// Get session token on the server side
export async function getSessionToken(req: any) {
  // Extract the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token;
}

// Type guard to check if user is authenticated
export function isAuthenticated(user: User | undefined): user is User {
  return user !== undefined && user !== null;
}

// Check if user is a pro user
export function isProUser(user: User | undefined): boolean {
  if (!user) return false;
  return user.isPro;
}