"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { certs, education, record, toolkit } from "@/content/site";
import { EASE, Reveal, SectionHead, rise } from "@/components/motion";

const panel: Variants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.35, ease: EASE } },
  open: { height: "auto", opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const icon: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 45 },
};

export function Record() {
  const [open, setOpen] = useState(0);

  return (
    <section id="record" className="wrap py-20 md:py-28">
      <SectionHead num="04" label="Record" title="Six years in. Five of them before the degree was done." />

      <Reveal as="ul" className="border-t-2 border-ink">
        {record.map((job, i) => {
          const on = open === i;
          return (
            <motion.li key={job.role} variants={rise} className="border-b border-ink/15">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`job-${i}`}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5 text-left transition-colors hover:text-cobalt md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_170px_32px]"
                >
                  <span className="text-2xl font-extrabold tracking-tight md:text-[32px]">{job.role}</span>
                  <span className="col-span-2 text-mute md:col-span-1">
                    {job.org} · {job.place}
                  </span>
                  <span className="kicker col-span-2 text-mute md:col-span-1">{job.dates}</span>
                  <motion.span variants={icon} animate={on ? "open" : "closed"} className="col-start-2 row-start-1 md:col-start-4">
                    <Plus size={24} aria-hidden />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div id={`job-${i}`} variants={panel} initial="closed" animate="open" exit="closed" className="overflow-hidden">
                    <ul className="max-w-3xl space-y-3 pb-7 text-lg leading-snug">
                      {job.points.map((p) => (
                        <li key={p} className="grid grid-cols-[20px_1fr]">
                          <span aria-hidden className="mt-[0.55em] h-2 w-2 bg-cobalt" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </Reveal>

      <Reveal className="mt-16 grid gap-12 md:grid-cols-2">
        <motion.div variants={rise}>
          <p className="kicker text-mute">Education</p>
          <p className="display mt-4 text-[clamp(26px,3vw,40px)]">{education.degree}</p>
          <p className="mt-3 text-lg text-mute">
            {education.school} · {education.dates}
          </p>
          <p className="mt-1 text-lg text-mute">{education.note}</p>
        </motion.div>
        <motion.div variants={rise}>
          <p className="kicker text-mute">Clearance and certifications</p>
          <ul className="mt-4 border-t border-ink/15">
            {certs.map((c, i) => (
              <li key={c} className={`border-b border-ink/15 py-3 text-lg ${i === 0 ? "font-extrabold text-cobalt" : ""}`}>
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </Reveal>

      <Reveal className="mt-20 border-t-2 border-ink pt-5">
        <motion.p variants={rise} className="kicker">
          Toolkit
        </motion.p>
        <dl className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {toolkit.map((g) => (
            <motion.div key={g.label} variants={rise}>
              <dt className="kicker text-mute">{g.label}</dt>
              <dd className="mt-3 flex flex-wrap gap-y-1 text-[22px] font-extrabold leading-tight tracking-tight">
                {g.items.map((t, i) => (
                  <span key={t} className="whitespace-nowrap">
                    <span className="transition-colors hover:text-cobalt">{t}</span>
                    {i < g.items.length - 1 && <span className="mx-2 font-normal text-ink/25">/</span>}
                  </span>
                ))}
              </dd>
            </motion.div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
