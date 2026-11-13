"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useScroll, type Variants } from "framer-motion";
import { nav, person } from "@/content/site";
import { EASE } from "@/components/motion";

const sheet: Variants = {
  closed: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, ease: EASE } },
  open: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06, delayChildren: 0.15 } },
};

const link: Variants = {
  closed: { opacity: 0, y: 40 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Nav() {
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <nav aria-label="Primary" className="wrap flex h-14 items-center justify-between">
        <a href="#top" className="text-[15px] font-extrabold tracking-tight">
          {person.name}
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm font-medium transition-colors hover:text-cobalt">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="kicker -mr-3 flex h-11 items-center px-3 md:hidden">Menu</Dialog.Trigger>
          <AnimatePresence>
            {open && (
              <Dialog.Portal forceMount>
                <Dialog.Content asChild forceMount aria-describedby={undefined}>
                  <motion.div
                    variants={sheet}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="on-ink fixed inset-0 z-50 flex flex-col bg-ink px-5 pb-10 pt-4 text-paper"
                  >
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-[15px] font-extrabold tracking-tight">{person.name}</Dialog.Title>
                      <Dialog.Close className="kicker -mr-3 flex h-11 items-center px-3">Close</Dialog.Close>
                    </div>
                    <ul className="mt-auto space-y-1">
                      {nav.map((n) => (
                        <motion.li key={n.href} variants={link}>
                          <a href={n.href} onClick={() => setOpen(false)} className="display block py-2 text-[15vw] leading-none">
                            {n.label}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </nav>
      <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-cobalt" />
    </header>
  );
}
