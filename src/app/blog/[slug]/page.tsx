import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { siteConfig } from "@/lib/site"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const idx = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null
  const nextPost = idx > 0 ? allPosts[idx - 1] : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-main transition-colors mb-12"
      >
        <ArrowLeft size={13} /> All posts
      </Link>

      {/* Header */}
      <header className="mb-12 pb-8 border-b border-line">
        <div className="flex items-center gap-3 mb-4 text-xs text-subtle">
          <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-main leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-muted text-lg leading-relaxed">{post.excerpt}</p>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs rounded-full border border-line text-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <article className="prose prose-base max-w-none [--tw-prose-body:var(--text)] [--tw-prose-headings:var(--text)] [--tw-prose-hr:var(--border)]">
        <MDXRemote source={post.content} />
      </article>

      {/* Prev / Next */}
      {(prevPost || nextPost) && (
        <nav className="mt-16 pt-8 border-t border-line grid grid-cols-2 gap-6">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group col-start-1">
              <p className="text-xs text-subtle mb-1">← Older</p>
              <p className="text-sm font-medium text-main group-hover:opacity-60 transition-opacity">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group col-start-2 text-right">
              <p className="text-xs text-subtle mb-1">Newer →</p>
              <p className="text-sm font-medium text-main group-hover:opacity-60 transition-opacity">
                {nextPost.title}
              </p>
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
