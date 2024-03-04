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
): { homeworkAnswers: string[]; ratio: number } {
  const homeworkAnswers: string[] = [];
  let answered = 0;
  for (let i = 0; i <= (indexedHomework.at(-1)?.indexes.at(-1) || 0); i++) {
    const answer = rawAnswers.find((a) => a.index === i)?.answer || "";
    if (!!answer) {
      answered++;
    }
    homeworkAnswers.push(answer);
  }
  const ratio = Math.round((answered / homeworkAnswers.length) * 100);
  return { homeworkAnswers, ratio };
}
