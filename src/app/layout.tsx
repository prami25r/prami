import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-gray-200">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-black">
              Pramithi
            </Link>
            <div className="flex items-center gap-5 text-sm">
              <a href="#about" className="text-gray-700 hover:text-black">
                About
              </a>
              <a href="#skills" className="text-gray-700 hover:text-black">
                Skills
              </a>
              <a href="#projects" className="text-gray-700 hover:text-black">
                Projects
              </a>
              <a href="#resume" className="text-gray-700 hover:text-black">
                Resume
              </a>
              <a href="#contact" className="text-gray-700 hover:text-black">
                Contact
              </a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-wrap gap-4 justify-between">
            <p>© {new Date().getFullYear()} Pramithi</p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/pramithi-r-3b0b47211/"
                className="hover:text-black"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/prami25r"
                className="hover:text-black"
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
