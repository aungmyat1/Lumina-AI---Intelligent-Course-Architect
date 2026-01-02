import { NextRequest } from 'next/server';
import { userService, CreateUserInput } from '@/src/services/userService';

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserInput = await request.json();

    // Validate the input
    if (!body.email) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userService.getUserByEmail(body.email);
    if (existingUser) {
      return Response.json(existingUser, { status: 200 });
    }

    // Create the user using Prisma
    const user = await userService.createUser(body);

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get userId from query params
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return Response.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get user by ID
    const user = await userService.getUserById(userId);

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}