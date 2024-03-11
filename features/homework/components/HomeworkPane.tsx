"use client";

import { useOptimistic } from "react";
import { IndexedHomework } from "../schema";
import HomeworkLine from "./HomeworkLine";

type Props = {
  ratio: number;
  homework: IndexedHomework[];
  answers: string[];
  collection: string;
};

const HomeworkPane = ({ homework, answers, collection, ratio }: Props) => {
  const [optimisticAnswers, removeAnswer] = useOptimistic<string[], number>(
    answers,
    (state, index) => {
      return state.map((item, _index) => (_index === index ? "" : item));
    },
  );

  return (
    <div className="space-y-8 pt-20">
      {homework.map((line, index) => (
        <HomeworkLine
          key={index}
          line={line}
          answers={optimisticAnswers}
          collection={collection}
          removeAnswer={removeAnswer}
        />
      ))}
    </div>
  );
};

export default HomeworkPane;
