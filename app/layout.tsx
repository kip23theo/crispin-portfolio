import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://crispin-portfolio-v4ls.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crispin Theophane | AI/ML Developer & Full-Stack Engineer",
    template: "%s | Crispin Theophane"
  },
  description:
    "Premium recruiter-focused portfolio for Crispin Theophane, AI/ML Developer, Full-Stack Engineer, and Product Builder.",
  keywords: [
    "Crispin Theophane",
    "AI ML Developer",
    "Full Stack Engineer",
    "Next.js Portfolio",
    "Machine Learning",
    "NLP",
    "Backend Engineer",
    "Product Builder"
  ],
  authors: [{ name: "Crispin Theophane" }],
  creator: "Crispin Theophane",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Crispin Theophane | AI/ML Developer & Full-Stack Engineer",
    description:
      "Building intelligent AI products, scalable backend systems, and impactful digital experiences.",
    siteName: "Crispin Theophane Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crispin Theophane Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Crispin Theophane | AI/ML Developer & Full-Stack Engineer",
    description:
      "Building intelligent AI products, scalable backend systems, and impactful digital experiences.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Crispin Theophane",
    jobTitle: "AI/ML Developer | Full-Stack Engineer | Product Builder",
    email: "mailto:crispin.theofficial@gmail.com",
    url: siteUrl,
    sameAs: [
      "https://github.com/kip23theo",
      "https://www.linkedin.com/in/crispintheophane/"
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "NLP",
      "Backend Engineering",
      "Full Stack Development",
      "Product Development"
    ]
  };

  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
