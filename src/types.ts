
export interface QuizQuestion {
  question: string;
  options: string[];
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
