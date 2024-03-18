import Image from "next/image";
import { IndexedHomework } from "../schema";
import HomeworkQuestion from "./HomeworkQuestion";

type Props = {
  line: IndexedHomework;
  answers: string[];
  collection: string;
  removeAnswer: (index: number) => void;
};

const HomeworkLine = ({ line, answers, collection, removeAnswer }: Props) => {
  return (
    <div className="space-y-4 px-4">
      {line.sentenceImagePaths.map((path, index) => (
        <div key={index} className="flex justify-center">
          <Image src={path} alt="" width={500} height={500} />
        </div>
      ))}

      <div className="grid">
        {line.sentence.split("\n").map((line, index) => {
          if (!line) return <div key={index} className="h-[1em]" />;
          return <div key={index}>{line}</div>;
        })}
      </div>
      <div>
        {line.questions.map((q, index) => (
          <HomeworkQuestion
            key={index}
            index={line.indexes[index]}
            question={q}
            answer={answers[line.indexes[index]]}
            collection={collection}
            handleRemove={removeAnswer}
            questionImagePaths={line.questionImagePaths[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeworkLine;
