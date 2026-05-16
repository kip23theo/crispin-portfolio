"use client";

import { FormEvent, useState } from "react";
import { Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
      })
    });

    if (response.ok) {
      event.currentTarget.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="section-shell" id="contact">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="section-kicker">Contact</div>
          <h2 className="section-title">Let’s build something intelligent.</h2>
          <p className="section-copy">
            Open to internships, AI/ML roles, full-stack engineering work,
            product collaborations, and startup-minded builds.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="mailto:crispin.theofficial@gmail.com"
              className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              crispin.theofficial@gmail.com
            </a>
            <a
              href="https://github.com/kip23theo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
            >
              <Github className="h-5 w-5" />
              github.com/kip23theo
            </a>
            <a
              href="https://www.linkedin.com/in/crispintheophane/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              linkedin.com/in/crispintheophane
            </a>
            <a
              href="https://crispin-portfolio-v4ls.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
            >
              <Send className="h-5 w-5" />
              crispin-portfolio-v4ls.vercel.app
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass-panel rounded-lg p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Name
              </label>
              <Input name="name" placeholder="Your name" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Email
              </label>
              <Input name="email" type="email" placeholder="you@company.com" required />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Message
            </label>
            <Textarea
              name="message"
              placeholder="Tell me what you're building or hiring for."
              required
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Message
            </Button>
            {status === "success" ? (
              <span className="text-sm text-accent">Message sent successfully.</span>
            ) : null}
            {status === "error" ? (
              <span className="text-sm text-destructive">
                Something went wrong. Email me directly.
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
