"use client";

import { Button } from "@/components/ui/button";
import { intervalToDuration } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ENDDATE } from "../constants";

const DISPLAY_NAMES: { [key: string]: string } = {
  kousan: "黄さん",
  lisan: "李さん",
};

const CountDown = ({ opposite }: { opposite: string }) => {
  const now = new Date();
  const endDate = new Date(ENDDATE);
  const [value, setValue] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endDate = new Date(ENDDATE);
      const duration = intervalToDuration({ start: now, end: endDate });
      const { days, hours, minutes, seconds } = duration;
      if (typeof days !== "number") return;
      if (typeof hours !== "number") return;
      if (typeof minutes !== "number") return;
      if (typeof seconds !== "number") return;
      setValue({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-20  items-end justify-center py-5 font-mono text-4xl">
      {endDate > now ? (
        <>
          <div>{value.days}</div>
          <div className="text-lg">日</div>
          <div>{value.hours}</div>
          <div className="text-lg">小時</div>
          <div>{value.minutes}</div>
          <div className="text-lg">分</div>
          <div>{value.seconds}</div>
          <div className="text-lg">秒</div>
        </>
      ) : (
        <Button>
          <Link
            href={`/${opposite}/preview`}
          >{`${DISPLAY_NAMES[opposite]}の絵コンテ`}</Link>
        </Button>
      )}
    </div>
  );
};

export default CountDown;
