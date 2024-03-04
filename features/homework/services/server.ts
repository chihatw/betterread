import { dbAdmin } from "@/firebase/admin";
import { HomeworkAnswer } from "../schema";

export const getHomeworkAnswers = async (
  collection: string,
): Promise<HomeworkAnswer[]> => {
  const snapshot = await dbAdmin.collection(collection).get();
  const answers: HomeworkAnswer[] = [];
  snapshot.forEach((doc) => {
    const { answer } = doc.data();
    answers.push({ index: parseInt(doc.id), answer });
  });
  return answers;
};
