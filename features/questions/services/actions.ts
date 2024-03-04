"use server";

import { db } from "@/firebase/client";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { revalidatePath } from "next/cache";

export async function setStoryboardAnswer(
  collection: string,
  index: number,
  input: string,
  pathname: string,
) {
  await setDoc(doc(db, collection, index.toString()), { answer: input });
  revalidatePath(pathname);
}

export async function removeStoryboardAnswer(
  collection: string,
  index: number,
  pathname: string,
) {
  await deleteDoc(doc(db, collection, index.toString()));
  revalidatePath(pathname);
}

export async function setImagePath(
  collection: string,
  index: number,
  path: string,
  pathname: string,
) {
  await setDoc(doc(db, collection, index.toString()), { path });
  revalidatePath(pathname);
}

export async function removeImagePath(
  collection: string,
  index: number,
  pathname: string,
) {
  await deleteDoc(doc(db, collection, index.toString()));
  revalidatePath(pathname);
}
