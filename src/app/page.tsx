import { Providers } from "@/components/motion";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { Work } from "@/components/sections/Work";
import { Companies } from "@/components/sections/Companies";
import { IndexList } from "@/components/sections/IndexList";
import { Record } from "@/components/sections/Record";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <Providers>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Work />
        <Companies />
        <IndexList />
        <Record />
        <Contact />
      </main>
    </Providers>
  );
}
