import { BriefcaseBusiness } from "lucide-react";

const experiences = [
  {
    company: "Tata Consultancy Services",
    role: "Developer Intern",
    period: "Apr 2026 - Present",
    work: [
      "Enterprise AI systems",
      "Order fulfillment analytics",
      "Django REST APIs",
      "PostgreSQL, Redis, Celery",
      "Analytics dashboards",
      "Intelligent workflow automation"
    ]
  },
  {
    company: "EBB Startup",
    role: "AI/Product Intern",
    period: "Apr 2026 - May 2026",
    project: "Career Copilot",
    work: [
      "ATS resume analysis",
      "Skill gap detection",
      "Roadmap generation",
      "FastAPI backend",
      "MongoDB",
      "React dashboard",
      "AI-powered recommendations"
    ]
  },
  {
    company: "Intel Corporation",
    role: "Project Intern",
    period: "May 2025 - Jul 2025",
    work: [
      "OpenVINO optimization",
      "NLP acceleration",
      "Transformer optimization",
      "ONNX deployment",
      "CPU inference optimization"
    ]
  },
  {
    company: "Emertxe Information Technologies",
    role: "MERN Stack Intern",
    period: "Dec 2025 - Feb 2026",
    work: ["MERN applications", "REST APIs", "Authentication", "MongoDB workflows"]
  },
  {
    company: "Codec Technologies India",
    role: "AI Intern",
    period: "Dec 2025 - Jan 2026",
    work: ["AI prototyping", "ML workflows", "Model evaluation"]
  },
  {
    company: "Elevate Labs",
    role: "Intern",
    period: "Oct 2025 - Dec 2025",
    work: ["Software engineering", "Product execution", "Team delivery"]
  }
];

export default function Experience() {
  return (
    <section className="section-shell" id="experience">
      <div className="section-kicker">
        <BriefcaseBusiness className="h-4 w-4" />
        Experience
      </div>
      <h2 className="section-title">Timeline of applied engineering.</h2>
      <div className="relative mt-12 space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-border md:before:left-1/2">
        {experiences.map((experience, index) => (
          <div
            key={`${experience.company}-${experience.role}`}
            className={`relative grid gap-4 md:grid-cols-2 ${
              index % 2 ? "md:[&>div]:col-start-2" : ""
            }`}
          >
            <div className="ml-10 rounded-lg border border-border bg-card/60 p-6 backdrop-blur-xl transition hover:border-primary/60 md:ml-0">
              <span className="absolute left-[10px] top-8 h-3 w-3 rounded-full bg-primary ring-4 ring-background md:left-[calc(50%-6px)]" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold">{experience.company}</h3>
                  <p className="mt-1 text-primary">{experience.role}</p>
                </div>
                <span className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground">
                  {experience.period}
                </span>
              </div>
              {experience.project ? (
                <div className="mt-4 text-sm font-semibold text-accent">
                  Project: {experience.project}
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {experience.work.map((item) => (
                  <span
                    className="rounded-md border border-border bg-background/45 px-3 py-1 text-sm text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
