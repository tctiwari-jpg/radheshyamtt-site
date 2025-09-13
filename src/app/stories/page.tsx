import Link from 'next/link'
import { getAllStoriesMeta } from '@/lib/stories'

export default async function StoriesIndex() {
  const stories = await getAllStoriesMeta()
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Stories (Leelas)</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {stories.map((s) => (
          <li key={s.slug} className="rounded-xl border p-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/stories/${s.slug}`}>{s.title}</Link>
            </h2>
            <p className="text-sm opacity-80">{s.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
