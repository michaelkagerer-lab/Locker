import Link from "next/link"
import { format } from "date-fns"
import type { Post } from "@/types"

interface Props {
  post: Post
  variant?: "default" | "compact"
}

export function PostCard({ post, variant = "default" }: Props) {
  const formattedDate = format(new Date(post.date), "MMM d, yyyy")

  if (variant === "compact") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="flex items-baseline gap-6 py-4 border-b border-line group-last:border-b-0">
          <time className="text-subtle text-xs tabular-nums shrink-0 w-28">{formattedDate}</time>
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-main group-hover:opacity-60 transition-opacity truncate">
              {post.title}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="py-8 border-b border-line group-last:border-b-0">
        <div className="flex items-center gap-3 mb-3">
          <time className="text-subtle text-xs tabular-nums">{formattedDate}</time>
          {post.tags.length > 0 && (
            <>
              <span className="text-subtle text-xs">·</span>
              <span className="text-subtle text-xs">{post.readingTime} min read</span>
            </>
          )}
        </div>
        <h2 className="text-xl font-serif font-semibold text-main mb-2 group-hover:opacity-70 transition-opacity leading-snug">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full border border-line text-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
