"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Question = ({
  text,
  lIndex,
  qIndex,
  value: remote,
  handleUpdate,
}: {
  text: string;
  lIndex: number;
  qIndex: number;
  value: string[][];
  handleUpdate: (value: string[][]) => void;
}) => {
  const [value, setValue] = useState("沒興趣");

  useEffect(() => {
    try {
      setValue(remote[lIndex][qIndex]);
    } catch (e) {}
  }, [remote, lIndex, qIndex]);

  const handleChange = (value: string) => {
    setValue(value);
    const updated = [...remote];
    updated[lIndex][qIndex] = value;
    handleUpdate(updated);
  };
  return (
    <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
      <div className="text-xs font-extrabold">{text}</div>
      <RadioGroup
        className="flex flex-wrap"
        value={value}
        onValueChange={(value) => handleChange(value)}
      >
        {["沒興趣", "行", "不行"].map((item, index) => (
          <div
            key={index}
            className={cn("flex items-center space-x-2 rounded-lg p-2")}
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
