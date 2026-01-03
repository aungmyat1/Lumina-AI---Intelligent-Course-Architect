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

// Check if user has sufficient credits
export function hasSufficientCredits(user: User | undefined, requiredCredits: number = 1): boolean {
  if (!user) return false;
  return user.credits >= requiredCredits;
}

// Deduct credits for a user
export async function deductCredits(userId: string, amount: number = 1) {
  const prisma = (await import('./prisma')).default;
  
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: amount
        }
      },
      select: {
        credits: true
      }
    });
    
    return updatedUser.credits;
  } catch (error) {
    console.error('Error deducting credits:', error);
    throw new Error('Failed to deduct credits');
  }
}

// Add credits to a user
export async function addCredits(userId: string, amount: number) {
  const prisma = (await import('./prisma')).default;
  
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: amount
        }
      },
      select: {
        credits: true
      }
    });
    
    return updatedUser.credits;
  } catch (error) {
    console.error('Error adding credits:', error);
    throw new Error('Failed to add credits');
  }
}