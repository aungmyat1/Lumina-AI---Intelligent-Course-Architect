import { GoogleGenAI, Type } from "@google/genai";
import { Course, Unit, Chapter } from "../src/types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCourseStructure = async (title: string): Promise<Partial<Course>> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Generate a detailed course structure for a course titled "${title}". 
    Create 3-5 units, each with 2-4 chapters. 
    Each chapter needs a title and a brief learning objective description.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          units: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                chapters: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING }
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

  return JSON.parse(response.text);
};

export const generateChapterContent = async (chapterTitle: string, unitTitle: string): Promise<{ summary: string, quiz: any[] }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `For the chapter "${chapterTitle}" in the unit "${unitTitle}", generate a comprehensive summary and 3 multiple choice questions for a quiz.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswerIndex: { type: Type.NUMBER }
              },
              required: ["question", "options", "correctAnswerIndex"]
            }
          }
        },
        required: ["summary", "quiz"]
      }
    }
  });

  return JSON.parse(response.text);
};