export default function SourcesBox({ items }: { items: { name: string; url: string }[] }) {
  return (
    <aside className="mt-8 rounded-xl border p-4">
      <h3 className="mb-2 text-lg font-semibold">Sources & References</h3>
      <ul className="list-disc pl-5">
        {items.map((s) => (
          <li key={s.url}>
            <a className="underline" href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm opacity-70">For devotional/educational use. Verify locally.</p>
    </aside>
  )
}
