"use client";

import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { work, type CaseStudy } from "@/content/site";
import { EASE, Reveal, SectionHead, rise } from "@/components/motion";
import { Visual } from "@/components/Visual";

const MORPH = { type: "spring", stiffness: 210, damping: 28 } as const;

const tile: Variants = {
  rest: { y: 0, rotate: 0, backgroundColor: "#0b0b0d" },
  hover: { y: -10, rotate: -1.2, backgroundColor: "#1a2bff", transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const plus: Variants = {
  rest: { rotate: 0 },
  hover: { rotate: 90, transition: { duration: 0.4, ease: EASE } },
};

const body: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.6, ease: EASE, staggerChildren: 0.06, delayChildren: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.1 } },
};

export const openCase = (id: string) => {
  window.location.hash = `case-${id}`;
};

function Products({ cs }: { cs: CaseStudy }) {
  const [i, setI] = useState(0);
  if (!cs.products) return null;
  const p = cs.products[i];
  return (
    <motion.div variants={rise} className="mt-14 border-t border-paper/25 pt-6">
      <p className="kicker text-haze">Shipped by the studio</p>
      <div role="tablist" aria-label="Studio work" className="mt-5 flex flex-wrap gap-2">
        {cs.products.map((x, n) => (
          <button
            key={x.name}
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className="relative min-h-11 rounded-full border border-paper/30 px-4 text-sm font-semibold"
          >
            {n === i && <motion.span layoutId="product-pill" className="absolute inset-0 rounded-full bg-paper" transition={MORPH} />}
            <span className={`relative ${n === i ? "text-ink" : ""}`}>{x.name}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={p.name} role="tabpanel" variants={body} initial="hidden" animate="show" exit="exit" className="mt-8 max-w-3xl">
          <h4 className="display text-[clamp(28px,4vw,56px)]">{p.name}</h4>
          <p className="mt-4 text-lg leading-snug text-paper/80 md:text-xl">{p.text}</p>
          {p.url && (
            <a href={p.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
              {p.url.replace("https://", "")} <ArrowUpRight size={18} aria-hidden />
            </a>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function Study({ cs }: { cs: CaseStudy }) {
  return (
    <Dialog.Portal forceMount>
      <Dialog.Overlay asChild forceMount>
        <motion.div variants={backdrop} initial="hidden" animate="show" exit="exit" className="fixed inset-0 z-50 bg-ink/50" />
      </Dialog.Overlay>
      <Dialog.Content asChild forceMount aria-describedby={undefined}>
        <motion.div
          layoutId={`case-${cs.id}`}
          transition={MORPH}
          style={{ borderRadius: 20 }}
          className="on-ink fixed inset-2 z-50 overflow-hidden bg-ink text-paper sm:inset-4"
        >
          <div className="h-full overflow-y-auto overscroll-contain">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-ink/90 px-5 py-3 backdrop-blur sm:px-8">
              <p className="kicker text-haze">{cs.kicker}</p>
              <Dialog.Close aria-label="Close case study" className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-ink">
                <X size={18} aria-hidden />
              </Dialog.Close>
            </div>

            <motion.div variants={body} initial="hidden" animate="show" exit="exit" className="mx-auto max-w-page px-5 pb-20 pt-6 sm:px-8 md:pt-10">
              <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <Dialog.Title className="display text-[clamp(44px,9vw,150px)] leading-[0.88]">{cs.name}</Dialog.Title>
                  <p className="mt-6 max-w-2xl text-xl leading-snug text-paper/80 md:text-2xl">{cs.blurb}</p>
                </div>
                <Visual kind={cs.visual} className="w-full max-w-md justify-self-end text-cobalt [filter:brightness(1.6)]" />
              </div>

              <motion.dl variants={rise} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-paper/25 pt-6 md:grid-cols-4">
                {cs.stats.map((s) => (
                  <div key={s.label}>
                    <dd className="display text-[clamp(36px,5vw,68px)]">{s.value}</dd>
                    <dt className="mt-2 max-w-[20ch] text-sm leading-snug text-haze">{s.label}</dt>
                  </div>
                ))}
              </motion.dl>

              <div className="mt-14 grid gap-10 lg:grid-cols-[220px_1fr]">
                <motion.div variants={rise} className="space-y-6">
                  <div>
                    <p className="kicker text-haze">Role</p>
                    <p className="mt-2 font-semibold">{cs.role}</p>
                  </div>
                  <div>
                    <p className="kicker text-haze">When</p>
                    <p className="mt-2 font-semibold">{cs.year}</p>
                  </div>
                  {cs.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
                      {l.label} <ArrowUpRight size={18} aria-hidden />
                    </a>
                  ))}
                </motion.div>
                <div className="max-w-3xl space-y-5">
                  {cs.story.map((p) => (
                    <motion.p key={p} variants={rise} className="text-lg leading-relaxed text-paper/85 md:text-xl">
                      {p}
                    </motion.p>
                  ))}
                  {cs.note && (
                    <motion.p variants={rise} className="kicker pt-2 leading-relaxed text-haze">
                      {cs.note}
                    </motion.p>
                  )}
                </div>
              </div>

              <Products cs={cs} />

              <motion.div variants={rise} className="mt-14 border-t border-paper/25 pt-6">
                <p className="kicker text-haze">Built with</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cs.stack.map((s) => (
                    <li key={s} className="rounded-full border border-paper/30 px-4 py-2 text-sm font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function Work() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace(/^#case-/, "");
      setActive(work.some((w) => w.id === id) ? id : null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setActive(null);
  }, []);

  const cs = work.find((w) => w.id === active);

  return (
    <section id="work" className="wrap py-20 md:py-28">
      <SectionHead num="01" label="Selected work" title="Four things that should have taken a decade." />

      <Reveal as="ul" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {work.map((w, i) => (
          <motion.li key={w.id} variants={rise}>
            <motion.button
              type="button"
              layoutId={`case-${w.id}`}
              transition={MORPH}
              variants={tile}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileFocus="hover"
              onClick={() => openCase(w.id)}
              style={{ borderRadius: 6 }}
              aria-haspopup="dialog"
              className="on-ink group flex min-h-[340px] w-full flex-col justify-between p-6 sm:min-h-[420px] text-left text-paper"
            >
              <span className="flex w-full items-start justify-between">
                <span className="kicker">
                  0{i + 1} · {w.kicker.split(" · ")[0]}
                </span>
                <motion.span variants={plus} className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/40">
                  <Plus size={16} aria-hidden />
                </motion.span>
              </span>
              <Visual kind={w.visual} className="mx-auto my-3 w-full max-w-[170px] opacity-90 sm:my-4 sm:max-w-[240px]" />
              <span>
                <span className="display block text-[clamp(28px,2.4vw,38px)]">{w.name}</span>
                <span className="mt-3 block text-[15px] leading-snug text-paper/75">{w.blurb}</span>
              </span>
            </motion.button>
          </motion.li>
        ))}
      </Reveal>

      <Dialog.Root open={!!cs} onOpenChange={(o) => !o && close()}>
        <AnimatePresence>{cs && <Study key={cs.id} cs={cs} />}</AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
