import type React from "react"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lokesh Venkatesan - Portfolio",
  description: "Projects, Resume, Data Science Portfolio - Available for Work",
  openGraph: {
    title: "Lokesh Venkatesan - Portfolio",
    description: "Explore my featured projects, skills, and downloadable resume.",
    url: "https://venkatesan-lokesh.vercel.app",
    siteName: "Lokesh Portfolio",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
