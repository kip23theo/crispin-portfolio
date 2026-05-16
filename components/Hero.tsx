"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubStats } from "@/types/github";

type HeroProps = {
  stats: GitHubStats;
};

export default function Hero({ stats }: HeroProps) {
  const heroStats = [
    ["Repos", stats.totals.repos],
    ["Stars", stats.totals.stars],
    ["Contributions", stats.contributions.totalContributions],
    ["Projects built", "20+"]
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-28 md:pt-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {Array.from({ length: 34 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-primary/70"
            style={{
              left: `${(index * 29) % 100}%`,
              top: `${15 + ((index * 17) % 72)}%`
            }}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -18, 0] }}
            transition={{
              duration: 4 + (index % 6),
              repeat: Infinity,
              delay: index * 0.14
            }}
          />
        ))}
      </div>

      <div className="container grid min-h-[calc(100vh-8rem)] items-center gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-kicker">
            <Sparkles className="h-4 w-4" />
            Available for AI/ML and full-stack roles
          </div>
          <h1 className="font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Crispin Theophane
          </h1>
          <p className="mt-5 text-xl font-semibold text-primary md:text-2xl">
            AI/ML Developer | Full-Stack Engineer
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Building intelligent AI products, scalable backend systems, and
            impactful digital experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                View Projects <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/resume.pdf" target="_blank">
                Download Resume <Download className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com/kip23theo" target="_blank" rel="noreferrer">
                GitHub <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://www.linkedin.com/in/crispintheophane/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#contact">
                Contact Me <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-card/50 p-4 backdrop-blur-xl"
              >
                <div className="font-display text-2xl font-bold text-foreground">
                  {value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="noise-mask rounded-lg border border-border bg-card/55 p-6 shadow-glow backdrop-blur-xl">
            <motion.div
              whileHover={{ scale: 1.035, rotate: 1 }}
              className="relative mx-auto aspect-square w-72 overflow-hidden rounded-full border border-primary/50 bg-background shadow-glow md:w-80"
            >
              <div className="absolute inset-[-8px] animate-pulseGlow rounded-full bg-primary/25 blur-2xl" />
              <img
                src="/profile.jpg"
                alt="Crispin Theophane"
                className="relative z-10 h-full w-full rounded-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="profile-orb absolute inset-0 grid place-items-center rounded-full text-7xl font-bold text-background">
                CT
              </div>
            </motion.div>
            <div className="mt-6 rounded-lg border border-border bg-background/45 p-5">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
                Recruiter snapshot
              </div>
              <div className="mt-3 text-sm leading-6 text-muted-foreground">
                Final-year ECE student specializing in AI/ML at CHRIST
                University, shipping production-minded AI systems, APIs, and
                analytics platforms.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
