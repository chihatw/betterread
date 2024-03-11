"use client";
import { useMemo } from "react";
import { ANSWERS } from "../constants";
import { ImagePath, StoryboardAnswer } from "../schema";
import { getCompletionRatio, getVFXRatio } from "../services/utils";
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
  const { ratio_comp, ratio_vfx } = useMemo(() => {
    // debug
    const ratio_comp = getCompletionRatio(japanese, imagePaths);
    const ratio_vfx = getVFXRatio(imagePaths, storyboardAnswers);
    return { ratio_comp, ratio_vfx };
  }, [japanese, imagePaths, storyboardAnswers]);

  return (
    <div className="space-y-10 px-4 py-20">
      {japanese.map((_, index) => {
        const imagePath =
          imagePaths.find((item) => item.index === index)?.path || "";
        const answer =
          storyboardAnswers.find((item) => item.index === index)?.answer ||
          ANSWERS.no;
        return (
          <Sentence
            user={user}
            key={index}
            index={index}
            answer={answer}
            chinese={chinese[index]}
            japanese={japanese[index]}
            imagePath={imagePath}
            collections={collections}
          />
        );
      })}
    </div>
  );
};

export default Questions;
