import ImagePane from "@/features/uploadPhoto/component/ImagePane";
import { storage } from "@/firebase/client";
import { getDownloadURL, ref } from "@firebase/storage";
import { QUESTIONS } from "../constants";
import Question from "./Question";

const Sentence = async ({
  index,
  japanese,
  chinese,
  value,
  docId,
}: {
  index: number;
  japanese: string;
  chinese: string;
  value: string[][];
  docId: string;
}) => {
  const filename = `${docId}/${index}`;
  let imageSrc = "";
  try {
    imageSrc = (await getDownloadURL(ref(storage, filename))) || "";
  } catch (e) {
    imageSrc = "";
  }

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
        {QUESTIONS.map((question, qIndex) => (
          <Question
            text={question}
            key={qIndex}
            lIndex={index}
            value={value}
            qIndex={qIndex}
            docId={docId}
          />
        ))}
        <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
          <div className="text-xs font-extrabold">🎥 分鏡</div>
          <ImagePane
            filename={`${docId}/${index}`}
            imageSrc={imageSrc}
            path={docId}
            answer={value[index][0]}
          />
        </div>
      </div>
    </div>
  );
};

export default Sentence;
