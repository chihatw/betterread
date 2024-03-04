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
      <div>{line.sentence}</div>
      <div>
        {line.questions.map((q, index) => (
          <HomeworkQuestion
            key={index}
            index={line.indexes[index]}
            question={q}
            answer={answers[line.indexes[index]]}
            collection={collection}
            handleRemove={removeAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeworkLine;
