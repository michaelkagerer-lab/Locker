import type { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/PostCard"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${siteConfig.author}`,
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-3xl font-semibold text-main mb-2">Blog</h1>
        <p className="text-muted text-sm">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted text-sm">Nothing here yet. Check back soon.</p>
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
