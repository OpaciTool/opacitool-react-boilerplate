"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { events, TimelineEventInterface } from "../data/timeline";
import { getLectureMediaUrl } from "../lib/getLectureMedia";

function TimelineEvent({
  event,
  index,
}: {
  event: TimelineEventInterface;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            delay: index * 0.1,
          },
        },
      }}
      className="relative mb-16 "
    >
      {/* Year Marker */}
      <div className="flex flex-col items-center justify-center">
        <span className={"inline-block rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white"}>
          {event.year}
        </span>
        <div className="w-[400px] h-2 bg-orange-500 mt-4"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12 mt-10">
        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.4,
                delay: index * 0.1,
              },
            },
          }}
          className={`flex items-center ${isEven ? "md:order-1" : "md:order-2"}`}
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-300">{event.title}</h3>
            <p className="text-muted-foreground text-zinc-900 dark:text-zinc-400">{event.description}</p>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.4,
                delay: index * 0.1,
              },
            },
          }}
          className={`aspect-video relative overflow-hidden rounded-lg ${isEven ? "md:order-2" : "md:order-1"}`}
        >
          <img
            src={getLectureMediaUrl(event.image) || "/placeholder.svg"}
            alt={event.title}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <div className="bg-[#EEE] px-4 py-8 lg:px-14 dark:bg-zinc-900">
      <h2 className="my-16 text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-300">
        Timeline of Events
      </h2>
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 transform bg-teal-400" />

        {/* Timeline Events */}
        <div className="relative">
          {events.map((event, index) => (
            <TimelineEvent key={event.year} event={event} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
