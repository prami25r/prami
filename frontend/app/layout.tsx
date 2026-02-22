import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import SiteHeader from "../components/SiteHeader";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pramithi — Full‑Stack Engineer",
  description:
    "Minimal portfolio showcasing full‑stack engineering, AI/ML integration, backend architecture, and SaaS-grade delivery.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Pramithi — Full‑Stack Engineer",
    description:
      "Full‑stack + AI/ML + backend + databases + distributed systems. Production‑ready solutions.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pramithi — Full‑Stack Engineer",
    description:
      "Full‑stack + AI/ML + backend + databases + distributed systems. Production‑ready solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${playfair.variable} antialiased`}>
        <SiteHeader />
        <main className="min-h-screen pt-16 md:pt-20">{children}</main>
        <footer className="mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 subtle flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 justify-between">
            <p>© {new Date().getFullYear()} Pramithi</p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/pramithi-r-3b0b47211/"
                className="hover:text-black transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/prami25r"
                className="hover:text-black transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
