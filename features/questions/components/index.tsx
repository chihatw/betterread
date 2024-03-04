"use client";
import { useMemo } from "react";
import { ANSWERS, PIE_LABELS } from "../constants";
import { ImagePath, StoryboardAnswer } from "../schema";
import { getCompletionRatio, getVFXRatio } from "../services/utils";
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
  const { ratio_comp, ratio_vfx } = useMemo(() => {
    const ratio_comp = getCompletionRatio(japanese, imagePaths);
    const ratio_vfx = getVFXRatio(imagePaths, storyboardAnswers);
    return { ratio_comp, ratio_vfx };
  }, [japanese, imagePaths, storyboardAnswers]);

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
