export type QuizQuestion = {
  id: string;
  text: string;
  type: "single" | "multiple";
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanation?: string;
};

export type Quiz = {
  moduleId: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}; 