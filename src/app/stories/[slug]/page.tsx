import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { readStoryFile, getAllStoriesMeta } from '@/lib/stories'
import SourcesBox from '@/components/SourcesBox'
import VideoEmbed from '@/components/VideoEmbed'

export async function generateStaticParams() {
  const metas = await getAllStoriesMeta()
  return metas.map((m) => ({ slug: m.slug }))
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let source: string
  try {
    source = await readStoryFile(slug)
  } catch {
    return notFound()
  }

  const { content, frontmatter } = await compileMDX<{
    title: string; slug: string; updated?: string; sources?: { name: string; url: string }[]
  }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      },
    },
    components: { SourcesBox, VideoEmbed },
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
