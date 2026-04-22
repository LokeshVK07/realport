import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Lokesh Venkatesan – Portfolio",
  description: "Projects • Resume • Data Science Portfolio • Available for Work",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "Lokesh Venkatesan – Portfolio",
    description: "Explore my featured projects, skills, and downloadable resume.",
    url: "https://venkatesan-lokesh.vercel.app",
    siteName: "Lokesh Portfolio",
    images: [
      {
        url: "/lokesh.jpg", // this must match the file in /public
        width: 1200,
        height: 630,
        alt: "Lokesh Venkatesan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokesh Venkatesan – Portfolio",
    description: "Projects • Resume • Data Science Portfolio • Available for Work",
    images: ["/lokesh.jpg"],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
