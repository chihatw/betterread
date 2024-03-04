"use server";

import { db } from "@/firebase/client";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { revalidatePath } from "next/cache";

export const setAnswer = async (
  collection: string,
  index: number,
  input: string,
  pathname: string,
) => {
  await setDoc(doc(db, collection, index.toString()), { answer: input });
  console.log({ pathname });
  revalidatePath(pathname);
};

export const removeAnswer = async (
  collection: string,
  index: number,
  pathname: string,
) => {
  await deleteDoc(doc(db, collection, index.toString()));
  revalidatePath(pathname);
};
