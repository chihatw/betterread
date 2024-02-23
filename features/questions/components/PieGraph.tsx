"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RADIUS = 70;
const SPS = 60; // steps per second

const PieGraph = ({
  label,
  ratio,
  strokeColor = "stroke-green-600",
}: {
  label: string;
  ratio: number;
  strokeColor?: string;
}) => {
  const [counter, setCounter] = useState(ratio);
  const circle = useRef<null | SVGCircleElement>(null);
  const raf = useRef(0);
  const startAt = useRef(0);

  const loop = useCallback(() => {
    const circleElem = circle.current;
    if (!circleElem) return;

    const elapsed = performance.now() - startAt.current;

    const counter = Math.floor(elapsed / (1000 / SPS));

    if (counter <= ratio) {
      setCounter(counter);
      const offset = getOffset(100, counter, RADIUS);
      circleElem.style.setProperty("stroke-dashoffset", `${offset}`);

      raf.current = requestAnimationFrame(loop);
    } else {
      stop();
    }
  }, [ratio]);

  const stop = () => {
    if (!raf.current) return;
    cancelAnimationFrame(raf.current);
  };

  const start = useCallback(() => {
    startAt.current = performance.now();
    loop();
  }, [loop]);

  useEffect(() => {
    start();
    return () => stop();
  }, [start]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="text-xl font-bold">{label}</div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative flex h-[150px] w-[150px] items-center justify-center">
          <svg className="relvative inset-0 -rotate-90">
            <circle
              cx={RADIUS + 5}
              cy={RADIUS + 5}
              r={RADIUS}
              className="h-full w-full fill-transparent stroke-gray-300 stroke-[10]"
            ></circle>
            <circle
              ref={circle}
              cx={RADIUS + 5}
              cy={RADIUS + 5}
              r={RADIUS}
              className={`h-full w-full fill-transparent  stroke-[10] ${strokeColor}`}
              style={{
                strokeDasharray: RADIUS * 2 * Math.PI,
                strokeDashoffset: RADIUS * 2 * Math.PI,
              }}
            ></circle>
          </svg>
          <div className="absolute text-center font-mono text-4xl font-semibold">
            {String(counter).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieGraph;

function getOffset(max: number, current: number, radius: number) {
  const circumference = radius * 2 * Math.PI;
  return circumference - circumference * (current / max);
}
