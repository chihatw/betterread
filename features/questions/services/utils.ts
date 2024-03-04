import { ANSWERS } from "../constants";
import { ImagePath, StoryboardAnswer } from "../schema";

export function getCompletionRatio(
  japanese: string[],
  imagePaths: ImagePath[],
): number {
  const total = japanese.length - 1;
  if (!total) return 0;
  const count = imagePaths.length;
  return Math.round((count / total) * 100);
}

export function getVFXRatio(
  imagePaths: ImagePath[],
  storyboardAnswers: StoryboardAnswer[],
): number {
  const total = imagePaths.length;
  if (!total) return 0;

  let count = 0;
  for (let i = 0; i < storyboardAnswers.length; i++) {
    const { answer } = storyboardAnswers[i];
    if (answer !== ANSWERS.yes) continue;
    count++;
  }
  return Math.round((count / total) * 100);
}
