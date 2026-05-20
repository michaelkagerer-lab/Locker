import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllPosts, getAllTags } from "@/lib/posts"
import { PostCard } from "@/components/PostCard"
import { TagFilter } from "@/components/TagFilter"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${siteConfig.author}`,
}

interface Props {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams
  const allPosts = getAllPosts()
  const tags = getAllTags()
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-semibold text-main mb-2">Blog</h1>
        <p className="text-muted text-sm">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
          {tag && <span className="ml-1">tagged &ldquo;{tag}&rdquo;</span>}
        </p>
      </div>

      <Suspense>
        <TagFilter tags={tags} activeTag={tag ?? null} />
      </Suspense>

      {posts.length === 0 ? (
        <p className="text-muted text-sm">No posts found.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
