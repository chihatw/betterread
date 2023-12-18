"use client";

import { QUESTIONS } from "../constants";
import Question from "./Question";

const Sentence = ({
  index,
  japanese,
  chinese,
  value,
  handleUpdate,
}: {
  index: number;
  japanese: string;
  chinese: string;
  value: string[][];
  handleUpdate: (value: string[][]) => void;
}) => {
  if (!index) {
    return (
      <div key={index} className="flex gap-4">
        <div className="basis-2 text-right text-xs">{index + 1}</div>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-extrabold">{japanese}</div>
          <div className="text-xs text-green-600">{chinese}</div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="flex gap-4">
      <div className="basis-2 text-right text-xs">{index + 1}</div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-extrabold">{japanese}</div>
        <div className="text-xs text-green-600">{chinese}</div>
        {QUESTIONS.map((question, qIndex) => (
          <Question
            text={question}
            key={qIndex}
            lIndex={index}
            value={value}
            qIndex={qIndex}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Sentence;