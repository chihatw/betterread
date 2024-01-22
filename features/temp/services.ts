"use server";

import { db } from "@/firebase/client";
import { doc, updateDoc } from "@firebase/firestore";
import { revalidatePath } from "next/cache";

export const updateString = async (docId: string, value: string[][]) => {
  await updateDoc(doc(db, "temp", docId), { string: JSON.stringify(value) });
  revalidatePath(`/${docId}`);
};
