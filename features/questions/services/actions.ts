"use server";

import { db } from "@/firebase/client";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { revalidatePath } from "next/cache";
import { ANSWERS } from "../constants";

export async function setStoryboardAnswer(
  collection: string,
  index: number,
  input: string,
  pathname: string,
) {
  await setDoc(doc(db, collection, index.toString()), { answer: input });
  revalidatePath(pathname);
}

export async function setImagePath(
  collections: {
    storyboard: string;
    imagePath: string;
  },
  index: number,
  user: string,
  pathname: string,
) {
  await setDoc(doc(db, collections.imagePath, index.toString()), {
    path: `${user}/${index}`,
  });
  await setDoc(doc(db, collections.storyboard, index.toString()), {
    answer: ANSWERS.no,
  });
  revalidatePath(pathname);
}

export async function removeImagePath(
  collections: {
    storyboard: string;
    imagePath: string;
  },
  index: number,
  pathname: string,
) {
  await deleteDoc(doc(db, collections.imagePath, index.toString()));
  await deleteDoc(doc(db, collections.storyboard, index.toString()));
  revalidatePath(pathname);
}
