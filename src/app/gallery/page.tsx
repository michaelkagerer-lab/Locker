import type { Metadata } from "next"
import { getAllPhotos, getAllCategories } from "@/lib/photos"
import { GalleryGrid } from "@/components/GalleryGrid"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photography by ${siteConfig.author}`,
}

export default function GalleryPage() {
  const photos = getAllPhotos()
  const categories = getAllCategories()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-semibold text-main mb-2">Gallery</h1>
        <p className="text-muted text-sm">
          {photos.length} photos across {categories.length} {categories.length === 1 ? "category" : "categories"}:{" "}
          {categories.join(", ")}
        </p>
      </div>

      <GalleryGrid photos={photos} />
    </div>
  )
}
