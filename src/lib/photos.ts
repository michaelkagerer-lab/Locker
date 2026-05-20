import photosData from "../../content/photos.json"
import type { Photo } from "@/types"

export function getAllPhotos(): Photo[] {
  return (photosData as Photo[]).map((p) => ({
    ...p,
    aspectRatio: p.height / p.width,
  }))
}

export function getAllCategories(): string[] {
  const cats = new Set(getAllPhotos().map((p) => p.category))
  return Array.from(cats).sort()
}

export function getPhotosByCategory(category: string): Photo[] {
  return getAllPhotos().filter((p) => p.category === category)
}
