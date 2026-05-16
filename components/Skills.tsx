import { Cpu } from "lucide-react";

const groups = {
  Languages: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C"],
  Frontend: ["React", "Next.js", "HTML", "CSS", "Tailwind"],
  Backend: ["FastAPI", "Django", "Node.js", "Express"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  AI: ["Machine Learning", "NLP", "Scikit-learn", "OpenVINO", "ONNX"],
  Tools: ["Git", "Docker", "AWS", "Postman", "Tableau"]
};

export default function Skills() {
  return (
    <section className="section-shell" id="skills">
      <div className="section-kicker">
        <Cpu className="h-4 w-4" />
        Skills
      </div>
      <h2 className="section-title">A stack built for intelligent products.</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groups).map(([group, skills]) => (
          <div
            key={group}
            className="rounded-lg border border-border bg-card/50 p-5 transition hover:border-primary/60"
          >
            <h3 className="font-display text-xl font-bold text-primary">{group}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-background/45 px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
