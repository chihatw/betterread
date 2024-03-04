"use client";
import { storage } from "@/firebase/client";
import { deleteObject, ref, uploadBytes } from "@firebase/storage";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { ANSWERS, PIE_LABELS } from "../constants";
import { ImagePath, StoryboardAnswer } from "../schema";
import {
  removeImagePath,
  removeStoryboardAnswer,
  setImagePath,
  setStoryboardAnswer,
} from "../services/actions";
import PieGraph from "./PieGraph";
import Sentence from "./Sentence";

const Questions = ({
  user,
  chinese,
  japanese,
  imagePaths,
  collections,
  storyboardAnswers,
}: {
  user: string;
  chinese: string[];
  japanese: string[];
  imagePaths: ImagePath[];
  collections: {
    storyboard: string;
    imagePath: string;
  };
  storyboardAnswers: StoryboardAnswer[];
}) => {
  const pathname = usePathname();
  const ratio_comp = useMemo(() => {
    const total = japanese.length - 1;
    if (!total) return 0;

    const count = imagePaths.reduce((acc, cur) => acc + (!!cur ? 1 : 0), 0);
    return Math.round((count / total) * 100);
  }, [imagePaths, japanese]);

  const ratio_vfx = useMemo(() => {
    const total = imagePaths.reduce((acc, cur) => acc + (!!cur ? 1 : 0), 0);
    if (!total) return 0;

    let count = 0;
    for (let i = 0; i < storyboardAnswers.length; i++) {
      const { answer } = storyboardAnswers[i];
      if (answer !== ANSWERS.yes) continue;
      count++;
    }
    return Math.round((count / total) * 100);
  }, [imagePaths, storyboardAnswers]);

  const handleChange = (index: number, answer: string) => {
    setStoryboardAnswer(collections.storyboard, index, answer, pathname);
  };

  const uploadImage = async (index: number, imagePath: string, file: File) => {
    // storage
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, file);

    // store
    setImagePath(collections.imagePath, index, `/${user}/${index}`, pathname);
    setStoryboardAnswer(collections.storyboard, index, ANSWERS.no, pathname);
  };

  const removeImage = async (index: number, imagePath: string) => {
    // storage
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);

    // store
    removeImagePath(collections.imagePath, index, pathname);
    removeStoryboardAnswer(collections.storyboard, index, pathname);
  };

  return (
    <div className="space-y-10 px-4">
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2">
        <PieGraph label={PIE_LABELS.comp} ratio={ratio_comp} />
        <PieGraph
          label={PIE_LABELS.vfx}
          ratio={ratio_vfx}
          strokeColor="stroke-purple-600"
        />
      </div>
      {japanese.map((_, index) => {
        const imagePath = `${user}/${index}`;
        return (
          <Sentence
            key={index}
            index={index}
            answer={
              storyboardAnswers.find((item) => item.index === index)?.answer ||
              ANSWERS.no
            }
            chinese={chinese[index]}
            japanese={japanese[index]}
            imagePath={
              imagePaths.find((item) => item.index === index)?.path || ""
            }
            handleChange={(answer: string) => handleChange(index, answer)}
            uploadImage={(file: File) => uploadImage(index, imagePath, file)}
            removeImage={() => removeImage(index, imagePath)}
          />
        );
      })}
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2">
        <PieGraph label={PIE_LABELS.comp} ratio={ratio_comp} />
        <PieGraph
          label={PIE_LABELS.vfx}
          ratio={ratio_vfx}
          strokeColor="stroke-purple-600"
        />
      </div>
    </div>
  );
};

export default Questions;
