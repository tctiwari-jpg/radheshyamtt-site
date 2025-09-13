import path from 'path'
import { promises as fs } from 'fs'
import matter from 'gray-matter'

const STORIES_DIR = path.join(process.cwd(), 'content', 'stories')

export type StoryMeta = {
  title: string
  slug: string
  summary?: string
  updated?: string
  sources?: { name: string; url: string }[]
}

export async function getAllStoriesMeta(): Promise<StoryMeta[]> {
  const files = await fs.readdir(STORIES_DIR)
  const mdxFiles = files.filter(f => f.endsWith('.mdx'))
  const metas: StoryMeta[] = []
  for (const file of mdxFiles) {
    const raw = await fs.readFile(path.join(STORIES_DIR, file), 'utf8')
    const { data } = matter(raw)
    metas.push({
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      updated: data.updated,
      sources: data.sources || [],
    })
  }
  return metas.sort((a, b) => a.title.localeCompare(b.title))
}

export async function readStoryFile(slug: string): Promise<string> {
  const fullPath = path.join(STORIES_DIR, `${slug}.mdx`)
  return fs.readFile(fullPath, 'utf8')
}
