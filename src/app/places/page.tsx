import Link from 'next/link'
import { getAllPlacesMeta } from '@/lib/places'

export default async function PlacesIndex() {
  const places = await getAllPlacesMeta()
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Sacred Places</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {places.map((p) => (
          <li key={p.slug} className="rounded-xl border p-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/places/${p.slug}`}>{p.title}</Link>
            </h2>
            <p className="text-sm opacity-80">{p.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
