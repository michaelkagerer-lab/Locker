import Link from "next/link"
import { Rss } from "lucide-react"
import { siteConfig } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-subtle text-xs">
          © {new Date().getFullYear()} {siteConfig.author}
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtle hover:text-main transition-colors flex items-center gap-1.5 text-xs"
          >
            <Rss size={12} />
            RSS
          </Link>
          <Link href="/blog" className="text-subtle hover:text-main transition-colors text-xs">
            Blog
          </Link>
          <Link href="/gallery" className="text-subtle hover:text-main transition-colors text-xs">
            Gallery
          </Link>
          <Link href="/about" className="text-subtle hover:text-main transition-colors text-xs">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
