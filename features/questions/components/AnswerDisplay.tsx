import { notojp } from "@/utils/fonts";

const AnswerDisplay = ({ answer }: { answer: string }) => {
  return (
    <div
      className={`absolute font-extralight text-red-400 ${notojp.className} bg-white/70 px-2 py-1 text-sm`}
    >
      {answer}
    </div>
  );
};

export default AnswerDisplay;
