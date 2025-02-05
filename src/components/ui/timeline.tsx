"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { TimelineProps } from "@/lib/props";

export const Timeline = ({ data }: { data: TimelineProps[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40">
            <div className="sticky flex z-40 items-center top-60 self-start max-w-xs lg:max-w-sm md:w-full">
              <h3 className="hidden md:block pl-30 text-6xl font-bold text-slate-400 dark:text-slate-700">
                {item.year}
              </h3>
              <div className="h-10 absolute left-3 md:left-[281px] w-10 rounded-full bg-background flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2" />
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full py-2">
              <h3 className="md:hidden block text-5xl mb-6 text-left font-bold text-slate-400 dark:text-slate-700">
                {item.year}
              </h3>
              <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">
                {item.title}
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-justify text-md pb-8">
                {item.content}
              </p>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-[300px] left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-slate-200 dark:via-slate-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-500 via-accent to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
