"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { X } from "lucide-react"

interface Props {
  categories: string[]
  activeCategory: string | null
}

export function CategoryFilter({ categories, activeCategory }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const setCategory = (cat: string | null) => {
    const p = new URLSearchParams(params.toString())
    if (cat) p.set("category", cat)
    else p.delete("category")
    router.push(`${pathname}?${p.toString()}`)
  }

  if (categories.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <span className="text-xs text-subtle mr-1">Filter:</span>
      {activeCategory && (
        <button
          onClick={() => setCategory(null)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-line text-muted hover:text-main transition-colors"
        >
          <X size={11} /> All
        </button>
      )}
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(activeCategory === cat ? null : cat)}
          className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
            activeCategory === cat
              ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
              : "border-line text-muted hover:text-main hover:border-[var(--text-muted)]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
