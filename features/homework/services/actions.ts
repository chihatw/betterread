"use server";

import { db } from "@/firebase/client";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { revalidatePath } from "next/cache";

export const setHomeworkAnswer = async (
  collection: string,
  index: number,
  input: string,
  pathname: string,
) => {
  await setDoc(doc(db, collection, index.toString()), { answer: input });
  revalidatePath(pathname);
};

export const removeHomeworkAnswer = async (
  collection: string,
  index: number,
  pathname: string,
) => {
  await deleteDoc(doc(db, collection, index.toString()));
  revalidatePath(pathname);
};
