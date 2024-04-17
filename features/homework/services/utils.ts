import { ImagePath } from "@/features/questions/schema";
import { Homework, HomeworkAnswer, IndexedHomework } from "../schema";

export function buildIndexedHomework(homework: Homework[]): IndexedHomework[] {
  let offset = 0;
  return homework.map((line) => {
    const indexes: number[] = [];
    for (let i = 0; i < line.questions.length; i++) {
      indexes.push(offset + i);
    }
    offset = offset + line.questions.length;
    return { ...line, indexes };
  });
}

export function buildHomeworkAnswers(
  rawAnswers: HomeworkAnswer[],
  indexedHomework: IndexedHomework[],
  japanese: string[],
  imagePaths: ImagePath[],
): { homeworkAnswers: string[]; ratio: number } {
  const homeworkAnswers: string[] = [];

  let answered = 0;

  if (!!indexedHomework.length) {
    for (let i = 0; i <= (indexedHomework.at(-1)?.indexes.at(-1) || 0); i++) {
      const answer = rawAnswers.find((a) => a.index === i)?.answer || "";
      if (!!answer) {
        answered++;
      }
      homeworkAnswers.push(answer);
    }
  }

  answered += imagePaths.length;

  const total = homeworkAnswers.length + japanese.length - 1;

  const ratio = Math.round((answered / total) * 100);
  return { homeworkAnswers, ratio };
}
