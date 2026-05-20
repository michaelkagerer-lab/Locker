export const siteConfig = {
  name: "Michael Kagerer",
  handle: "Michael",
  description: "Photography, writing, and things that catch my eye.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://michaelkagerer.com",
  author: "Michael Kagerer",
  email: "michaelkagerer@icloud.com",
  social: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
  nav: [
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ],
}
