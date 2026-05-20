import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllPhotos, getAllCategories } from "@/lib/photos"
import { GalleryGrid } from "@/components/GalleryGrid"
import { CategoryFilter } from "@/components/CategoryFilter"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photography by ${siteConfig.author}`,
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function GalleryPage({ searchParams }: Props) {
  const { category } = await searchParams
  const allPhotos = getAllPhotos()
  const categories = getAllCategories()
  const photos = category ? allPhotos.filter((p) => p.category === category) : allPhotos

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-semibold text-main mb-2">Gallery</h1>
        <p className="text-muted text-sm">
          {photos.length} {photos.length === 1 ? "photo" : "photos"}
          {category && <span className="ml-1">in &ldquo;{category}&rdquo;</span>}
        </p>
      </div>

      <Suspense>
        <CategoryFilter categories={categories} activeCategory={category ?? null} />
      </Suspense>

      <GalleryGrid photos={photos} />
    </div>
  )
}
