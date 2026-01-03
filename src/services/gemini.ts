import { GoogleGenerativeAI } from "@google/generative-ai";
import { Course, Unit, Chapter } from "../types";

export const generateCourseStructure = async (title: string): Promise<Partial<Course>> => {
  // Check if we're on the server side
  if (typeof window !== 'undefined') {
    throw new Error("This function should only be called server-side");
  }
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

  const result = await model.generateContent({
    contents: `Generate a detailed course structure for a course titled "${title}". 
    Create 3-5 units, each with 2-4 chapters. 
    Each chapter needs a title and a brief learning objective description.`,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          units: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                chapters: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" }
                    },
                    required: ["title", "description"]
                  }
                }
              },
              required: ["title", "chapters"]
            }
          }
        },
        required: ["title", "description", "units"]
      }
    }
  });

  return JSON.parse(result.response.text());
};

export const generateChapterContent = async (chapterTitle: string, unitTitle: string): Promise<{ summary: string, quiz: any[] }> => {
  // Check if we're on the server side
  if (typeof window !== 'undefined') {
    throw new Error("This function should only be called server-side");
  }
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const result = await model.generateContent({
    contents: `For the chapter "${chapterTitle}" in the unit "${unitTitle}", generate a comprehensive summary and 3 multiple choice questions for a quiz.`,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          summary: { type: "string" },
          quiz: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                options: { type: "array", items: { type: "string" } },
                correctAnswerIndex: { type: "number" }
              },
              required: ["question", "options", "correctAnswerIndex"]
            }
          }
        },
        required: ["summary", "quiz"]
      }
    }
  });

  return JSON.parse(result.response.text());
};