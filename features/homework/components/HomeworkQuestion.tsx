"use client";
import { Button } from "@/components/ui/button";
import { ENDDATE } from "@/features/questions/constants";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { removeAnswer } from "../services/actions";
import HomeworkAnswerForm from "./HomeworkAnswerForm";

type Props = {
  index: number;
  question: string;
  answer: string;
  collection: string;
  handleRemove: (index: number) => void;
};

const HomeworkQuestion = ({
  index,
  question,
  answer,
  collection,
  handleRemove,
}: Props) => {
  const disabled = useMemo(() => new Date(ENDDATE) < new Date(), []);
  const pathname = usePathname();
  return (
    <div className="space-y-4 pb-8">
      <div className="flex gap-x-2 font-extralight">
        <div className="pt-0.5 text-xs">{index + 1}</div>
        <div>{question}</div>
      </div>

      <div className="space-y-4 pl-5">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4 ">
          <div className="space-x-1">
            {answer ? <span>📬</span> : null}
            <span>答案</span>
          </div>
          <div className="border-b border-black p-2">
            {answer.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          <form
            action={() => {
              handleRemove(index);
              removeAnswer(collection, index, pathname);
            }}
          >
            <Button
              size="icon"
              type="submit"
              variant="ghost"
              disabled={!answer || disabled}
            >
              <Trash2 />
            </Button>
          </form>
        </div>
        <HomeworkAnswerForm
          answer={answer}
          index={index}
          collection={collection}
          refreshOpticalAnswers={() => handleRemove(-1)}
        />
      </div>
    </div>
  );
};

export default HomeworkQuestion;
