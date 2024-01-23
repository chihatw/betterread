"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ANSWERS, ENDDATE } from "../constants";
import { updateString } from "../services";

const Question = ({
  text,
  lIndex,
  qIndex,
  value: remote,
  docId,
}: {
  text: string;
  lIndex: number;
  qIndex: number;
  value: string[][];
  docId: string;
}) => {
  const now = new Date();
  const endDate = new Date(ENDDATE);
  const [value, setValue] = useState(ANSWERS.null);

  const items = Object.values(ANSWERS);

  useEffect(() => {
    try {
      setValue(remote[lIndex][qIndex]);
    } catch (e) {}
  }, [remote, lIndex, qIndex]);

  const handleChange = async (value: string) => {
    setValue(value);
    const updated = [...remote];
    if (!updated[lIndex]) {
      updated[lIndex] = [ANSWERS.null];
    }
    updated[lIndex][qIndex] = value;

    handleUpdate(updated);
  };

  const handleUpdate = (value: string[][]) => {
    updateString(docId, value);
  };

  return (
    <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
      <div className="text-xs font-extrabold">{text}</div>
      <RadioGroup
        className="flex flex-wrap"
        value={value}
        onValueChange={(value) => handleChange(value)}
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
            <RadioGroupItem value={item} checked={item === value} />
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
