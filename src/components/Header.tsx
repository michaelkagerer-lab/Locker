"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Rss } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { siteConfig } from "@/lib/site"

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-[1.05rem] font-semibold tracking-tight text-main hover:opacity-70 transition-opacity"
        >
          {siteConfig.handle}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href)
                  ? "text-main font-medium"
                  : "text-muted hover:text-main"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/feed.xml"
            aria-label="RSS feed"
            className="text-muted hover:text-main transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Rss size={15} />
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-main transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-[var(--bg)] px-6 py-4 flex flex-col gap-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm ${
                isActive(item.href) ? "text-main font-medium" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-muted flex items-center gap-2"
          >
            <Rss size={14} /> RSS Feed
          </Link>
        </div>
      )}
    </header>
  )
}
