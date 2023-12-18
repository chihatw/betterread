"use client";

import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

const CountDown = () => {
  const endDate = new Date("2023-12-21 01:00:00");
  const [value, setValue] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({ start: now, end: endDate });
      console.log(duration);
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
    <div className="flex items-end justify-center  py-4 font-mono text-4xl">
      <div>{value.days}</div>
      <div className="text-lg">日</div>
      <div>{value.hours}</div>
      <div className="text-lg">小時</div>
      <div>{value.minutes}</div>
      <div className="text-lg">分</div>
      <div>{value.seconds}</div>
      <div className="text-lg">秒</div>
    </div>
  );
};

export default CountDown;
