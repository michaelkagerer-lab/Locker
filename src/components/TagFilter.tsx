"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { X } from "lucide-react"

interface Props {
  tags: string[]
  activeTag: string | null
}

export function TagFilter({ tags, activeTag }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const setTag = (tag: string | null) => {
    const p = new URLSearchParams(params.toString())
    if (tag) p.set("tag", tag)
    else p.delete("tag")
    router.push(`${pathname}?${p.toString()}`)
  }

  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {activeTag && (
        <button
          onClick={() => setTag(null)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-line text-muted hover:text-main transition-colors"
        >
          <X size={11} /> Clear
        </button>
      )}
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setTag(activeTag === tag ? null : tag)}
          className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
            activeTag === tag
              ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
              : "border-line text-muted hover:text-main hover:border-[var(--text-muted)]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
