"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Photo } from "@/types"

interface Props {
  photos: Photo[]
  activeIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ photos, activeIndex, onClose, onPrev, onNext }: Props) {
  const photo = activeIndex !== null ? photos[activeIndex] : null

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    if (photo) {
      document.addEventListener("keydown", handleKey)
      document.body.classList.add("lightbox-open")
    }
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.classList.remove("lightbox-open")
    }
  }, [photo, handleKey])

  if (!photo || activeIndex === null) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      {activeIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous photo"
          className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Next */}
      {activeIndex < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Next photo"
          className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="object-contain max-h-[80vh] w-auto"
          priority
          unoptimized={photo.src.endsWith(".svg")}
        />
        <div className="mt-3 text-center">
          <p className="text-white/90 text-sm font-medium">{photo.title}</p>
          <p className="text-white/50 text-xs mt-0.5">{photo.category}</p>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs tabular-nums">
        {activeIndex + 1} / {photos.length}
      </div>
    </div>
  )
}
