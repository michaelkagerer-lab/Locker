import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 flex flex-col justify-center py-32">
      <p className="text-subtle text-xs mb-4 font-mono">404</p>
      <h1 className="font-serif text-3xl font-semibold text-main mb-3">Page not found</h1>
      <p className="text-muted text-sm mb-8 max-w-xs">
        This page doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-main transition-colors"
      >
        <ArrowLeft size={13} /> Back to home
      </Link>
    </div>
  )
}
