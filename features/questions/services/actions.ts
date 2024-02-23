"use server";

import { db } from "@/firebase/client";
import { doc, updateDoc } from "@firebase/firestore";
import { revalidatePath } from "next/cache";

export const updateAnswers = async (docId: string, answers: string[]) => {
  await updateDoc(doc(db, "temp", docId), { answers });
  revalidatePath(`/${docId}`);
};

export const updateImagePaths = async (docId: string, imagePaths: string[]) => {
  await updateDoc(doc(db, "temp", docId), { imagePaths });
  revalidatePath(`/${docId}`);
};
