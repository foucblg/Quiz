export interface QuizData {
  question_topics: string[],
  question_cycle: number[],
  questions: Record<string, QuizSegment[]>,
}

export interface QuizSegment {
  QCM_answers: any;
  question_type: string,
  question: string,
  possible_answers: string[] | never[],
  true_answers: number[],
  explanation: string,
}
