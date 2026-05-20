"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Lightbox } from "./Lightbox"
import type { Photo } from "@/types"

interface Props {
  photos: Photo[]
}

export function GalleryGrid({ photos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openPhoto = (idx: number) => setActiveIndex(idx)
  const close = () => setActiveIndex(null)
  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  )
  const next = useCallback(
    () => setActiveIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)),
    [photos.length],
  )

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => openPhoto(idx)}
            className="block w-full mb-3 group overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2"
            aria-label={`View ${photo.title}`}
          >
            <div className="relative overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                unoptimized={photo.src.endsWith(".svg")}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-end">
                <div className="p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium leading-tight">{photo.title}</p>
                  <p className="text-white/70 text-xs">{photo.category}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        activeIndex={activeIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  )
}
