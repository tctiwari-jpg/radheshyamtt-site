import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://radheshyamtt.com"),
  title: {
    default: "RadheShyamTT – SpiritualTalks by TT",
    template: "%s | RadheShyamTT",
  },
  description:
    "Sacred places, stories (leelas), and scriptures of Sanatan Dharma — curated by SpiritualTalks by TT.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "RadheShyamTT",
    description: "SpiritualTalks by TT — Places, Stories, Scriptures.",
    url: "https://radheshyamtt.com",
    siteName: "RadheShyamTT",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        {/* Main content */}
        <main className="mx-auto max-w-5xl p-6">{children}</main>

        {/* Footer with links */}
        <footer className="border-t">
          <div className="mx-auto max-w-5xl p-6 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 opacity-80">
            <div>© {new Date().getFullYear()} RadheShyamTT • SpiritualTalks by TT</div>
            <nav className="flex gap-4">
              <Link className="underline" href="/site-map">Site Map</Link>
              <a className="underline" href="/sitemap.xml" target="_blank" rel="noreferrer">XML</a>
              <a className="underline" href="/robots.txt" target="_blank" rel="noreferrer">Robots</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
