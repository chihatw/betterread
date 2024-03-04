export interface Homework {
  sentence: string;
  questions: string[];
}

export interface IndexedHomework {
  sentence: string;
  questions: string[];
  indexes: number[];
}

export interface HomeworkAnswer {
  index: number;
  answer: string;
}
