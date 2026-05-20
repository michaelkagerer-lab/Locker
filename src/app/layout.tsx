import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { siteConfig } from "@/lib/site"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    types: { "application/rss+xml": `${siteConfig.url}/feed.xml` },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${lora.variable} min-h-screen`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
