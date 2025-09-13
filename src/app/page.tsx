// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">RadheShyamTT is live 🙏</h1>
      <p className="mt-3 opacity-80">
        SpiritualTalks by TT — Places • Stories • Scriptures. More coming soon.
      </p>

      {/* New navigation links */}
      <p className="mt-6">
        <Link className="underline" href="/places">Browse Sacred Places →</Link>
      </p>
      <p className="mt-2">
        <Link className="underline" href="/stories">Explore Krishna Stories →</Link>
      </p>
    </main>
  );
}
