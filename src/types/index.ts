export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  coverImage?: string
  readingTime: number
}

export interface Photo {
  id: string
  title: string
  src: string
  alt: string
  width: number
  height: number
  category: string
  date: string
  aspectRatio?: number
}
