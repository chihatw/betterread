"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ANSWERS, ENDDATE, QUESTION } from "../constants";

const Question = ({
  answer,
  hasImage,
  handleChange,
}: {
  answer: string;
  hasImage: boolean;
  handleChange: (answer: string) => void;
}) => {
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

  const _handleChange = async (value: string) => {
    setValue(value);
    handleChange(value);
  };

  return (
    <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
      <div className="text-xs font-extrabold">
        {QUESTION}
        {!hasImage ? <span>（請先上傳分鏡）</span> : null}
      </div>
      <RadioGroup
        className="flex flex-wrap"
        value={value}
        onValueChange={(value) => _handleChange(value)}
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
    </div>
  );
};

export default Question;
