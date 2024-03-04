export interface UserProps {
  answers: string[];
  imagePaths: string[];
}

export interface StoryboardAnswer {
  index: number;
  answer: string;
}

export interface ImagePath {
  index: number;
  path: string;
}

export interface QuestionProps {
  imagePaths: ImagePath[];
  storyboardAnswers: StoryboardAnswer[];
}
