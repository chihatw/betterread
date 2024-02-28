import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ANSWERS } from "../constants";
import SentencePreview from "./SentencePreview";

const Preview = ({
  opposite,
  lines_j,
  answers,
  imagePaths,
}: {
  opposite: string;
  lines_j: string[];
  answers: string[];
  imagePaths: string[];
}) => {
  return (
    <>
      <div className="flex justify-center py-5">
        <Button>
          <Link href={`/${opposite}`}>{`アンケートに戻る`}</Link>
        </Button>
      </div>
      <div className="space-y-10 px-4">
        {lines_j.map((line, index) => (
          <SentencePreview
            key={index}
            index={index}
            japanese={line}
            answer={answers?.[index] || ANSWERS.no}
            imagePath={imagePaths[index]}
          />
        ))}
      </div>
    </>
  );
};

export default Preview;
