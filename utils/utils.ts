import { chinese_digits } from "@/features/questions/constants";

export const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const isMobile = () => {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};

export const buildChineseDigits = (input: number) => {
  if (input > 99) throw new Error(`too large number: ${input}`);
  if (input === 10) return "十";

  const input_string = input.toString();
  const size = input_string.split("").length;
  return input_string
    .split("")
    .map((c, index) => {
      const n = parseInt(c);
      const pos = size - index;
      // 十の位
      if (pos > 1) {
        if (n === 1) {
          return "十";
        }
        return chinese_digits[n] + "十";
      }
      // 一の位
      return chinese_digits[n] || "";
    })
    .join("");
};

export const isValidEmail = (input: string) => {
  const pattern =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return pattern.test(input);
};
