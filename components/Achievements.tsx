import { Award, Medal, Trophy } from "lucide-react";

const achievements = [
  {
    title: "ZENITH Recognition",
    subtitle:
      "Recognized by CHRIST University for excellence beyond academics as Google Student Ambassador.",
    icon: Award
  },
  {
    title: "Best Project Award",
    subtitle:
      "Inventory Management & Billing System: automated expired-product billing prevention system built in Java.",
    icon: Trophy
  },
  {
    title: "Runner-Up",
    subtitle:
      "Idea Pitch Competition, DSATM Bangalore. Project: HealthWatch, a blockchain-powered healthcare innovation platform.",
    icon: Medal
  },
  {
    title: "2x Hackathon Winner",
    subtitle: "Built and presented winning software solutions under pressure.",
    icon: Trophy
  },
  {
    title: "Smart India Hackathon Participant",
    subtitle: "National innovation challenge participant.",
    icon: Award
  },
  {
    title: "CODEX Participant",
    subtitle: "Competitive build and coding participant.",
    icon: Award
  },
  {
    title: "Merit Scholarship Recipient",
    subtitle: "Awarded academic merit scholarship from department.",
    icon: Medal
  },
  {
    title: "Co-Curricular Scholarship Recipient",
    subtitle: "Awarded scholarship for outstanding co-curricular achievements.",
    icon: Medal
  }
];

export default function Achievements() {
  return (
    <section className="section-shell" id="achievements">
      <div className="section-kicker">Achievements</div>
      <h2 className="section-title">Proof beyond coursework.</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.title}
            className="rounded-lg border border-border bg-card/55 p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/5"
          >
            <achievement.icon className="mb-5 h-6 w-6 text-primary" />
            <h3 className="font-display text-lg font-bold">{achievement.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {achievement.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
