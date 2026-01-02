import prisma from '@/src/lib/prisma';
import { Course, Unit, Chapter, QuizQuestion, QuizOption } from '@/src/types';

export interface CreateCourseInput {
  title: string;
  description: string;
  userId: string;
  units: {
    title: string;
    chapters: {
      title: string;
      description: string;
      youtubeId?: string;
      summary?: string;
      quiz?: {
        question: string;
        options: {
          text: string;
          isCorrect: boolean;
        }[];
      }[];
    }[];
  }[];
  imageUrl?: string;
}

export const courseService = {
  /**
   * Creates a new course with its associated units, chapters, and quiz questions
   */
  async createCourse(input: CreateCourseInput) {
    const course = await prisma.course.create({
      data: {
        title: input.title,
        description: input.description,
        userId: input.userId,
        imageUrl: input.imageUrl,
        units: {
          create: input.units.map(unit => ({
            title: unit.title,
            chapters: {
              create: unit.chapters.map(chapter => ({
                title: chapter.title,
                description: chapter.description,
                youtubeId: chapter.youtubeId,
                summary: chapter.summary,
                quizQuestions: {
                  create: chapter.quiz?.map(quiz => ({
                    question: quiz.question,
                    options: {
                      create: quiz.options.map(option => ({
                        text: option.text,
                        isCorrect: option.isCorrect
                      }))
                    },
                    // Find the correct option and link it
                    correctOption: {
                      connect: {
                        // This will be connected after options are created
                        // We'll handle this differently since we need to know the IDs
                      }
                    }
                  })) || []
                }
              }))
            }
          }))
        }
      },
      include: {
        units: {
          include: {
            chapters: {
              include: {
                quizQuestions: {
                  include: {
                    options: true,
                    correctOption: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return course;
  },

  /**
   * Creates a new course with its associated units, chapters, and quiz questions (updated approach)
   */
  async createCourseWithCorrectOptions(input: CreateCourseInput) {
    // First, create the course and all its nested data
    const course = await prisma.course.create({
      data: {
        title: input.title,
        description: input.description,
        userId: input.userId,
        imageUrl: input.imageUrl,
        units: {
          create: input.units.map(unit => ({
            title: unit.title,
            chapters: {
              create: unit.chapters.map(chapter => ({
                title: chapter.title,
                description: chapter.description,
                youtubeId: chapter.youtubeId,
                summary: chapter.summary,
                quizQuestions: {
                  create: chapter.quiz?.map(quiz => ({
                    question: quiz.question,
                    options: {
                      create: quiz.options.map(option => ({
                        text: option.text,
                        isCorrect: option.isCorrect
                      }))
                    }
                  })) || []
                }
              }))
            }
          }))
        }
      }
    });

    // Now, update each quiz question to connect the correct option
    for (const unit of input.units) {
      for (const chapter of unit.chapters) {
        for (const quiz of chapter.quiz || []) {
          // Find the correct option
          const correctOption = quiz.options.find(opt => opt.isCorrect);
          if (correctOption) {
            // Find the quiz question in the database
            const quizQuestion = await prisma.quizQuestion.findFirst({
              where: {
                question: quiz.question,
                chapter: {
                  title: chapter.title
                }
              }
            });

            if (quizQuestion) {
              // Find the correct option in the database
              const dbCorrectOption = await prisma.quizOption.findFirst({
                where: {
                  questionId: quizQuestion.id,
                  isCorrect: true
                }
              });

              if (dbCorrectOption) {
                // Update the quiz question to connect the correct option
                await prisma.quizQuestion.update({
                  where: { id: quizQuestion.id },
                  data: {
                    correctOption: {
                      connect: { id: dbCorrectOption.id }
                    }
                  }
                });
              }
            }
          }
        }
      }
    }

    // Return the fully populated course
    return await prisma.course.findUnique({
      where: { id: course.id },
      include: {
        units: {
          include: {
            chapters: {
              include: {
                quizQuestions: {
                  include: {
                    options: true,
                    correctOption: true
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  /**
   * Retrieves a course by ID with all its related data
   */
  async getCourseById(id: string) {
    const dbCourse = await prisma.course.findUnique({
      where: { id },
      include: {
        user: true,
        units: {
          include: {
            chapters: {
              include: {
                quizQuestions: {
                  include: {
                    options: true,
                    correctOption: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    // Transform the database response to match our frontend Course type
    if (!dbCourse) return null;

    const course: Course = {
      id: dbCourse.id,
      title: dbCourse.title,
      description: dbCourse.description,
      imageUrl: dbCourse.imageUrl || undefined,
      createdAt: dbCourse.createdAt.getTime(),
      units: dbCourse.units.map(unit => ({
        id: unit.id,
        title: unit.title,
        chapters: unit.chapters.map(chapter => ({
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
          youtubeId: chapter.youtubeId || undefined,
          summary: chapter.summary || undefined,
          isCompleted: chapter.isCompleted,
          quiz: chapter.quizQuestions.map(qq => {
            // Find the correct answer index
            const correctAnswerIndex = qq.options.findIndex(opt => opt.id === qq.correctOptionId);
            
            return {
              id: qq.id,
              question: qq.question,
              options: qq.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                isCorrect: opt.isCorrect
              })),
              correctAnswerIndex
            };
          })
        }))
      }))
    };

    return course;
  },

  /**
   * Retrieves all courses for a specific user
   */
  async getCoursesByUserId(userId: string) {
    const dbCourses = await prisma.course.findMany({
      where: { userId },
      include: {
        units: {
          select: {
            chapters: {
              select: {
                id: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to match frontend types
    return dbCourses.map(dbCourse => ({
      id: dbCourse.id,
      title: dbCourse.title,
      description: dbCourse.description,
      imageUrl: dbCourse.imageUrl || undefined,
      createdAt: dbCourse.createdAt.getTime(),
      units: dbCourse.units.map(unit => ({
        id: unit.id,
        title: unit.title,
        chapters: unit.chapters.map(chapter => ({
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
          isCompleted: chapter.isCompleted
        }))
      }))
    }));
  },

  /**
   * Updates a course's completion status
   */
  async updateChapterCompletion(chapterId: string, isCompleted: boolean) {
    return await prisma.chapter.update({
      where: { id: chapterId },
      data: { isCompleted }
    });
  },

  /**
   * Deletes a course and all its related data (units, chapters, quizzes)
   */
  async deleteCourse(id: string) {
    return await prisma.course.delete({
      where: { id }
    });
  }
};