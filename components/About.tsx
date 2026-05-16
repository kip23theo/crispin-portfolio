import { BrainCircuit, Rocket, ServerCog, Workflow } from "lucide-react";

const interests = [
  ["AI/ML", BrainCircuit],
  ["NLP", Workflow],
  ["Backend engineering", ServerCog],
  ["Product development", Rocket],
  ["Startup building", Rocket],
  ["Intelligent automation", Workflow]
];

export default function About() {
  return (
    <section className="section-shell" id="about">
      <div className="section-kicker">About</div>
      <h2 className="section-title">AI systems with product instincts.</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-lg p-6">
          <p className="text-lg leading-8 text-foreground">
            Final-year Electronics & Computer Engineering student specializing
            in Artificial Intelligence & Machine Learning at CHRIST University,
            Bengaluru.
          </p>
          <p className="mt-5 leading-8 text-muted-foreground">
            I build practical AI-powered products, scalable backend systems,
            enterprise analytics platforms, and full-stack applications focused
            on solving real-world problems.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {interests.map(([label, Icon]) => (
            <div
              key={label as string}
              className="rounded-lg border border-border bg-card/45 p-5 transition hover:border-primary/60 hover:bg-primary/5"
            >
              <Icon className="mb-4 h-5 w-5 text-primary" />
              <div className="font-semibold">{label as string}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
