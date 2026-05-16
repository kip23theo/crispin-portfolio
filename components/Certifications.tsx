import { BadgeCheck } from "lucide-react";

const certificationGroups = [
  {
    group: "Cloud",
    items: ["AWS Cloud Foundations", "AWS Generative AI Foundations"]
  },
  {
    group: "AI",
    items: ["Intel OpenVINO", "IBM Getting Started with Data", "NPTEL Data Science"]
  },
  {
    group: "MathWorks",
    items: [
      "Machine Learning Onramp",
      "Deep Learning Onramp",
      "Classification",
      "Regression",
      "Cluster Analysis",
      "Dimensionality Reduction",
      "MATLAB Desktop Tools"
    ]
  },
  {
    group: "Security",
    items: ["Cisco Cybersecurity", "Cybersecurity Essentials"]
  },
  {
    group: "Other",
    items: [
      "United Nations Nature-Based Solutions",
      "Simplilearn OOP Java",
      "Generative AI Studio"
    ]
  }
];

export default function Certifications() {
  return (
    <section className="section-shell" id="certifications">
      <div className="section-kicker">
        <BadgeCheck className="h-4 w-4" />
        Certifications
      </div>
      <h2 className="section-title">Continuous learning, verified.</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certificationGroups.map((group) => (
          <div
            key={group.group}
            className="rounded-lg border border-border bg-card/50 p-5 transition hover:border-primary/60"
          >
            <h3 className="font-display text-xl font-bold text-primary">{group.group}</h3>
            <div className="mt-5 space-y-3">
              {group.items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
