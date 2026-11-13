# Portfolio redesign: "Twenty-Three"

Date: 2026-11-13 · Status: awaiting approval

## Intent

Rebuild jamesschofield.com from the ground up so that anyone who lands on it (recruiters, companies, peers in defense and AI) leaves with one question answered: how has a 23-year-old done this much this fast? The site should show ambition, hunger for more, and professionalism, in that order of loudness: the design is bold, the copy is confident, the claims are all true.

## Goals

- The hero makes the age-versus-output story obvious within five seconds, without scrolling.
- Lead work: SOCCENTGPT, Drone C2, CoachVana, Evocatio Innovation Labs and its products.
- Founder story is explicit: co-founder of Tampa Bay AI Solutions (which owns CoachVana) and co-founder of Evocatio Innovation Labs (SkyBridge Aviation, Health, Resources, ShowPlate).
- Experience, education, certifications and clearance come from the November 2026 resume.
- Typography carries the design. Interactions feel physical: things morph, lift and scrub rather than fade.
- Works on a phone, by keyboard, and with reduced motion. WCAG 2.2 AA.

## Non-goals

- No blog, CMS, backend, auth or database. Content lives in typed files in the repo.
- No per-project routes. Case studies open as overlays on the single page (deep-linkable by hash).
- No new screenshots of every client site. Existing images in `public/images/projects` are reused.

## Anti-goals

- Any claim that is not backed by the resume or a repo. Numbers are quoted, not rounded up.
- Any screenshot, internal name, architecture detail or network detail of government work beyond what the resume already states publicly. SOCCENTGPT and Drone C2 use abstract generated visuals only (James confirmed this level on 2026-11-13).
- The generic "dark hacker terminal" defense-portfolio look.
- Motion that blocks reading or hijacks scroll.

## Approaches considered

Three directions were mocked up as live hero sections (`.superpowers/brainstorm/.../directions.html`):

- **A · The Profile.** Warm paper, large serif, magazine-feature feel. Most professional, quietest about hunger.
- **B · Signal.** Near-black, condensed type, acid-green accent, live age counter. Loudest, but closest to what other defense and AI portfolios look like.
- **C · Twenty-Three.** A monumental cobalt "23" and a timeline you drag from 17 to 23; the numeral and story change as you scrub.

**James picked C.** It is the only one where the design itself makes the argument, and it stays clean enough to read as professional.

## Design

### Visual system (Claude's calls)

- **Color:** paper `#f6f6f2`, ink `#0b0b0d`, cobalt `#1a2bff` as the single accent. Some sections invert to ink with paper text. No gradients, no glass.
- **Type:** Inter Tight 800/900 for display with tight negative tracking; Inter Tight 400/500 for body; JetBrains Mono 500 uppercase for small labels. Loaded with `next/font`. Display sizes are fluid (`clamp`), with the hero numeral up to roughly a third of the viewport width.
- **Shape:** square or 4px corners at rest; corners round and elements tilt slightly while in motion, then settle.
- **Motion:** Framer Motion. Springs for layout changes, 0.5 to 0.9s eased reveals for type. Everything respects `prefers-reduced-motion` (instant state changes, no parallax).

### Page structure (single page)

1. **Hero: the number.** Giant numeral, headline and paragraph beside it, timeline scrubber under it. On load the numeral counts 17 → 23. Dragging, arrow keys, or clicking a tick changes numeral, year, headline and paragraph together, with the digits rolling.
   Stops:
   - 17 · 2020: first paying freelance client (ERA Solutions).
   - 18 · 2021: starts Cyber Security degree at Mercyhurst; coursework, client projects.
   - 19 · 2022: enlists, U.S. Navy Reserve, Cryptologic Technician; TS/SCI.
   - 20 · 2023: certifications (COITB JavaScript, MySQL, HTML/CSS, React), Dean's List, freelancing.
   - 21 · 2024: real-world client builds; goes deep on AI and real-time systems.
   - 22 · 2025: graduates; teaches React to veterans; joins the SOCCENT program.
   - 23 · 2026: Senior Full Stack Engineer and technical lead; co-founder of two companies.
   Exact cert years for stops 18, 20, 21 are not known; copy stays general ("courses, certifications, client work") rather than pinning a cert to a year.
2. **Proof strip.** A row of large figures that count up when scrolled into view: 20+ production apps, 14-service AI platform, 12,000+ UAS supported, TS/SCI with CI poly, 2 companies co-founded, 40+ repositories.
3. **Selected work.** Four large tiles (SOCCENTGPT, Drone C2, CoachVana, Evocatio Innovation Labs). Hover: tile lifts, tilts, turns cobalt. Click: the tile itself expands into a full-screen case study (shared-layout morph), with title, role, a short narrative, key numbers, stack, and links where public. Evocatio's case study has an internal switcher for its four products. Esc, backdrop click, or close button reverses the morph. Focus is trapped and restored.
4. **Companies.** Inverted (ink) section. Two blocks: Tampa Bay AI Solutions → CoachVana; Evocatio Innovation Labs → SkyBridge Aviation, SkyBridge Health, SkyBridge Resources, ShowPlate. Role stated as co-founder on both.
5. **More work.** A dense index list: Crewsteer, SENTINEL, PolyHQ, WhereTo, then client sites. Each row shows name, type and year; hovering a row shows a preview image following the cursor where one exists; clicking opens the live site or a smaller case-study sheet.
6. **Record.** Experience timeline from the resume (Iron Eagle X senior engineer, senior data analyst, freelance, React instructor, Navy Reserve), education, certifications. Rows expand in place for the bullets.
7. **Toolkit.** Skills grouped as on the resume, set as a compact typographic block, not logo soup.
8. **Contact.** Oversized closing line ("Twenty-three. Just getting started."), email, LinkedIn, GitHub, resume download, and the existing EmailJS form.

A slim fixed nav (name left, section links right) and a scroll-progress bar in cobalt.

### How it gets built (Claude's calls)

- Stay on the existing stack: Next.js 15 App Router, React 19, TypeScript, Tailwind 3, Framer Motion, Radix Dialog for the overlay's accessibility plumbing. No new dependencies expected.
- Replace the single 969-line `page.tsx` with section components under `src/components/sections/` and content under `src/content/` (typed).
- The new resume PDF replaces the old ones in `public/resume/`.
- Old unused Figma-export images in `src/images/` are removed.

## Left to the builder

- Final copy for each case study, written from repo facts and the resume.
- The abstract visuals for the two government projects (generated SVG or canvas, e.g. a node graph for the platform, a moving-dots map for C2).
- Mobile layouts for the hero (numeral stacks above text; scrubber stays).

## Sources and settled questions

- **Resume:** `C:\Users\Owner\Downloads\James Schofield Resume.pdf` (Nov 2026). It is the source for Record, Toolkit and the proof strip, and gets copied to `public/resume/`, replacing the three older PDFs. The current site's "15+ apps" and "38 repos" are stale; the resume's "20+" and "38 more repositories" (so 40+) stand.
- **Government project names:** the resume publicly uses "SOCCENTGPT / Titanium Dolphin" and "C2 Drone Dashboard". The site uses "SOCCENTGPT" and "Drone C2". James confirmed 2026-11-13.
- **Repos:** GitHub account `Jt-schofield1` plus collaborator repos (`jsison2021/evocatioinnovations`, `jsison2021/medical-staffing`, `jsison2021/resources-staffing-MVP`, `jsison2021/star-network`, `thomas-TBAIS/CRM`), read with the authenticated `gh` CLI. Live URLs come from each repo's homepage field.
- **Contact form (Claude's call):** no form exists in `src/` today, only the unused `@emailjs/browser` dependency. The new site uses direct email, LinkedIn, GitHub and resume links instead of a form, and the dependency is removed.
- **More work list (Claude's call):** Crewsteer, SENTINEL, PolyHQ, WhereTo, then client sites that have a live URL on GitHub (Iron Aesthetics, Climb Athletics, DLB Elite, Tom Torrance HVAC, Flickz With Fitz, Leach Construction, French Creek Canoe, Rochester Foam Darts, Mesa Photography). Coursework repos (to-do lists, filter project) are left out. Year is the repo's last-push year. Rows without a screenshot show no hover preview.
- **Age (Claude's call):** the age, headline and timeline stops live in one content file. When James turns 24, that file gets a new stop and the numeral changes; nothing else does.

## Repo facts (pulled 2026-11-13) that change the copy

- **Names as the companies write them:** "Evocatio Innovations" (LLC; "Innovation Labs" appears nowhere), "SkyBridge Healthcare" (not "Health"), "Showplate". The site uses these spellings unless James says otherwise.
- **Evocatio is a studio.** SkyBridge Healthcare, Aviation, Resources, Showplate and WhereTo are work Evocatio shipped, mostly for clients. Copy frames James as co-founder of the studio that shipped them, not as sole builder: his GitHub login has 0 to 5% of commits in those repos (41% in WhereTo). No client names from repo docs are published.
- **CoachVana is the deepest founder story.** 69% of 1,468 commits are James's; live on the App Store (iOS 1.1.2, since 2026-10-26) and Google Play; 755 database migrations, 211 web pages, 306 mobile routes, 104 edge functions, 321 tools on its Claude connector, 400,000+ item food catalogue. Published by Tampa Bay AI Solutions, LLC.
- **Second tier:** Crewsteer is described as built and verified in test mode, pre-launch (no customers claimed). WhereTo: first paid bar subscription 2026-09-29; App Store status unverified, so not claimed. SENTINEL: 83,842 exclusion records, about 20,800 providers ranked, no accuracy score published by design.
- **Left out:** `star-network` (holds real member data, military-adjacent, no commits by James) and the Tampa Bay AI CRM prototype (single commit).

## Open items

- Public links for CoachVana and the Evocatio products: use live URLs where the repos list one; otherwise no link.
