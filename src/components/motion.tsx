"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";

export const EASE = [0.2, 0.8, 0.2, 1] as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "header";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </Tag>
  );
}

export function SectionHead({ num, label, title }: { num: string; label: string; title: string }) {
  return (
    <Reveal as="header" className="mb-10 grid gap-4 border-t-2 border-current pt-5 md:mb-14 md:grid-cols-[220px_1fr]">
      <motion.p variants={rise} className="kicker">
        {num} · {label}
      </motion.p>
      <motion.h2 variants={rise} className="display max-w-4xl text-[clamp(34px,5.2vw,76px)]">
        {title}
      </motion.h2>
    </Reveal>
  );
}
