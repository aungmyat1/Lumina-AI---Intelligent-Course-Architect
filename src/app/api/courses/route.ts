import { NextRequest } from 'next/server';
import { courseService, CreateCourseInput } from '@/src/services/courseService';
import { Course } from '@/src/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateCourseInput = await request.json();

    // Validate the input
    if (!body.title || !body.userId) {
      return Response.json(
        { error: 'Title and userId are required' },
        { status: 400 }
      );
    }

    // Create the course using Prisma
    const course = await courseService.createCourse(body);

    return Response.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return Response.json(
      { error: 'Failed to create course' },
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

    // Get courses for the user
    const courses = await courseService.getCoursesByUserId(userId);

    return Response.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return Response.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}