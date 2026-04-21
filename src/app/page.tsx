"use client";

import { useEffect, useRef } from "react";

/* ============ data ============ */
type SkillCat = { tint: string; items: string[] };
type Project = {
  num: string;
  name: string;
  client: string;
  tags: string[];
  desc: string;
  visual: "liquid" | "nodes" | "waves" | "grid" | "constellation";
};
type XP = { role: string; co: string; loc: string; date: string; bullets: string[] };
type Cert = { id: string; name: string; tag: string };

const DATA: {
  skills: Record<string, SkillCat>;
  projects: Project[];
  experience: XP[];
  certs: Cert[];
} = {
  skills: {
    Languages: {
      tint: "oklch(0.72 0.2 285)",
      items: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "HTML5", "CSS3"],
    },
    Frontend: {
      tint: "oklch(0.78 0.17 220)",
      items: [
        "React.js",
        "Next.js 14",
        "React Native",
        "Tailwind",
        "shadcn/ui",
        "MUI",
        "Styled-Components",
        "Framer Motion",
      ],
    },
    "Backend & Data": {
      tint: "oklch(0.78 0.15 160)",
      items: [
        "Node.js",
        "Express",
        "FastAPI",
        "MongoDB",
        "MySQL",
        "Supabase",
        "Firebase",
        "Elasticsearch",
        "Prisma",
        "JWT",
      ],
    },
    "AI & LLM": {
      tint: "oklch(0.75 0.2 330)",
      items: [
        "Claude",
        "OpenAI",
        "OpenRouter",
        "Ollama",
        "vLLM",
        "RAG",
        "Vector Search",
        "Prompt Engineering",
        "AI Agents",
      ],
    },
    DevOps: {
      tint: "oklch(0.8 0.14 60)",
      items: [
        "Docker",
        "Compose",
        "Vercel",
        "Netlify",
        "CI/CD",
        "WebSocket",
        "Reverse Proxy",
        "AWS",
      ],
    },
    Craft: {
      tint: "oklch(0.75 0.1 20)",
      items: [
        "RBAC",
        "Secure Coding",
        "Role-Based Auth",
        "Design Systems",
        "Stripe",
        "Resend",
        "Cloudinary",
        "Expo",
      ],
    },
  },
  projects: [
    {
      num: "01",
      name: "Titanium Dolphin",
      client: "Enterprise AI Platform",
      tags: ["RAG", "On-Prem AI", "FastAPI", "React 18"],
      desc: "A 14-service containerized AI platform with Elasticsearch RAG pipelines and local LLM backends. React 18 SPA fronts FastAPI + Flask microservices with enterprise auth, serving five mission-critical tools across multiple directorates.",
      visual: "liquid",
    },
    {
      num: "02",
      name: "Fleet Command",
      client: "Real-time C2 Dashboard",
      tags: ["WebSocket", "MAVLink", "FastAPI", "Zustand"],
      desc: "A real-time multi-unit command dashboard supporting 12,000+ connected devices over MAVLink / WebSocket with sub-second telemetry. Hierarchical RBAC, automated routing, mission planning — FastAPI + React/TS, deployed on AWS.",
      visual: "nodes",
    },
    {
      num: "03",
      name: "PolyHQ",
      client: "Prediction Market Analytics",
      tags: ["Next.js 14", "Prisma", "Stripe", "LLM"],
      desc: "Real-time analytics for 1,800+ prediction markets with $2.4B+ in volume. WebSocket streaming, LLM-powered analysis, cross-market arbitrage detection, whale tracking, and a Stripe-based tiered subscription system.",
      visual: "waves",
    },
    {
      num: "04",
      name: "Vendor OS",
      client: "ERA Solutions",
      tags: ["Next.js", "MongoDB", "Chart.js", "JWT"],
      desc: "Full-stack vendor management and analytics platform. Secure admin / vendor portals, JWT auth, REST APIs, real-time performance metrics, and accessibility-focused responsive UI.",
      visual: "grid",
    },
    {
      num: "05",
      name: "Thirty-eight more.",
      client: "github.com/Jt-schofield1",
      tags: ["OSS", "Experiments", "Teaching"],
      desc: "A rolling archive of side quests, production forks, course material for the React students I mentor, and self-hosted LLM infra. Explore the full catalog on GitHub.",
      visual: "constellation",
    },
  ],
  experience: [
    {
      role: "Senior Data Analyst / Full Stack Engineer",
      co: "Iron Eagle X",
      loc: "Tampa, FL",
      date: "Sep 2025 — Present",
      bullets: [
        "<b>Lead development of 15+ AI-enabled applications</b> across secure enterprise environments.",
        "Architect on-prem AI systems integrating LLMs, RAG pipelines, automation workflows, and real-time data processing.",
        "Drive AI adoption across the organization — demonstrations, tooling, and enablement for leadership.",
        "Engineer real-time, mission-critical systems including multi-unit C2 platforms with WebSocket telemetry and RBAC.",
      ],
    },
    {
      role: "React.js Instructor",
      co: "COITB",
      loc: "Remote",
      date: "Jun 2025 — Present",
      bullets: [
        "Teach React fundamentals — JSX, hooks, state, routing, API integration — preparing students for certification and industry roles.",
        "Mentor through hands-on projects, code reviews, and personalized feedback to build job-ready portfolios.",
        "Collaborate with leadership to refine curriculum and integrate career readiness (resume, LinkedIn, GitHub).",
      ],
    },
    {
      role: "Freelance Full Stack Developer",
      co: "ERA Solutions / COITB",
      loc: "Remote",
      date: "2020 — Present",
      bullets: [
        "Built full-stack apps in Next.js, Tailwind, MongoDB, Chart.js — including a <b>Vendor Management Dashboard</b> for business analytics.",
        "Secure, scalable admin/vendor interfaces with JWT auth, REST APIs, real-time metrics, and accessibility-focused responsive UI.",
        "Cybersecurity best practices across React Hooks, SSR, SEO, and secure coding.",
      ],
    },
  ],
  certs: [
    { id: "#5938", name: "Professional JavaScript Developer", tag: "COITB" },
    { id: "#6009", name: "MySQL Backend Developer", tag: "COITB" },
    { id: "#6081", name: "HTML/CSS Web Designer", tag: "COITB" },
    { id: "#6145", name: "React.js Framework Developer", tag: "COITB" },
  ],
};

/* ============ project visuals (generative SVGs) ============ */
function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "liquid") {
    return (
      <svg
        viewBox="0 0 500 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="lg1" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#f4d7c7" />
            <stop offset="50%" stopColor="#e09a80" />
            <stop offset="100%" stopColor="#c4775a" />
          </radialGradient>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <rect width="500" height="400" fill="#fafaf7" />
        <g filter="url(#blur1)">
          <circle cx="200" cy="170" r="130" fill="url(#lg1)" opacity="0.9">
            <animate attributeName="cx" values="200;240;200" dur="9s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="240" r="100" fill="#d7e7f4" opacity="0.7">
            <animate attributeName="cy" values="240;200;240" dur="11s" repeatCount="indefinite" />
          </circle>
          <circle cx="250" cy="320" r="70" fill="#e0d4f7" opacity="0.6" />
        </g>
        <g transform="translate(250,200)" fill="none" stroke="#c4775a" strokeWidth="1" opacity="0.5">
          <circle r="60" />
          <circle r="90" />
          <circle r="120" />
        </g>
      </svg>
    );
  }

  if (kind === "nodes") {
    const nodes = Array.from({ length: 24 }, (_, i) => ({
      x: 60 + (i % 6) * 75,
      y: 60 + Math.floor(i / 6) * 75,
    }));
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 110) edges.push([i, j]);
      }
    }
    return (
      <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#fafaf7" />
        <g stroke="#e7e5df" strokeWidth="1">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
            />
          ))}
        </g>
        <g>
          {nodes.map((n, i) => {
            const r = i % 4 === 0 ? 6 : 3;
            const r2 = i % 4 === 0 ? 8 : 5;
            return (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={r}
                fill={i % 4 === 0 ? "#c4775a" : "#9a9a9a"}
              >
                <animate
                  attributeName="r"
                  values={`${r};${r2};${r}`}
                  dur={`${3 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>
      </svg>
    );
  }

  if (kind === "waves") {
    const lines: string[] = [];
    for (let i = 0; i < 14; i++) {
      let path = `M 0 ${60 + i * 22}`;
      for (let x = 0; x <= 500; x += 14) {
        const y = 60 + i * 22 + Math.sin(x * 0.02 + i * 0.4) * 10;
        path += ` L ${x} ${y}`;
      }
      lines.push(path);
    }
    return (
      <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#fafaf7" />
        <g fill="none" strokeWidth="1.2">
          {lines.map((p, i) => (
            <path
              key={i}
              d={p}
              stroke={i < 7 ? "#c4775a" : "#6b6b6b"}
              opacity={0.25 + i * 0.05}
            />
          ))}
        </g>
      </svg>
    );
  }

  if (kind === "grid") {
    const cells: { x: number; y: number; h: number }[] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 12; x++) {
        const h = Math.abs(Math.sin(x * 0.4 + y * 0.3)) * 0.85 + 0.15;
        cells.push({ x, y, h });
      }
    }
    return (
      <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#fafaf7" />
        <g transform="translate(30,40)">
          {cells.map((c, i) => {
            const isAccent = (c.x + c.y) % 5 === 0;
            return (
              <rect
                key={i}
                x={c.x * 36}
                y={c.y * 36 + (1 - c.h) * 18}
                width={32}
                height={32 * c.h}
                fill={isAccent ? "#c4775a" : "#e7e5df"}
                rx={4}
              />
            );
          })}
        </g>
      </svg>
    );
  }

  // constellation — deterministic so SSR matches client
  const frac = (n: number) => n - Math.floor(n);
  const pts = Array.from({ length: 30 }, (_, i) => ({
    x: 30 + frac(Math.sin(i * 12.9898) * 43758.5453) * 440,
    y: 30 + frac(Math.sin(i * 78.233) * 43758.5453) * 340,
    r: 2 + frac(Math.sin(i * 39.346) * 43758.5453) * 3,
    dur: 2 + frac(Math.sin(i * 4.321 + 1.7) * 43758.5453) * 3,
    delay: frac(Math.sin(i * 91.0) * 43758.5453) * 3,
  }));
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="400" fill="#fafaf7" />
      <g stroke="#e7e5df" strokeWidth="0.8">
        {pts.slice(0, -1).map((p, i) => {
          const n = pts[i + 1];
          return <line key={i} x1={p.x} y1={p.y} x2={n.x} y2={n.y} />;
        })}
      </g>
      <g>
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={i % 4 === 0 ? "#c4775a" : "#6b6b6b"}
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${p.dur}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
}

/* ============ page ============ */
export default function Page() {
  const navRef = useRef<HTMLElement | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  // nav scroll state
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // chat typing loop
  useEffect(() => {
    const body = chatBodyRef.current;
    if (!body) return;
    const script: { who: "user" | "ai"; text: string }[] = [
      { who: "user", text: "What do you build, James?" },
      {
        who: "ai",
        text:
          "Enterprise AI platforms, real-time dashboards, and prediction-market analytics. Full stack — React, Next.js, FastAPI, Ollama, all of it.",
      },
      { who: "user", text: "On-prem LLMs?" },
      {
        who: "ai",
        text:
          "Yes — 14-service Docker stacks with local models, RAG over Elasticsearch, and tiered RBAC. Happy to walk through the architecture.",
      },
    ];
    let idx = 0;
    let cancelled = false;
    let typeTimer: ReturnType<typeof setInterval> | null = null;
    let nextTimer: ReturnType<typeof setTimeout> | null = null;

    function addNext() {
      if (cancelled || !body) return;
      if (idx >= script.length) {
        nextTimer = setTimeout(() => {
          if (cancelled || !body) return;
          body.innerHTML = "";
          idx = 0;
          addNext();
        }, 5000);
        return;
      }
      const s = script[idx++];
      const row = document.createElement("div");
      row.className = `msg ${s.who}`;
      row.innerHTML = `
        <div class="avatar">${s.who === "user" ? "JS" : "✦"}</div>
        <div class="bubble"><span class="typetext"></span>${
          s.who === "ai" ? '<span class="cursor"></span>' : ""
        }</div>
      `;
      body.appendChild(row);
      const scrollToEnd = () => {
        body.scrollTop = body.scrollHeight;
      };
      scrollToEnd();
      const target = row.querySelector(".typetext") as HTMLElement | null;
      const cursor = row.querySelector(".cursor") as HTMLElement | null;
      if (!target) return;
      if (s.who === "user") {
        target.textContent = s.text;
        scrollToEnd();
        nextTimer = setTimeout(addNext, 600);
      } else {
        let i = 0;
        const speed = 18;
        typeTimer = setInterval(() => {
          target.textContent = s.text.slice(0, ++i);
          scrollToEnd();
          if (i >= s.text.length) {
            if (typeTimer) clearInterval(typeTimer);
            typeTimer = null;
            if (cursor) cursor.style.display = "none";
            nextTimer = setTimeout(addNext, 900);
          }
        }, speed);
      }
    }
    nextTimer = setTimeout(addNext, 600);
    return () => {
      cancelled = true;
      if (typeTimer) clearInterval(typeTimer);
      if (nextTimer) clearTimeout(nextTimer);
      if (body) body.innerHTML = "";
    };
  }, []);

  // reveal-on-scroll + counter animations
  useEffect(() => {
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            revealIO.unobserve(en.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealIO.observe(el));
    };
    observeAll();
    const t1 = setTimeout(observeAll, 50);
    const t2 = setTimeout(observeAll, 300);

    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const el = en.target as HTMLElement;
          if (!en.isIntersecting || el.dataset.done) return;
          el.dataset.done = "1";
          const target = parseFloat(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          const start = performance.now();
          const dur = 1200;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            const cur = target * eased;
            el.textContent =
              (target >= 1000
                ? Math.round(cur).toLocaleString()
                : cur % 1 === 0
                ? Math.round(cur).toString()
                : cur.toFixed(1)) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      revealIO.disconnect();
      counterIO.disconnect();
    };
  }, []);

  // live clock (ET)
  useEffect(() => {
    const el = document.getElementById("live-time");
    if (!el) return;
    const tick = () => {
      const d = new Date();
      el.textContent =
        d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/New_York",
        }) + " ET";
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <nav className="nav" ref={navRef}>
        <a href="#top" className="nav-logo">
          <span className="mark"></span>
          <span>James Schofield</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
          <a href="#path">Path</a>
          <a href="#credentials">Credentials</a>
        </div>
        <div className="nav-right">
          <a href="#contact" className="nav-cta">
            Get in touch
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="hero" id="top" data-screen-label="01 Hero">
        <a href="#work" className="hero-eyebrow">
          <span className="dot"></span>
          <span>Open to work · Tampa, FL</span>
          <span className="arrow">→</span>
        </a>

        <h1>
          Full-stack software, designed and <em>shipped end-to-end.</em>
        </h1>

        <p className="hero-sub">
          I&apos;m James — a full-stack developer and AI engineer based in Tampa. I build
          production React, Next.js, and on-prem LLM systems for enterprise teams, and
          teach the craft to the next wave of developers on the side.
        </p>

        <div className="hero-cta-row">
          <a href="#work" className="btn btn-primary">
            See recent work →
          </a>
          <a href="#contact" className="btn btn-secondary">
            Start a project
          </a>
        </div>

        <div className="hero-visual reveal">
          <div className="aurora"></div>
          <div className="chat-preview">
            <div className="chat-head">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="title">Claude · What does James build?</div>
            </div>
            <div className="chat-body" id="chat-body" ref={chatBodyRef}></div>
          </div>
        </div>
      </header>

      {/* ===== TRUST ===== */}
      <div className="trust-row">
        <div className="lbl">Trusted stack across every project</div>
        <div className="trust-logos">
          <span>TypeScript</span>
          <span>React</span>
          <span>Next.js</span>
          <span>FastAPI</span>
          <span>Ollama</span>
          <span>Elasticsearch</span>
          <span>Docker</span>
          <span>AWS</span>
        </div>
      </div>

      {/* ===== FEATURE GRID (ABOUT / CAPABILITIES) ===== */}
      <section id="about" data-screen-label="02 About">
        <div className="section-head reveal">
          <div className="section-eyebrow">Overview</div>
          <h2>
            A builder who <em>teaches</em>—
            <br />
            and an engineer who ships.
          </h2>
          <p className="desc">
            Five years of production work across frontend, backend, infra, and AI. A B.S.
            in Cyber Security, a minor in Data Science, and a weekly class full of future
            developers. Here&apos;s what that looks like in practice.
          </p>
        </div>

        <div className="feature-grid">
          <div className="card big reveal">
            <div>
              <div className="tag">Flagship — Enterprise AI</div>
              <h3>On-prem AI systems, built to ship.</h3>
              <p className="card-desc">
                Local LLM hosting with Ollama and vLLM, Elasticsearch vector search, RAG
                pipelines, and 14-service Docker stacks — architected and deployed
                end-to-end for secure enterprise environments.
              </p>
              <div className="flow-diagram">
                <span className="flow-node">Client</span>
                <span className="flow-arrow">→</span>
                <span className="flow-node">React SPA</span>
                <span className="flow-arrow">→</span>
                <span className="flow-node">FastAPI</span>
                <span className="flow-arrow">→</span>
                <span className="flow-node accent">Ollama · vLLM</span>
              </div>
            </div>
            <div>
              <div className="counter-widget">
                <div className="row">
                  <span className="k">Production apps shipped</span>
                  <span className="v">
                    <span data-count="15" data-suffix="+">
                      0
                    </span>
                  </span>
                </div>
                <div className="row">
                  <span className="k">Years shipping</span>
                  <span className="v">
                    <span data-count="5" data-suffix="+">
                      0
                    </span>
                  </span>
                </div>
                <div className="row">
                  <span className="k">Markets tracked live</span>
                  <span className="v">
                    <span data-count="1800" data-suffix="+">
                      0
                    </span>
                  </span>
                </div>
                <div className="row">
                  <span className="k">Public repos</span>
                  <span className="v">
                    <span data-count="38">0</span>
                  </span>
                </div>
                <div className="row">
                  <span className="k">Status</span>
                  <span className="v">
                    <span className="green">● Open to work</span>
                  </span>
                </div>
                <div className="row">
                  <span className="k">Local time</span>
                  <span className="v" id="live-time">
                    —
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card reveal">
            <div className="tag">Teaching</div>
            <h3>React instructor at COITB.</h3>
            <p className="card-desc">
              Weekly cohorts, curriculum input, code reviews, and career-readiness
              mentorship — JSX, hooks, routing, API integration, deploy.
            </p>
            <div className="card-visual">
              <div className="visual-stack">
                <div className="stack-row">
                  <span className="stack-pill accent">JSX</span>
                  <span className="stack-pill">Hooks</span>
                  <span className="stack-pill">State</span>
                  <span className="stack-pill">Routing</span>
                </div>
                <div className="stack-row">
                  <span className="stack-pill">API</span>
                  <span className="stack-pill accent">Deploy</span>
                  <span className="stack-pill">Portfolio</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card dark reveal">
            <div className="tag">Craft</div>
            <h3>Secure by default.</h3>
            <p className="card-desc">
              Cyber-security trained. Role-based access control, JWT, secure coding,
              accessibility, performance — baked in from day one.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <div id="work" data-screen-label="03 Work">
        <section style={{ paddingBottom: 40 }}>
          <div className="section-head reveal">
            <div className="section-eyebrow">Selected Work</div>
            <h2>
              Things I&apos;ve <em>shipped</em>.
            </h2>
            <p className="desc">
              A rolling sample of production deployments — from containerized AI platforms
              to real-time dashboards to analytics over billion-dollar markets.
            </p>
          </div>
        </section>
        <div id="projects-container">
          {DATA.projects.map((p) => (
            <div className="project-block" key={p.num}>
              <div className="project-text">
                <div className="num">{p.num} — Project</div>
                <div className="tagline">{p.client}</div>
                <h3>{p.name}</h3>
                <p className="desc">{p.desc}</p>
                <div className="project-meta">
                  {p.tags.map((t) => (
                    <span key={t} className="m">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-image">
                <ProjectVisual kind={p.visual} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== STACK ===== */}
      <section id="stack" data-screen-label="04 Stack">
        <div className="section-head reveal">
          <div className="section-eyebrow">Toolkit</div>
          <h2>
            A stack, <em>by rotation.</em>
          </h2>
          <p className="desc">
            What I reach for, grouped by where it lives in the build. Front to back, edge
            to model.
          </p>
        </div>
        <div className="skills-grid">
          {Object.entries(DATA.skills).map(([cat, obj]) => (
            <div className="skill-cat" key={cat}>
              <h4>{cat}</h4>
              <div className="count">{obj.items.length} tools</div>
              <ul>
                {obj.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PATH / EXPERIENCE ===== */}
      <section id="path" data-screen-label="05 Path">
        <div className="section-head reveal">
          <div className="section-eyebrow">Career</div>
          <h2>
            Where I&apos;ve <em>been</em>.
          </h2>
          <p className="desc">A compressed record — the roles, the stack, the outcomes.</p>
        </div>
        <div className="xp-list">
          {DATA.experience.map((e) => (
            <div className="xp-item" key={`${e.co}-${e.role}`}>
              <div className="xp-date">{e.date}</div>
              <div className="xp-head">
                <div className="co">{e.co}</div>
                <h4>{e.role}</h4>
                <div className="loc">{e.loc}</div>
              </div>
              <div className="xp-body">
                <ul>
                  {e.bullets.map((b, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CREDENTIALS ===== */}
      <section id="credentials" data-screen-label="06 Credentials">
        <div className="section-head reveal">
          <div className="section-eyebrow">Credentials</div>
          <h2>
            Studied, tested, <em>certified.</em>
          </h2>
          <p className="desc">
            Formal training paired with the certifications I hand my students as a
            roadmap.
          </p>
        </div>

        <div className="edu-split">
          <div className="edu-card reveal">
            <h4>B.S. Cyber Security</h4>
            <div className="sub">Minor in Data Science · 2021 — 2025</div>
            <div className="school">Mercyhurst University · Erie, PA</div>
            <ul>
              <li>Dean&apos;s List — Spring 2025, Fall 2024, Spring 2024, Spring 2023</li>
              <li>Cyber Security &amp; Data Science Club member, 2022 to present</li>
              <li>Full-Stack Web Development coursework · ERA Solutions</li>
            </ul>
          </div>
          <div className="edu-card reveal">
            <h4>Community</h4>
            <div className="sub">Volunteer · Ongoing</div>
            <div className="school">Giving time where it matters.</div>
            <ul>
              <li>
                <b>Elmwood Gardens Retirement Home</b> — supporting residents and staff
                operations
              </li>
              <li>
                <b>Metropolitan Ministries</b> — serving food and providing safe community
                space
              </li>
              <li>Mentor to transitioning developers through COITB</li>
            </ul>
          </div>
        </div>

        <div className="certs-grid">
          {DATA.certs.map((c) => (
            <div className="cert-card" key={c.id}>
              <div className="id">{c.id}</div>
              <div className="name">{c.name}</div>
              <div className="tag">{c.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <div className="cta-strip reveal">
        <div className="cta-strip-inner">
          <h2>
            Have something you need built <em>well</em>?
          </h2>
          <p>
            Open to full-time, contract, and advisory work — React, Next.js, FastAPI, AI.
            Based in Tampa, available anywhere.
          </p>
          <div className="hero-cta-row" style={{ marginTop: 0 }}>
            <a href="mailto:jamesschofield7789@gmail.com" className="btn btn-primary">
              Email James
            </a>
            <a
              href="https://github.com/Jt-schofield1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              See code
            </a>
          </div>
        </div>
      </div>

      {/* ===== CONTACT ===== */}
      <section className="contact-block" id="contact" data-screen-label="07 Contact">
        <div className="section-head reveal">
          <div className="section-eyebrow">Contact</div>
          <h2>
            The <em>direct</em> lines.
          </h2>
        </div>
        <div className="contact-grid reveal">
          <a className="contact-row" href="mailto:jamesschofield7789@gmail.com">
            <span className="k">Email</span>
            <span className="v">jamesschofield7789@gmail.com</span>
            <span className="arrow">→</span>
          </a>
          <a className="contact-row" href="tel:+18146369610">
            <span className="k">Phone</span>
            <span className="v">+1 814 636 9610</span>
            <span className="arrow">→</span>
          </a>
          <div className="contact-row">
            <span className="k">Based</span>
            <span className="v">Tampa, FL</span>
            <span className="arrow">●</span>
          </div>
          <a
            className="contact-row"
            href="https://github.com/Jt-schofield1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">GitHub</span>
            <span className="v">github.com/Jt-schofield1</span>
            <span className="arrow">→</span>
          </a>
          <a
            className="contact-row"
            href="https://www.linkedin.com/in/james-schofield1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">LinkedIn</span>
            <span className="v">linkedin.com/in/james-schofield1</span>
            <span className="arrow">→</span>
          </a>
          <a className="contact-row" href="https://jamesschofield.com">
            <span className="k">Portfolio</span>
            <span className="v">jamesschofield.com</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <footer>
        <div>© 2026 James Schofield</div>
        <div className="right">
          <span>Built in-browser</span>
          <span>v3.0</span>
        </div>
      </footer>
    </>
  );
}
