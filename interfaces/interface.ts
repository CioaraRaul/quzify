export interface SubjectItem {
  id: number;
  subject: string;
  count: number;
}

export interface SubjectsData {
  info: string;
  list: SubjectItem[];
}

export interface SubjectsResponse {
  status: number;
  message: string;
  data: SubjectsData;
}

export interface SubjectCategory {
  attempCount: number;
  categoryID: number;
  count: number;
  description: string;
  imageURL: string;
  name: string;
}

export interface QuizQuestion {
  _id: string;
  question: string;
  correctOption: string;
  options: string[];
  explanation: string;
  category: string;
  categoryID: string;
  difficulty: string;
  tags: string[];
  source: string;
  accuracy: number;
  attemptCount: number;
  correctCount: number;
  reportCount: number;
  createdAt: number; // timestamp in milliseconds
  lastAttempt: number; // timestamp in milliseconds
  __v: number;
}

export interface QuizResponse {
  userId: string; // Optional if using anonymous users
  questionId: string; // Corresponds to QuizQuestion._id
  selectedOption: string;
  isCorrect: boolean;
  answeredAt: number; // timestamp in milliseconds
  durationMs?: number; // optional: time taken to answer
  quizSessionId?: string; // optional: to group responses
  tags: string[];
  difficulty: string;
  categoryId: string;
  category: string;
}
