import { storage } from "@/firebase/client";
import { deleteObject, ref, uploadBytes } from "@firebase/storage";
import { SetStateAction } from "react";

export const setLocalPreview = (
  file: File,
  setImageSrc: (value: SetStateAction<string>) => void,
) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.addEventListener("load", (e) => {
    const { result } = e.target!;
    setImageSrc(result as string);
  });
};

export async function uploadImage(user: string, index: number, file: File) {
  const storageRef = ref(storage, `${user}/${index}`);
  await uploadBytes(storageRef, file);
}

export async function removeImage(user: string, index: number) {
  const storageRef = ref(storage, `${user}/${index}`);
  await deleteObject(storageRef);
}
