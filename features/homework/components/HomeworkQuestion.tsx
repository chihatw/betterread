"use client";
import { Button } from "@/components/ui/button";
import { ENDDATE } from "@/features/questions/constants";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { removeHomeworkAnswer } from "../services/actions";
import HomeworkAnswerForm from "./HomeworkAnswerForm";

type Props = {
  index: number;
  question: string;
  answer: string;
  collection: string;
  handleRemove: (index: number) => void;
  questionImagePaths: string[];
};

const HomeworkQuestion = ({
  index,
  question,
  answer,
  collection,
  handleRemove,
  questionImagePaths,
}: Props) => {
  const disabled = useMemo(() => new Date(ENDDATE) < new Date(), []);
  const pathname = usePathname();
  return (
    <div className="space-y-4 pb-8">
      {questionImagePaths
        ? questionImagePaths.map((path, index) => (
            <div key={index} className="flex justify-center">
              <Image src={path} alt="" width={500} height={500} />
            </div>
          ))
        : null}
      <div className="flex gap-x-2 font-extralight">
        <div className="pt-0.5 text-xs">{index + 1}</div>
        <div>
          {question.split("\n").map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pl-5">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4 ">
          <div className="space-x-1 whitespace-nowrap">
            {answer ? <span>📬</span> : null}
            <span className="whitespace-nowrap">答案</span>
          </div>
          <div className="border-b border-black p-2">
            {answer.split("\n").map((line, index) => {
              const isURL = line.substring(0, 4) === "http";

              return (
                <div key={index} className="break-all p-0">
                  {isURL ? (
                    <Link
                      href={line}
                      className="font-medium text-blue-600 hover:underline "
                    >
                      {line}
                    </Link>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              );
            })}
          </div>
          {disabled ? null : (
            <form
              action={() => {
                handleRemove(index);
                removeHomeworkAnswer(collection, index, pathname);
              }}
            >
              <Button
                size="icon"
                type="submit"
                variant="ghost"
                disabled={!answer}
              >
                <Trash2 />
              </Button>
            </form>
          )}
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
