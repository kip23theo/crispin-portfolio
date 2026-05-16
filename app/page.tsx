import {
  Github,
  Linkedin,
  Mail,
  Menu,
  Sparkles
} from "lucide-react";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import GitHubStats from "@/components/GitHubStats";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { Button } from "@/components/ui/button";
import { fetchGitHubStats } from "@/lib/github";

const navItems = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["GitHub", "#github"],
  ["Skills", "#skills"],
  ["Contact", "#contact"]
];

export default async function Home() {
  const stats = await fetchGitHubStats();

  return (
    <main>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl">
        <nav className="container flex h-16 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-primary/50 bg-primary/10 font-display font-bold text-primary">
              CT
            </span>
            <span className="hidden font-display font-bold sm:block">
              Crispin Theophane
            </span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary/80 hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
              <a href="https://github.com/kip23theo" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
              <a
                href="https://www.linkedin.com/in/crispintheophane/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="sm">
              <a href="#contact">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Hire Me</span>
              </a>
            </Button>
            <Button size="sm" variant="outline" className="lg:hidden" aria-label="Menu">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      <Hero stats={stats} />
      <About />
      <Experience />
      <Leadership />
      <Achievements />
      <Projects stats={stats} />
      <GitHubStats stats={stats} />
      <Certifications />
      <Skills />
      <Contact />

      <footer className="border-t border-border py-8">
        <div className="container flex flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Built with Next.js, Tailwind, Framer Motion, and live GitHub sync.
          </div>
          <div>© 2026 Crispin Theophane. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
