"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { person, stops } from "@/content/site";
import { EASE } from "@/components/motion";

const FIRST = stops[0].age;
const LAST = stops[stops.length - 1].age;

const roll: Variants = {
  enter: (dir: number) => ({ y: `${dir * 100}%` }),
  center: { y: "0%", transition: { duration: 0.5, ease: EASE } },
  exit: (dir: number) => ({ y: `${dir * -100}%`, transition: { duration: 0.5, ease: EASE } }),
};

const swap: Variants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.14 } },
};

function Digit({ char, dir }: { char: string; dir: number }) {
  return (
    // Padding widens the clip box past the glyph's advance width; the negative margin pulls the digits back together.
    <span className="relative -mx-[0.065em] inline-block overflow-hidden px-[0.03em] align-bottom">
      <span className="invisible">{char}</span>
      <AnimatePresence initial={false} custom={dir}>
        <motion.span key={char} custom={dir} variants={roll} initial="enter" animate="center" exit="exit" className="absolute inset-y-0 left-[0.03em]">
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [age, setAge] = useState(FIRST);
  const [dir, setDir] = useState(1);
  const touched = useRef(false);

  useEffect(() => {
    if (reduce) {
      setAge(LAST);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = (next: number) => {
      if (touched.current || next > LAST) return;
      setAge(next);
      timer = setTimeout(() => tick(next + 1), next === LAST - 1 ? 560 : 360);
    };
    timer = setTimeout(() => tick(FIRST + 1), 700);
    return () => clearTimeout(timer);
  }, [reduce]);

  const go = (next: number) => {
    touched.current = true;
    setDir(next >= age ? 1 : -1);
    setAge(next);
  };

  const stop = stops.find((s) => s.age === age) ?? stops[stops.length - 1];
  const digits = String(age).split("");

  return (
    <section id="top" className="wrap pb-16 pt-24 md:pb-24 md:pt-28">
      <h1 className="sr-only">
        {person.name}. Age {person.age}. Senior Full Stack Engineer, technical lead, and co-founder of two companies.
      </h1>

      <div className="kicker flex justify-between gap-x-8 text-mute">
        <span>{person.location}</span>
        <span className="hidden md:inline">Senior Full Stack Engineer · Co-founder · U.S. Navy Reserve</span>
        <span>TS/SCI</span>
      </div>

      <div className="mt-6 grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
        <div
          aria-hidden
          className="select-none text-[clamp(190px,34vw,520px)] font-black leading-[0.8] text-cobalt [font-variant-numeric:tabular-nums]"
        >
          {digits.map((c, i) => (
            <Digit key={i} char={c} dir={dir} />
          ))}
        </div>

        <div aria-live="polite" className="min-h-[230px] pb-2 lg:min-h-[340px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={stop.age} variants={swap} initial="enter" animate="center" exit="exit">
              <p className="kicker text-cobalt">
                Age {stop.age} · {stop.year}
              </p>
              <p className="display mt-4 text-[clamp(32px,4.2vw,64px)]">{stop.title}</p>
              <p className="mt-5 max-w-xl text-lg leading-snug text-mute md:text-xl">{stop.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-10 border-t-2 border-ink pt-4 md:mt-14">
        <div className="kicker flex justify-between">
          <label htmlFor="age-scrub">Drag through the years</label>
          <span className="text-mute">
            {FIRST} → {LAST}
          </span>
        </div>
        <div className="relative mt-3">
          <div aria-hidden className="pointer-events-none absolute inset-x-[14px] inset-y-0 flex justify-between">
            {stops.map((s) => (
              <span key={s.age} className={`w-0.5 transition-colors ${s.age <= age ? "bg-cobalt" : "bg-ink/25"}`} />
            ))}
          </div>
          <input
            id="age-scrub"
            className="scrub relative block"
            type="range"
            min={FIRST}
            max={LAST}
            step={1}
            value={age}
            onChange={(e) => go(Number(e.target.value))}
            aria-valuetext={`Age ${stop.age}, ${stop.year}: ${stop.title}`}
          />
        </div>
        <div className="mt-1 flex justify-between px-[14px]">
          {stops.map((s) => (
            <button
              key={s.age}
              type="button"
              onClick={() => go(s.age)}
              aria-label={`Jump to age ${s.age}`}
              className={`flex h-11 w-0 items-center justify-center text-base font-extrabold transition-colors ${
                s.age === age ? "text-cobalt" : "text-ink hover:text-cobalt"
              }`}
            >
              <span className="px-3">{s.age}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
