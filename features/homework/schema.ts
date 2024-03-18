export interface Homework {
  sentence: string;
  sentenceImagePaths: string[];
  questions: string[];
  questionImagePaths: string[][];
}

export interface IndexedHomework {
  sentence: string;
  questions: string[];
  indexes: number[];
  sentenceImagePaths: string[];
  questionImagePaths: string[][];
}

export interface HomeworkAnswer {
  index: number;
  answer: string;
}
