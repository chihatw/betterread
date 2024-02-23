"use client";
import { removeRemoteImage } from "@/actions";
import { storage } from "@/firebase/client";
import { ref, uploadBytes } from "@firebase/storage";
import { useMemo } from "react";
import { ANSWERS, PIE_LABELS } from "../constants";
import { updateAnswers, updateImagePaths } from "../services/actions";
import PieGraph from "./PieGraph";
import Sentence from "./Sentence";

const Questions = ({
  docId,
  answers,
  chinese,
  japanese,
  imagePaths,
}: {
  docId: string;
  answers: string[];
  chinese: string[];
  japanese: string[];
  imagePaths: string[];
}) => {
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
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const imagePath = imagePaths[i];
      if (!imagePath || answer !== ANSWERS.yes) continue;
      count++;
    }
    return Math.round((count / total) * 100);
  }, [answers, imagePaths]);

  const handleChange = (index: number, answer: string) => {
    const cloned: string[] = [];
    for (let i = 0; i < japanese.length; i++) {
      cloned[i] = answers[i] || ANSWERS.no;
    }
    cloned[index] = answer;
    updateAnswers(docId, cloned);
  };

  const uploadImage = async (index: number, imagePath: string, file: File) => {
    // store
    const cloned: string[] = [];
    for (let i = 0; i < japanese.length; i++) {
      cloned[i] = imagePaths[i] || "";
    }
    cloned[index] = imagePath;
    updateImagePaths(docId, cloned);

    // storage
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, file);
  };

  const removeImage = async (index: number, imagePath: string) => {
    // store
    const cloned: string[] = [];
    for (let i = 0; i < japanese.length; i++) {
      cloned[i] = imagePaths[i] || "";
    }
    cloned[index] = "";
    updateImagePaths(docId, cloned);

    // storage
    await removeRemoteImage(imagePath, `/${docId}`);
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
        const imagePath = `${docId}/${index}`;
        return (
          <Sentence
            key={index}
            index={index}
            answer={answers[index]}
            chinese={chinese[index]}
            japanese={japanese[index]}
            imagePath={imagePaths[index]}
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
