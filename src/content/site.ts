export const person = {
  name: "James Schofield",
  age: 23,
  location: "Tampa, Florida",
  email: "jamesschofield7789@gmail.com",
  github: "https://github.com/Jt-schofield1",
  linkedin: "https://www.linkedin.com/in/james-schofield1",
  resume: "/resume/James-Schofield-Resume.pdf",
};

export type Stop = { age: number; year: string; title: string; text: string };

// When the age changes, add a stop here and bump person.age. Nothing else needs to move.
export const stops: Stop[] = [
  {
    age: 17,
    year: "2020",
    title: "First paying client. Before the first college class.",
    text: "Starts shipping full-stack work for ERA Solutions: Next.js, MongoDB, real dashboards for real businesses.",
  },
  {
    age: 18,
    year: "2021",
    title: "Starts a Cyber Security degree. Keeps the clients.",
    text: "Mercyhurst University by day. Coding courses and freelance builds every hour around it.",
  },
  {
    age: 19,
    year: "2022",
    title: "Enlists in the U.S. Navy Reserve.",
    text: "Cryptologic Technician in signals intelligence. School and client work do not slow down.",
  },
  {
    age: 20,
    year: "2023",
    title: "Courses. Certifications. Client work. Repeat.",
    text: "Dean's List while stacking developer certifications and shipping projects people actually use.",
  },
  {
    age: 21,
    year: "2024",
    title: "Real projects for real businesses.",
    text: "Dean's List twice more. A growing book of production sites, dashboards, and tools built freelance.",
  },
  {
    age: 22,
    year: "2025",
    title: "Graduates. Teaches React to veterans. Joins a Special Operations AI program.",
    text: "B.S. in Cyber Security, minor in Data Science. Then 15+ secure applications delivered across air-gapped networks.",
  },
  {
    age: 23,
    year: "2026 · Now",
    title: "Leads engineering on an AI platform for U.S. Special Operations.",
    text: "Senior Full Stack Engineer and technical lead. 20+ production apps. Co-founder of two companies. Not close to done.",
  },
];

export type Stat = { value: number; prefix?: string; suffix?: string; text?: string; label: string };

export const proof: Stat[] = [
  { value: 20, suffix: "+", label: "Production applications led for SOCCENT" },
  { value: 14, label: "Services in the on-prem AI platform" },
  { value: 0, text: "Millions", label: "Saved for the government by building open-source apps instead of buying vendor-locked software" },
  { value: 2, label: "Companies co-founded" },
  { value: 40, suffix: "+", label: "Repositories on GitHub" },
  { value: 0, text: "TS/SCI", label: "Active clearance with CI polygraph" },
];

export type Visual = "platform" | "fleet" | "coach" | "studio";

export type Product = { name: string; text: string; url?: string };

export type CaseStudy = {
  id: string;
  name: string;
  kicker: string;
  role: string;
  year: string;
  blurb: string;
  story: string[];
  stats: { value: string; label: string }[];
  stack: string[];
  links: { label: string; url: string }[];
  visual: Visual;
  products?: Product[];
  note?: string;
};

export const work: CaseStudy[] = [
  {
    id: "soccentgpt",
    name: "SOCCENTGPT",
    kicker: "Defense · AI platform",
    role: "Lead architect and technical lead",
    year: "2025 – Now",
    blurb: "A 14-service AI platform running entirely on-prem, across air-gapped networks.",
    story: [
      "SOCCENTGPT, built under the Titanium Dolphin program, puts large language models to work inside U.S. Special Operations Command Central with no cloud to lean on. Everything runs on-prem: a React 18 front end, FastAPI and Flask services, Elasticsearch retrieval pipelines, and locally hosted models, deployed with one command.",
      "James leads its architecture and delivery end to end: system design, data modeling, API contracts, UI architecture, and the release pipeline that carries each build from one security domain to the next with full parity.",
      "The platform and the application portfolio built on it anchored the technical proposal that helped secure the SOCCENT CDAO contract. He plans new applications directly with directorate stakeholders, reviews every pull request on the team, and briefs senior leadership on what the technology can and cannot do.",
    ],
    stats: [
      { value: "20+", label: "Production applications" },
      { value: "14", label: "Containerized services" },
      { value: "5", label: "Mission tools across J-code directorates" },
      { value: "2", label: "Air-gapped networks, one codebase" },
    ],
    stack: ["React 18", "TypeScript", "FastAPI", "Flask", "Elasticsearch RAG", "Ollama", "Docker Compose", "CAC / LDAP / Entra ID", "Hierarchical RBAC"],
    links: [],
    visual: "platform",
    note: "Details are limited to what is publicly releasable. No screenshots by design.",
  },
  {
    id: "drone-c2",
    name: "Drone C2",
    kicker: "Defense · Real-time systems",
    role: "Architect and lead engineer",
    year: "2025 – Now",
    blurb: "Multi-drone command and control with sub-second telemetry.",
    story: [
      "A real-time command and control web application for large-scale unmanned aircraft operations. It speaks MAVLink to the aircraft over WebSocket-bridged serial links and puts the whole fleet on one live map.",
      "Access is hierarchical: administrators, tactical commanders, and operators each see and control exactly what their role and team allow, with drones assigned to operators automatically. Many people run it at the same time without stepping on each other.",
      "Mission planning, live GPS tracking, and team coordination happen in a single interface, so a commander can manage distributed teams and assets from one screen.",
    ],
    stats: [
      { value: "12,000+", label: "UAS fleet operations supported" },
      { value: "<1s", label: "Telemetry latency" },
      { value: "3", label: "Tier role hierarchy" },
      { value: "1", label: "Interface for the whole fleet" },
    ],
    stack: ["FastAPI", "Python", "React", "TypeScript", "Zustand", "MAVLink", "WebSocket", "Docker Compose", "AWS", "CI/CD"],
    links: [],
    visual: "fleet",
    note: "Details are limited to what is publicly releasable. No screenshots by design.",
  },
  {
    id: "coachvana",
    name: "CoachVana",
    kicker: "Co-founder · SaaS · Web, iOS, Android",
    role: "Co-founder, product and engineering lead",
    year: "2026",
    blurb: "The all-in-one platform for fitness coaches. Live on the App Store and Google Play.",
    story: [
      "Coaches run their business out of five apps that do not talk to each other. CoachVana replaces them with one: client CRM, program building, check-ins, messaging, payments, groups and courses, a public page and marketplace, and native nutrition logging with a catalogue of over 400,000 foods.",
      "Coaches work on the web; clients live on their phones. Both are first-class. Gyms and multi-coach companies get their own consoles on the same foundation, and coaches can drive the whole account from Claude through a connector with more than 300 tools.",
      "It is a product of Tampa Bay AI Solutions, the company James co-founded. He sets the product direction and wrote most of the code: roughly 69% of nearly 1,500 commits since the first one in July 2026. Coaches keep 100% of what they sell.",
    ],
    stats: [
      { value: "755", label: "Database migrations" },
      { value: "211", label: "Web pages" },
      { value: "306", label: "Mobile routes" },
      { value: "321", label: "Tools in the Claude connector" },
    ],
    stack: ["Next.js 16", "React 19", "Expo", "React Native", "Supabase", "Postgres RLS", "Edge Functions", "Turborepo", "TanStack Query", "Zod", "Playwright", "MCP"],
    links: [{ label: "coachvana.com", url: "https://www.coachvana.com" }],
    visual: "coach",
  },
  {
    id: "evocatio",
    name: "Evocatio Innovations",
    kicker: "Co-founder · Software studio",
    role: "Co-founder",
    year: "2026",
    blurb: "A small studio that ships full platforms: staffing, marketplaces, nightlife.",
    story: [
      "Evocatio Innovations builds custom software, mobile apps, and AI tools. It was started by engineers who built systems that were not allowed to fail, and it takes its name from the Roman evocati: veterans called back because the job needed them.",
      "James co-founded the studio. The work below was shipped by its team, for clients and for itself.",
    ],
    stats: [
      { value: "5", label: "Platforms shipped" },
      { value: "50", label: "States covered by the staffing platform" },
      { value: "3", label: "SkyBridge brands on one pattern" },
      { value: "2", label: "Two-sided marketplaces" },
    ],
    stack: ["Next.js", "React Native", "Expo", "Supabase", "Stripe Connect", "Three.js", "Tailwind"],
    links: [{ label: "evocatioinnovations.com", url: "https://evocatioinnovations.com" }],
    visual: "studio",
    products: [
      {
        name: "SkyBridge Healthcare",
        text: "Full rebrand, new website, and a mobile app for a national healthcare staffing firm placing clinicians in all 50 states. Clinicians find jobs, apply, manage credentials, and onboard from their phone.",
        url: "https://skybridgehealthcare.com",
      },
      {
        name: "SkyBridge Aviation",
        text: "The same staffing platform, rebuilt for aviation: pilots, crew, and specialists.",
        url: "https://skybridgeaviation.com",
      },
      {
        name: "SkyBridge Resources",
        text: "Web and mobile staffing platform for SkyBridge's recruiting arm, on the same pattern.",
      },
      {
        name: "Showplate",
        text: "A marketplace connecting restaurants with content creators. Post a brief, funds are held, and you pay for work that delivers.",
        url: "https://showplate.co",
      },
      {
        name: "WhereTo",
        text: "Real-time nightlife for Tampa and St. Pete: a live bar map with wait, cover, and vibe reports, plus a paid dashboard for bar owners.",
        url: "https://wheretotpa.com",
      },
    ],
  },
];

export type CompanyProduct = { name: string; text: string; caseId?: string; url?: string };

export const companies: { name: string; role: string; text: string; products: CompanyProduct[] }[] = [
  {
    name: "Tampa Bay AI Solutions",
    role: "Co-founder",
    text: "Bespoke AI and software, and the company behind CoachVana.",
    products: [
      { name: "CoachVana", text: "All-in-one coaching platform. Web, iOS, Android.", caseId: "coachvana" },
      { name: "Crewsteer", text: "Operating system for the trades. Pre-launch.", url: "https://crewsteer.com" },
    ],
  },
  {
    name: "Evocatio Innovations",
    role: "Co-founder",
    text: "A software studio for systems that are not allowed to fail.",
    products: [
      { name: "SkyBridge Healthcare", text: "Healthcare staffing, 50 states.", caseId: "evocatio" },
      { name: "SkyBridge Aviation", text: "Aviation staffing.", caseId: "evocatio" },
      { name: "SkyBridge Resources", text: "Recruiting platform.", caseId: "evocatio" },
      { name: "Showplate", text: "Restaurants meet creators.", caseId: "evocatio" },
    ],
  },
];

export type Group = "Products" | "AI & data" | "Client sites" | "Early work";
export const groups: Group[] = ["Products", "AI & data", "Client sites", "Early work"];

export type Row = { name: string; type: string; year: string; group: Group; url?: string; img?: string };

const img = (f: string) => `/images/projects/${f}`;
const live = (f: string) => `/images/projects/live/${f}`;

export const index: Row[] = [
  { name: "Crewsteer", type: "Field-service operating system for the trades. Built and verified end to end, pre-launch.", year: "2026", group: "Products", url: "https://crewsteer.com", img: live("crewsteer.webp") },
  { name: "WhereTo", type: "Real-time nightlife for Tampa and St. Pete. First paid bar subscription September 2026.", year: "2026", group: "Products", url: "https://wheretotpa.com", img: live("whereto.webp") },
  { name: "Tampa STAR Network", type: "Member platform pairing transitioning Special Operations members with Tampa Bay mentors. Team build.", year: "2026", group: "Products", url: "https://star-network.vercel.app", img: live("tampa-star-network.webp") },
  { name: "TimePilotHQ", type: "AI-powered employee scheduling for small businesses.", year: "2026", group: "Products", url: "https://www.timepilothq.com", img: live("timepilothq.webp") },
  { name: "Leads4Us", type: "AI lead intelligence and outreach SaaS.", year: "2026", group: "Products", url: "https://www.leads4us.com", img: live("leads4us.webp") },
  { name: "BuildFax", type: "Construction intelligence: builder reliability scores from public permit data.", year: "2026", group: "Products" },
  { name: "Iron Aesthetics", type: "Headless Shopify storefront on Next.js.", year: "2026", group: "Products", url: "https://www.ironaestheticsapparel.com", img: live("iron-aesthetics.webp") },
  { name: "Vendor Dash", type: "Vendor management and analytics dashboard for ERA Solutions.", year: "2020 – 26", group: "Products", img: img("vendor-dashboard.png") },

  { name: "SENTINEL", type: "Federal fraud detection across 83,842 exclusion records, built only on public data. No invented accuracy score.", year: "2026", group: "AI & data" },
  { name: "PolyHQ", type: "Prediction market analytics across 1,800+ markets and $2.4B+ in volume.", year: "2026", group: "AI & data", url: "https://www.polyhq.net", img: live("polyhq.webp") },
  { name: "Agentic CRM", type: "Lead-enrichment agents with a custom MCP search server. Tampa Bay AI Solutions prototype.", year: "2026", group: "AI & data" },
  { name: "FL Biz Intel", type: "Florida business intelligence: ingestion and enrichment of state filings.", year: "2025", group: "AI & data" },
  { name: "MathWiz AI Tutor", type: "MathWiz Academy: an AI math tutor for kids.", year: "2025", group: "AI & data", url: "https://mathwizaitutor.vercel.app", img: live("mathwiz-ai-tutor.webp") },
  { name: "Financial Pulse", type: "Stock and crypto dashboard with AI market predictions.", year: "2025", group: "AI & data", img: img("financial-pulse.png") },
  { name: "Daycare Chatbot", type: "Python chatbot for a daycare center.", year: "2025", group: "AI & data", img: img("daycare-chatbot.png") },

  { name: "Joey B Coaching", type: "Marketing and lead-generation site for a fitness coach.", year: "2026", group: "Client sites", url: "https://www.joeybcoaching.com", img: live("joey-b-coaching.webp") },
  { name: "Eternal Form Coaching", type: "Online fitness coaching site.", year: "2026", group: "Client sites", url: "https://www.eternalform.net", img: live("eternal-form-coaching.webp") },
  { name: "Posed By Glantz", type: "Posing-coaching site with a custom art direction.", year: "2026", group: "Client sites", url: "https://www.posedbyglantz.com", img: live("posed-by-glantz.webp") },
  { name: "Flickz With Fitz", type: "Photography portfolio.", year: "2026", group: "Client sites", url: "https://www.flickzwithfitz.com", img: live("flickz-with-fitz.webp") },
  { name: "Tom Torrance Heating & Cooling", type: "Business site for an HVAC company.", year: "2026", group: "Client sites", url: "https://www.tomtorranceheatingcooling.com", img: live("tom-torrance-heating-and-cooling.webp") },
  { name: "Little Acorns Learning Center", type: "Licensed childcare and early learning center in Erie, PA.", year: "2026", group: "Client sites", url: "https://www.littleacornslearningcenter.com", img: live("little-acorns-learning-center.webp") },
  { name: "Stone Quarry Sealing", type: "Asphalt sealcoating and repair in Northwest PA.", year: "2026", group: "Client sites", url: "https://www.stonequarrysealing.com", img: live("stone-quarry-sealing.webp") },
  { name: "Climb Athletics", type: "Football training programs, with maps and booking.", year: "2026", group: "Client sites", url: "https://climb-athletics.vercel.app", img: live("climb-athletics.webp") },
  { name: "DLB Elite", type: "Training site with Calendly booking and lead capture.", year: "2026", group: "Client sites", url: "https://dlbelite.com", img: img("dlb-elite.png") },
  { name: "Mesa Marie Photography", type: "Photography portfolio.", year: "2026", group: "Client sites", url: "https://www.mesamariephotography.com", img: live("mesa-marie-photography.webp") },
  { name: "Leach Construction", type: "Licensed general contractor in Titusville, PA.", year: "2026", group: "Client sites", url: "https://leach-construction-pearl.vercel.app", img: live("leach-construction.webp") },
  { name: "Adjacent Property Management", type: "Landscaping and property maintenance in Rochester, NY.", year: "2026", group: "Client sites", url: "https://adjacentpm.com", img: live("adjacent-property-management.webp") },
  { name: "Rochester Foam Dart League", type: "League site.", year: "2025", group: "Client sites", url: "https://www.rochesterfoamdartleague.com", img: live("rochester-foam-dart-league.webp") },
  { name: "French Creek Canoe", type: "Trading post site: rentals, lodging, vendors.", year: "2025", group: "Client sites", url: "https://www.frenchcreekcanoe.com", img: live("french-creek-canoe.webp") },
  { name: "Financial Advisor", type: "Services and appointment booking site.", year: "2025", group: "Client sites", img: img("financial-advisor.png") },

  { name: "Tax Smartbook", type: "Invoices, expenses, deductions, and a yearly tax estimate.", year: "2025", group: "Early work", img: img("smartbook.png") },
  { name: "PeerSwipe", type: "Mobile app for finding peers with shared interests.", year: "2025", group: "Early work", img: img("peerswipe.png") },
  { name: "React To-Do", type: "The to-do list everyone builds. Then rebuilt in TypeScript.", year: "2025", group: "Early work", img: img("react-todo.png") },
  { name: "Freelance Landing Page", type: "HTML, CSS, JavaScript. Where it started.", year: "2025", group: "Early work", img: img("freelance-landing.png") },
  { name: "Filter Project", type: "Vanilla JavaScript filtering exercise.", year: "2025", group: "Early work", img: img("filter-project.png") },
];

export type Job = { role: string; org: string; place: string; dates: string; points: string[] };

export const record: Job[] = [
  {
    role: "Senior Full Stack Engineer",
    org: "Iron Eagle X · IDST",
    place: "Tampa, FL",
    dates: "May 2026 – Now",
    points: [
      "Leads architecture and delivery of 20+ production applications for SOCCENT across air-gapped NIPR and SIPR environments.",
      "Played a key role in GDIT securing the SOCCENT CDAO contract by building and demonstrating the platform that anchored the proposal.",
      "Technical lead: reviews every pull request, sets standards, mentors engineers on React, TypeScript, FastAPI, and containerized deployment.",
      "Owns the release pipeline across security domains and briefs senior leadership on roadmaps and trade-offs.",
    ],
  },
  {
    role: "Senior Data Analyst",
    org: "Iron Eagle X · IDST",
    place: "Tampa, FL",
    dates: "Sep 2025 – May 2026",
    points: [
      "Designed secure on-prem AI infrastructure: local LLM hosting, Elasticsearch vector search, multi-modal inference with no cloud dependency.",
      "Engineered a 14-container pipeline that deploys with one command and keeps NIPR and SIPR in parity.",
      "Delivered 15+ secure applications supporting SOCCENT J2 operations, including multi-drone C2 platforms.",
      "Drove AI adoption across SOCOM and supported positioning for new contract vehicles.",
    ],
  },
  {
    role: "Cryptologic Technician (Technical)",
    org: "United States Navy Reserve",
    place: "CWG-6 Detroit",
    dates: "Jun 2022 – Now",
    points: [
      "Supports signals intelligence operations as an active reservist.",
      "Coordinates operations while managing readiness of 15+ sailors.",
      "Holds an active DoD TS/SCI clearance with CI polygraph.",
    ],
  },
  {
    role: "React.js Instructor",
    org: "COITB",
    place: "Remote",
    dates: "Jun 2025 – Sep 2025",
    points: [
      "Taught React fundamentals to transitioning military and veterans, preparing them for certification and industry roles.",
      "Mentored students through hands-on projects, code review, and portfolio building.",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    org: "ERA Solutions · COITB",
    place: "Remote",
    dates: "Jun 2020 – Sep 2025",
    points: [
      "Built and maintained full-stack applications with Next.js, Tailwind, MongoDB, and Chart.js, including a vendor management dashboard.",
      "Shipped secure admin and vendor interfaces with JWT auth, REST APIs, and real-time metrics.",
    ],
  },
];

export const education = {
  degree: "B.S. Cyber Security, minor in Data Science",
  school: "Mercyhurst University",
  dates: "2021 – 2025",
  note: "Dean's List: Spring 2023, Spring 2024, Fall 2024, Spring 2025",
};

export const certs = [
  "Active DoD TS/SCI with CI Polygraph",
  "COITB Professional JavaScript Developer #5938",
  "COITB MySQL Backend Developer #6009",
  "COITB HTML/CSS Web Designer #6081",
  "COITB React.js Framework Developer #6145",
];

export const toolkit: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go", "Rust"] },
  { label: "Frontend", items: ["React", "Next.js", "React Native", "Expo", "Tailwind", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "FastAPI", "Express", "Supabase", "Postgres", "MongoDB", "Elasticsearch"] },
  { label: "AI", items: ["Claude", "OpenAI", "Ollama", "vLLM", "RAG", "Vector search", "Agents", "MCP"] },
  { label: "Infrastructure", items: ["Docker", "CI/CD", "AWS", "Vercel", "Air-gapped deploys", "Self-hosted LLMs"] },
  { label: "Security", items: ["RBAC", "CAC / LDAP / Entra ID", "JWT", "Secure coding", "Stripe"] },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Companies", href: "#companies" },
  { label: "Index", href: "#index" },
  { label: "Record", href: "#record" },
  { label: "Contact", href: "#contact" },
];
