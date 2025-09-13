import Link from "next/link";
import { getAllPlacesMeta } from "@/lib/places";
import { getAllStoriesMeta } from "@/lib/stories";

export const metadata = {
  title: "Site Map",
  description: "All public pages on RadheShyamTT",
};

export default async function SiteMap() {
  const places = await getAllPlacesMeta();
  const stories = await getAllStoriesMeta();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Site Map</h1>

      <h2 className="text-xl mt-6 mb-2">Places</h2>
      <ul className="list-disc pl-5">
        <li><Link href="/places">/places</Link></li>
        {places.map((p) => (
          <li key={p.slug}><Link href={`/places/${p.slug}`}>{p.title}</Link></li>
        ))}
      </ul>

      <h2 className="text-xl mt-6 mb-2">Stories</h2>
      <ul className="list-disc pl-5">
        <li><Link href="/stories">/stories</Link></li>
        {stories.map((s) => (
          <li key={s.slug}><Link href={`/stories/${s.slug}`}>{s.title}</Link></li>
        ))}
      </ul>
    </main>
  );
}
