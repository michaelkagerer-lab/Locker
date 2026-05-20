import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post } from "@/types"

const postsDir = path.join(process.cwd(), "content/posts")

function calcReadingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "")
      const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8")
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? new Date().toISOString().split("T")[0],
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        coverImage: data.coverImage,
        content,
        readingTime: calcReadingTime(content),
      } satisfies Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(postsDir, `${slug}.mdx`)
  const mdPath = path.join(postsDir, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? new Date().toISOString().split("T")[0],
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    content,
    readingTime: calcReadingTime(content),
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((p) => p.tags))
  return Array.from(tags).sort()
}
