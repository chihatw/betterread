"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ANSWERS, ENDDATE, QUESTION } from "../constants";
import { setStoryboardAnswer } from "../services/actions";

const Question = ({
  index,
  answer,
  hasImage,
  collections,
}: {
  index: number;
  answer: string;
  hasImage: boolean;
  collections: {
    storyboard: string;
    imagePath: string;
  };
}) => {
  const pathname = usePathname();
  const form = useRef<null | HTMLFormElement>(null);
  const now = new Date();
  const endDate = new Date(ENDDATE);
  const [value, setValue] = useState<string | undefined>(undefined);

  const items = Object.values(ANSWERS);

  useEffect(() => {
    if (!hasImage) {
      setValue(undefined);
      return;
    }

    if (answer) {
      setValue(answer);
      return;
    }

    setValue(ANSWERS.no);
  }, [answer, hasImage]);

  const action = async (formData: FormData) => {
    const answer = formData.get("answer")?.toString() || "";
    if (!answer) return;

    await setStoryboardAnswer(collections.storyboard, index, answer, pathname);
  };

  return (
    <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
      <div className="text-xs font-extrabold">
        {QUESTION}
        {!hasImage ? <span>（請先上傳分鏡）</span> : null}
      </div>
      <form
        ref={form}
        action={action}
        onChange={() => form.current!.requestSubmit()}
      >
        <RadioGroup
          name="answer"
          className="flex flex-wrap"
          value={value}
          onValueChange={(value) => setValue(value)}
          disabled={endDate < now}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 rounded-lg p-2",
                item === value ? "bg-slate-200" : "",
              )}
            >
              <RadioGroupItem
                value={item}
                checked={item === value}
                disabled={!hasImage}
              />
              <Label
                className={cn(
                  "whitespace-nowrap",
                  item === value ? "font-extrabold" : "",
                )}
              >
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </form>
    </div>
  );
};

export default Question;
