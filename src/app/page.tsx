import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowRight, Rss } from "lucide-react"
import { getAllPosts } from "@/lib/posts"
import { getAllPhotos } from "@/lib/photos"
import { siteConfig } from "@/lib/site"

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)
  const photos = getAllPhotos().slice(0, 4)

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-24 pb-20 border-b border-line">
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-main tracking-tight leading-tight mb-4">
          {siteConfig.name}
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-xl">
          {siteConfig.description}
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-main border border-line px-4 py-2 rounded-full hover:bg-[var(--surface)] transition-colors"
          >
            Read the blog <ArrowRight size={13} />
          </Link>
          <Link
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-main transition-colors"
          >
            <Rss size={13} /> Subscribe via RSS
          </Link>
        </div>
      </section>

      {/* ─── Recent Writing ───────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-16 border-b border-line">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl font-semibold text-main">Recent Writing</h2>
            <Link href="/blog" className="text-xs text-muted hover:text-main transition-colors flex items-center gap-1">
              All posts <ArrowRight size={11} />
            </Link>
          </div>
          <div>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="py-5 border-b border-subtle-line group-last:border-b-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-8">
                  <time className="text-subtle text-xs tabular-nums shrink-0 mb-1 sm:mb-0 w-28">
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </time>
                  <div>
                    <h3 className="text-[0.95rem] font-medium text-main group-hover:opacity-60 transition-opacity">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-muted text-sm mt-0.5 line-clamp-1">{post.excerpt}</p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── Recent Photos ────────────────────────────────────────── */}
      {photos.length > 0 && (
        <section className="py-16 border-b border-line">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl font-semibold text-main">Recent Photos</h2>
            <Link href="/gallery" className="text-xs text-muted hover:text-main transition-colors flex items-center gap-1">
              Gallery <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <Link key={photo.id} href="/gallery" className="group block overflow-hidden rounded-sm">
                <div className="relative aspect-square overflow-hidden bg-[var(--border)]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={photo.src.endsWith(".svg")}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── RSS CTA ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-md">
          <h2 className="font-serif text-xl font-semibold text-main mb-2">Stay updated</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Subscribe via RSS to get new posts delivered directly to your feed reader — no email required.
          </p>
          <Link
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-main border border-line px-4 py-2 rounded-full hover:bg-[var(--surface)] transition-colors"
          >
            <Rss size={13} /> Subscribe to RSS feed
          </Link>
        </div>
      </section>
    </div>
  )
}
