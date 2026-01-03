import { generateCourseStructure, generateChapterContent } from "@/services/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();
    
    let result;
    
    switch (action) {
      case 'generateCourseStructure':
        if (!data.title) {
          return NextResponse.json(
            { error: 'Missing title for course generation' },
            { status: 400 }
          );
        }
        result = await generateCourseStructure(data.title);
        break;
        
      case 'generateChapterContent':
        if (!data.chapterTitle || !data.unitTitle) {
          return NextResponse.json(
            { error: 'Missing chapterTitle or unitTitle for chapter content generation' },
            { status: 400 }
          );
        }
        result = await generateChapterContent(data.chapterTitle, data.unitTitle);
        break;
        
      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content' },
      { status: 500 }
    );
  }
}