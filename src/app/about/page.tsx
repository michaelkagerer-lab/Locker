import type { Metadata } from "next"
import Link from "next/link"
import { Rss, Mail } from "lucide-react"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author}`,
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="max-w-xl">
        <h1 className="font-serif text-3xl font-semibold text-main mb-10">About</h1>

        <div className="prose prose-base max-w-none [--tw-prose-body:var(--text)] [--tw-prose-headings:var(--text)] [--tw-prose-hr:var(--border)]">
          <p>
            Hi, I&apos;m {siteConfig.author}. I write and make photographs.
          </p>
          <p>
            This site is where I put things down: observations, thoughts on craft, ideas I keep
            returning to. It&apos;s intentionally simple — no ads, no tracking, no newsletter
            pop-ups. Just writing and images.
          </p>
          <p>
            The <Link href="/blog">blog</Link> covers whatever I&apos;m thinking about. The{" "}
            <Link href="/gallery">gallery</Link> holds photographs I&apos;m satisfied with —
            mostly landscapes, some urban work, quiet scenes.
          </p>
          <p>
            I try to write when I have something to say rather than on a schedule. If you
            want to follow along without social media, the RSS feed is the best way.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-line flex flex-col gap-3">
          <Link
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-main transition-colors"
          >
            <Rss size={14} /> Subscribe via RSS
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-main transition-colors"
          >
            <Mail size={14} /> {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  )
}
