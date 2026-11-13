"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { proof, type Stat } from "@/content/site";
import { EASE, Reveal, rise } from "@/components/motion";

function Figure({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || stat.text) return;
    if (reduce) {
      setN(stat.value);
      return;
    }
    const controls = animate(0, stat.value, { duration: 1.4, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, stat]);

  return (
    <motion.li variants={rise} className="border-t border-paper/25 pt-4">
      <p ref={ref} className="display text-[clamp(34px,6.2vw,96px)] [font-variant-numeric:tabular-nums]">
        {stat.text ?? `${n.toLocaleString("en-US")}${stat.suffix ?? ""}`}
      </p>
      <p className="mt-2 max-w-[22ch] text-sm leading-snug text-haze">{stat.label}</p>
    </motion.li>
  );
}

export function Proof() {
  return (
    <section aria-label="By the numbers" className="on-ink bg-ink py-14 text-paper md:py-20">
      <Reveal as="ul" className="wrap grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3">
        {proof.map((s) => (
          <Figure key={s.label} stat={s} />
        ))}
      </Reveal>
    </section>
  );
}
