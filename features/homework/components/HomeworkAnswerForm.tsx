"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ENDDATE } from "@/features/questions/constants";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { setHomeworkAnswer } from "../services/actions";

type Props = {
  answer: string;
  index: number;
  collection: string;
  refreshOpticalAnswers: () => void;
};

type State = {
  input: string;
  disabled: boolean;
};

const INITIAL_STATE: State = { disabled: true, input: "" };

const HomeworkAnswerForm = ({
  index,
  answer,
  collection,
  refreshOpticalAnswers,
}: Props) => {
  const disabled = useMemo(() => new Date(ENDDATE) < new Date(), []);
  const pathname = usePathname();
  const form = useRef<null | HTMLFormElement>(null);
  const textarea = useRef<null | HTMLTextAreaElement>(null);
  const [isPending, startTransition] = useTransition();
  const [props, setProps] = useState(INITIAL_STATE);

  useEffect(() => {
    setProps((prev) => ({ ...prev, input: answer }));
    if (!textarea.current) return;
    textarea.current.value = answer;
  }, [answer]);

  const handleChange = () => {
    if (!form.current) return;
    const formData = new FormData(form.current);
    const input = formData.get("input")?.toString() || "";
    const disabled = input === answer;
    setProps({ input, disabled });
  };

  const action = async () => {
    startTransition(async () => {
      try {
        await setHomeworkAnswer(collection, index, props.input, pathname);
        form.current!.reset();
        refreshOpticalAnswers(); // <- これがなかったら optimistic の値が更新されない
        setProps((prev) => ({ ...prev, disabled: true }));
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <form
      className="space-y-2"
      ref={form}
      onChange={handleChange}
      action={action}
    >
      <Textarea
        ref={textarea}
        name="input"
        className="bg-white text-xs font-extralight"
        placeholder="請輸入答案"
        disabled={disabled}
      />
      <Button
        className="flex w-full items-center gap-2"
        disabled={isPending || props.disabled || disabled}
      >
        <span>{answer ? "更新" : "送出"}</span>
        {isPending ? <Loader2 className="animate-spin" /> : null}
      </Button>
    </form>
  );
};

export default HomeworkAnswerForm;
