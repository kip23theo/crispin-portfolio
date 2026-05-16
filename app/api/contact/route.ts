import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: true,
        fallback: true,
        message:
          "Message validated. Add RESEND_API_KEY to enable production email delivery."
      },
      { status: 202 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "crispin.theofficial@gmail.com",
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      html: `
        <div>
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ ok: false, error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
