"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { person } from "@/content/site";
import { EASE, Reveal, rise } from "@/components/motion";

const ENDPOINT = "https://formspree.io/f/myewkwjd";

const reasons = ["a full-time role", "contract or consulting work", "building a product together", "a partnership", "teaching or speaking", "something else"];
const timelines = ["right now", "within a month", "this quarter", "no rush, just exploring"];
const clearances = ["does not need", "needs", "might need"];

type Status = "idle" | "sending" | "sent" | "error";

const swap: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const blank =
  "mx-1 inline-block max-w-full rounded-none border-0 border-b-[3px] border-paper/50 bg-transparent px-1 pb-0.5 font-extrabold text-paper placeholder:font-semibold placeholder:text-paper/45 focus:border-paper";

function Blank({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      aria-label={label}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: `${Math.max(value.length, placeholder.length) + 2}ch` }}
      className={blank}
    />
  );
}

function Pick({ name, label, options, value, onChange }: { name: string; label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <select name={name} aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={`${blank} cursor-pointer appearance-none`}>
      {options.map((o) => (
        <option key={o} value={o} className="bg-ink text-base font-medium text-paper">
          {o}
        </option>
      ))}
    </select>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [f, setF] = useState({
    name: "",
    company: "",
    reason: reasons[0],
    timeline: timelines[0],
    clearance: clearances[0],
    email: "",
    link: "",
    message: "",
  });
  const set = (k: keyof typeof f) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("_gotcha")) return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          clearance: `${f.clearance} a clearance`,
          _subject: `Portfolio: ${f.name}${f.company ? ` (${f.company})` : ""} about ${f.reason}`,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="on-cobalt bg-cobalt pb-10 pt-20 text-paper md:pt-28">
      <div className="wrap">
        <Reveal>
          <motion.p variants={rise} className="kicker">
            05 · Contact
          </motion.p>
          <motion.h2 variants={rise} className="display mt-6 text-[clamp(52px,11vw,190px)] leading-[0.86]">
            Twenty-three.
            <br />
            Just getting started.
          </motion.h2>
        </Reveal>

        <div className="mt-16 min-h-[420px] border-t-2 border-paper pt-8 md:mt-24">
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div key="sent" variants={swap} initial="hidden" animate="show" exit="exit" role="status">
                <p className="display text-[clamp(40px,7vw,110px)]">Sent. Talk soon, {f.name.split(" ")[0]}.</p>
                <p className="mt-6 max-w-xl text-xl text-paper/85">Your note is in his inbox with everything he needs to give you a real answer.</p>
              </motion.div>
            ) : (
              <motion.form key="form" variants={swap} initial="hidden" animate="show" exit="exit" onSubmit={submit}>
                <p className="kicker mb-8">Fill in the blanks</p>
                <p className="max-w-6xl text-[clamp(24px,3.3vw,46px)] font-medium leading-[1.55] tracking-tight">
                  Hi James. My name is
                  <Blank name="name" label="Your name" placeholder="your name" value={f.name} onChange={set("name")} required autoComplete="name" />
                  and I am with
                  <Blank name="company" label="Company or organization" placeholder="company" value={f.company} onChange={set("company")} autoComplete="organization" />
                  . I am reaching out about
                  <Pick name="reason" label="What this is about" options={reasons} value={f.reason} onChange={set("reason")} />
                  and the timing is
                  <Pick name="timeline" label="Timeline" options={timelines} value={f.timeline} onChange={set("timeline")} />
                  . The work
                  <Pick name="clearance" label="Clearance requirement" options={clearances} value={f.clearance} onChange={set("clearance")} />
                  a clearance. You can reach me at
                  <Blank name="email" label="Your email" placeholder="you@company.com" type="email" value={f.email} onChange={set("email")} required autoComplete="email" />
                  and there is more here:
                  <Blank name="link" label="Link to a job post or site, optional" placeholder="link (optional)" type="url" value={f.link} onChange={set("link")} />
                </p>

                <label htmlFor="message" className="kicker mt-12 block">
                  The details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={f.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="What you are building, what you need, what success looks like."
                  className="mt-3 block w-full max-w-4xl resize-y border-[3px] border-paper/50 bg-transparent p-4 text-xl text-paper placeholder:text-paper/45 focus:border-paper"
                />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex min-h-16 items-center gap-3 rounded-full bg-paper px-9 text-xl font-extrabold text-ink transition-[transform,border-radius,background-color] duration-300 hover:-translate-y-1 hover:rounded-xl hover:bg-ink hover:text-paper disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending" : "Send it"}
                    <ArrowUpRight size={22} aria-hidden className="transition-transform duration-300 group-hover:rotate-45" />
                  </button>
                  <p role="status" className="text-lg">
                    {status === "error" && (
                      <>
                        That did not send. Email{" "}
                        <a className="font-bold underline underline-offset-4" href={`mailto:${person.email}`}>
                          {person.email}
                        </a>{" "}
                        instead.
                      </>
                    )}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-24 flex flex-col gap-8 border-t border-paper/40 pt-6 md:flex-row md:items-end md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-lg font-bold">
            <li>
              <a className="inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline" href={`mailto:${person.email}`}>
                Email
              </a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline" href={person.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={18} aria-hidden />
              </a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline" href={person.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={18} aria-hidden />
              </a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline" href={person.resume} download>
                Resume <Download size={18} aria-hidden />
              </a>
            </li>
          </ul>
          <p className="kicker">
            {person.name} · {person.location} · {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </section>
  );
}
