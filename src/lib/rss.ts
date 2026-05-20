import { Feed } from "feed"
import { getAllPosts } from "./posts"
import { siteConfig } from "./site"

export function generateRSSFeed(): Feed {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    copyright: `© ${new Date().getFullYear()} ${siteConfig.author}`,
    author: {
      name: siteConfig.author,
      email: siteConfig.email,
      link: siteConfig.url,
    },
    feedLinks: {
      rss2: `${siteConfig.url}/feed.xml`,
    },
  })

  getAllPosts().forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
    })
  })

  return feed
}
