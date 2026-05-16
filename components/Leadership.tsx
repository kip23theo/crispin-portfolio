import { Crown, UsersRound } from "lucide-react";

const leadership = [
  "McKinsey Leadership Program",
  "Community Head @ INICIA",
  "Editor @ INICIA",
  "IEEE Entrepreneurship Ambassador",
  "IEEE Region 10 Secretary",
  "Student Council Representative",
  "Google Student Ambassador"
];

export default function Leadership() {
  return (
    <section className="section-shell" id="leadership">
      <div className="section-kicker">
        <Crown className="h-4 w-4" />
        Leadership
      </div>
      <h2 className="section-title">Community, ownership, and initiative.</h2>
      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {leadership.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-border bg-card/50 p-5 transition hover:border-primary/60 hover:bg-primary/5"
          >
            <UsersRound className="mb-4 h-5 w-5 text-primary" />
            <div className="font-semibold">{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
