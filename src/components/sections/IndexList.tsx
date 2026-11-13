"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { groups, index, type Group, type Row } from "@/content/site";
import { EASE, SectionHead } from "@/components/motion";

type Filter = Group | "All";
const filters: Filter[] = ["All", ...groups];

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const peek: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -6 },
  show: { opacity: 1, scale: 1, rotate: -2, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const rowClass =
  "group grid min-h-[64px] grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-4 transition-[padding,color] duration-300 hover:pl-4 hover:text-cobalt md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_90px_24px]";

function RowBody({ r }: { r: Row }) {
  return (
    <>
      <span className="text-xl font-extrabold tracking-tight md:text-2xl">{r.name}</span>
      <span className="col-span-2 text-[15px] leading-snug text-mute md:col-span-1">{r.type}</span>
      <span className="kicker row-start-1 col-start-2 text-mute md:col-start-3">{r.year}</span>
      <span className="hidden md:block">{r.url && <ArrowUpRight size={20} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}</span>
    </>
  );
}

export function IndexList() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hover, setHover] = useState<string | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const rows = filter === "All" ? index : index.filter((r) => r.group === filter);

  return (
    <section id="index" className="wrap py-20 md:py-28">
      <SectionHead num="03" label="Index" title={`And ${index.length} more. He does not really stop.`} />

      <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? index.length : index.filter((r) => r.group === f).length;
          const on = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className="relative min-h-11 rounded-full border border-ink/25 px-4 text-sm font-semibold"
            >
              {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 300, damping: 28 }} />}
              <span className={`relative ${on ? "text-paper" : ""}`}>
                {f} <span className="font-mono text-xs opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <ul
        className="border-t-2 border-ink"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          x.set(e.clientX + 24);
          y.set(e.clientY - 110);
        }}
        onPointerLeave={() => setHover(null)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {rows.map((r) => (
            <motion.li
              key={r.name}
              layout
              variants={item}
              initial="hidden"
              animate="show"
              exit="exit"
              className="border-b border-ink/15"
              onPointerEnter={(e) => setHover(e.pointerType === "mouse" && r.img ? r.img : null)}
            >
              {r.url ? (
                <a href={r.url} target="_blank" rel="noreferrer" className={rowClass}>
                  <RowBody r={r} />
                </a>
              ) : (
                <div className={rowClass}>
                  <RowBody r={r} />
                </div>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {hover && (
          <motion.div
            key="peek"
            aria-hidden
            style={{ x, y }}
            variants={peek}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[220px] w-[340px] overflow-hidden rounded-lg border-4 border-ink bg-ink shadow-2xl md:block"
          >
            <Image src={hover} alt="" fill sizes="340px" className="object-cover object-top" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
