"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  created_at: string
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/blog/posts/")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Could not load blog posts. Make sure the Django server is running.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full p-6 text-center border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200">{error}</p>
          <Button 
            className="mt-4" 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Card>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-800 py-16 sm:py-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Blog & Insights
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Thoughts on Data Science, Engineering, and Technology
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex mt-4 md:mt-0">
               <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer">
                 Access CMS (Admin)
               </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="bg-white dark:bg-gray-900 shadow-md border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 text-xs text-blue-600 dark:text-blue-400 font-medium mb-2 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        By Admin
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </CardDescription>
                    <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-gray-500">No blog posts yet. Visit the CMS to add some!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
