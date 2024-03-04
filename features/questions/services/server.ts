import { dbAdmin } from "@/firebase/admin";

import { ImagePath, StoryboardAnswer } from "../schema";

export async function getStoryboardAnswers(
  collection: string,
): Promise<StoryboardAnswer[]> {
  const snapshot = await dbAdmin.collection(collection).get();
  const answers: StoryboardAnswer[] = [];
  snapshot.forEach((doc) => {
    const { answer } = doc.data();
    answers.push({ index: parseInt(doc.id), answer });
  });
  return answers;
}

export async function getImagePaths(collection: string): Promise<ImagePath[]> {
  const snapshot = await dbAdmin.collection(collection).get();
  const imagePaths: ImagePath[] = [];
  snapshot.forEach((doc) => {
    const { path } = doc.data();
    imagePaths.push({ index: parseInt(doc.id), path });
  });
  return imagePaths;
}
