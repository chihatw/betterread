import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ANSWERS } from "../constants";
import { ImagePath, StoryboardAnswer } from "../schema";
import SentencePreview from "./SentencePreview";

const Preview = ({
  opposite,
  lines_j,
  imagePaths,
  storyboardAnswers,
}: {
  opposite: string;
  lines_j: string[];
  imagePaths: ImagePath[];
  storyboardAnswers: StoryboardAnswer[];
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
            answer={
              storyboardAnswers.find((item) => item.index === index)?.answer ||
              ANSWERS.no
            }
            imagePath={
              imagePaths.find((item) => item.index === index)?.path || ""
            }
          />
        ))}
      </div>
    </>
  );
};

export default Preview;
