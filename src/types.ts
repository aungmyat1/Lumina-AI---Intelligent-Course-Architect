export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerIndex: number;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  youtubeId?: string;
  summary?: string;
  quiz?: QuizQuestion[];
  isCompleted: boolean;
}

export interface Unit {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  units: Unit[];
  imageUrl?: string;
  createdAt: number;
}

export type View = 'LANDING' | 'DASHBOARD' | 'CREATE' | 'VIEW_COURSE' | 'PRICING';

export interface UserState {
  isPro: boolean;
  courses: Course[];
}

// NextAuth session type augmentations
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      isPro: boolean;
      credits: number;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    isPro: boolean;
    credits: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isPro: boolean;
    credits: number;
  }
}