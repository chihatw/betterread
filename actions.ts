"use server";

import { deleteObject, ref } from "@firebase/storage";
import { revalidatePath } from "next/cache";
import { storage } from "./firebase/client";

export const removeRemoteImage = async (filename: string, path: string) => {
  const storageRef = ref(storage, filename);
  await deleteObject(storageRef);
  revalidatePath(path);
};
