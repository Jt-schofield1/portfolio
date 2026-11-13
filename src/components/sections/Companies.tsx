"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { companies, type CompanyProduct } from "@/content/site";
import { EASE, Reveal, SectionHead, rise } from "@/components/motion";
import { openCase } from "@/components/sections/Work";

const row: Variants = {
  rest: { paddingLeft: 0 },
  hover: { paddingLeft: 20, transition: { duration: 0.35, ease: EASE } },
};

const fill: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.45, ease: EASE } },
};

const arrow: Variants = {
  rest: { x: -8, opacity: 0 },
  hover: { x: 0, opacity: 1, transition: { duration: 0.35, ease: EASE } },
};

const rowClass = "relative flex min-h-[72px] w-full items-center justify-between gap-4 py-4 text-left";
const rowMotion = { variants: row, initial: "rest", animate: "rest", whileHover: "hover", whileFocus: "hover" } as const;

function Row({ product, children }: { product: CompanyProduct; children: React.ReactNode }) {
  if (product.caseId) {
    const id = product.caseId;
    return (
      <motion.button type="button" {...rowMotion} onClick={() => openCase(id)} aria-haspopup="dialog" className={rowClass}>
        {children}
      </motion.button>
    );
  }
  return (
    <motion.a {...rowMotion} href={product.url} target="_blank" rel="noreferrer" className={rowClass}>
      {children}
    </motion.a>
  );
}

export function Companies() {
  return (
    <section id="companies" className="on-ink bg-ink py-20 text-paper md:py-28">
      <div className="wrap">
        <SectionHead num="02" label="Companies" title="A full-time mission. Two companies on top of it." />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {companies.map((c) => (
            <Reveal key={c.name}>
              <motion.p variants={rise} className="kicker text-cobalt [filter:brightness(1.7)]">
                {c.role}
              </motion.p>
              <motion.h3 variants={rise} className="display mt-4 text-[clamp(40px,5.4vw,84px)]">
                {c.name}
              </motion.h3>
              <motion.p variants={rise} className="mt-5 max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                {c.text}
              </motion.p>
              <ul className="mt-10 border-t border-paper/25">
                {c.products.map((p) => (
                  <motion.li key={p.name} variants={rise} className="border-b border-paper/25">
                    <Row product={p}>
                      <motion.span aria-hidden variants={fill} className="absolute inset-0 origin-left bg-cobalt" />
                      <span className="relative text-2xl font-extrabold tracking-tight md:text-3xl">{p.name}</span>
                      <span className="relative flex items-center gap-3 pr-4 text-right text-sm text-paper/75">
                        <span className="hidden sm:inline">{p.text}</span>
                        <motion.span variants={arrow}>
                          <ArrowRight size={20} aria-hidden />
                        </motion.span>
                      </span>
                    </Row>
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
