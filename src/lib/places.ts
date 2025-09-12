import path from 'path'
import { promises as fs } from 'fs'
import matter from 'gray-matter'

const PLACES_DIR = path.join(process.cwd(), 'content', 'places')

export type PlaceMeta = {
  title: string
  slug: string
  lang?: string
  summary?: string
  updated?: string
  youtube_id?: string
  sources?: { name: string; url: string }[]
}

export async function getAllPlacesMeta(): Promise<PlaceMeta[]> {
  const files = await fs.readdir(PLACES_DIR)
  const mdxFiles = files.filter(f => f.endsWith('.mdx'))
  const metas: PlaceMeta[] = []

  for (const file of mdxFiles) {
    const raw = await fs.readFile(path.join(PLACES_DIR, file), 'utf8')
    const { data } = matter(raw)
    metas.push({
      title: data.title,
      slug: data.slug,
      lang: data.lang,
      summary: data.summary,
      updated: data.updated,
      youtube_id: data.youtube_id,
      sources: data.sources || [],
    })
  }
  return metas.sort((a, b) => a.title.localeCompare(b.title))
}

export async function readPlaceFile(slug: string): Promise<string> {
  const fullPath = path.join(PLACES_DIR, `${slug}.mdx`)
  return fs.readFile(fullPath, 'utf8')
}
