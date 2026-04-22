"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Education() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Education
          </h2>
          <div className="flex justify-center">
            <Card className="bg-white dark:bg-gray-900 shadow-lg max-w-2xl w-full border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 mb-2">
                  Master of Information Technology
                </CardTitle>
                <CardDescription className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300">
                  Data Science Major
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Duration
                    </p>
                    <p className="text-base sm:text-lg text-gray-900 dark:text-white">July 2024 – June 2026</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-base sm:text-lg text-gray-900 dark:text-white">
                      Brisbane, Queensland, Australia
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Status
                  </p>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1">
                    Currently Enrolled
                  </Badge>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Pursuing advanced studies in data science, focusing on machine learning, statistical analysis,
                    and data visualization techniques to solve real-world problems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
