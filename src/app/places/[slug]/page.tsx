import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { readPlaceFile, getAllPlacesMeta } from '@/lib/places'
import VideoEmbed from '@/components/VideoEmbed'
import SourcesBox from '@/components/SourcesBox'

export async function generateStaticParams() {
  const metas = await getAllPlacesMeta()
  return metas.map((m) => ({ slug: m.slug }))
}

// NOTE: params is a Promise in Next 15
export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let source: string
  try {
    source = await readPlaceFile(slug)
  } catch {
    return notFound()
  }

  const { content, frontmatter } = await compileMDX<{
    title: string
    slug: string
    updated?: string
    sources?: { name: string; url: string }[]
  }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      },
    },
    components: { VideoEmbed, SourcesBox },
  })

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold">{frontmatter.title}</h1>
      {frontmatter.updated && (
        <p className="mb-6 text-sm opacity-70">Last updated: {frontmatter.updated}</p>
      )}
      <article className="prose max-w-none">{content}</article>
    </main>
  )
}
