export interface LessonSection {
  id: number;
  heading: string;
  content: string;
  codeBlock?: { language: string; code: string };
  keyPoint?: string;
  tip?: string;
  hints?: string[];
  resources?: { title: string; url: string; type: 'docs' | 'video' | 'article' }[];
  challenge?: { description: string; action: string; successCriteria: string };
  quiz?: { question: string; options: string[]; correctAnswer: number; explanation: string };
}

export interface LessonSectionProgress {
  moduleId: number;
  lessonId: number;
  totalSections: number;
  viewedSections: number[];
  lastViewedSection: number;
  completed: boolean;
  rewardClaimed: boolean;
  updatedAt: number;
}
