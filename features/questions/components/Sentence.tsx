import ImagePane from "@/features/uploadPhoto/component/ImagePane";
import Question from "./Question";

const Sentence = async ({
  user,
  index,
  japanese,
  chinese,
  answer,
  imagePath,
  collections,
}: {
  user: string;
  index: number;
  japanese: string;
  chinese: string;
  answer: string;
  imagePath: string;
  collections: {
    storyboard: string;
    imagePath: string;
  };
}) => {
  if (!index) {
    return (
      <div className="flex gap-4">
        <div className="basis-2 text-right text-xs">{index + 1}</div>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-extrabold">{japanese}</div>
          <div className="text-xs text-green-600">{chinese}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="basis-2 text-right text-xs">{index + 1}</div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-extrabold">{japanese}</div>
        <div className="text-xs text-green-600">{chinese}</div>

        <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
          <div className="text-xs font-extrabold">🎥 分鏡</div>
          <ImagePane
            index={index}
            user={user}
            answer={answer}
            imagePath={imagePath}
            collections={collections}
          />
        </div>
        <Question
          index={index}
          answer={answer}
          hasImage={!!imagePath}
          collections={collections}
        />
      </div>
    </div>
  );
};

export default Sentence;
