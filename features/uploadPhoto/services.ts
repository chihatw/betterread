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
