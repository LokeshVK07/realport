"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "contact"

interface AboutProps {
  setActiveSection: (section: ActiveSection) => void
  languages: { language: string; level: string }[]
}

export function About({ setActiveSection, languages }: AboutProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I am a detail-oriented and motivated engineering graduate with strong analytical and programming
                skills. Proficient in Python, SQL, R, and C#, with a keen interest in data analysis, software
                development, and problem-solving.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Known for a fast-learning curve and adaptability, I am eager to apply technical knowledge in a
                professional setting and contribute meaningfully to innovative projects. Committed to continuous
                learning and development in the tech industry.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setActiveSection("skills")}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  View My Skills
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveSection("projects")}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  See My Projects
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <a href="/resume.pdf" download="Lokesh_Venkatesan_Resume.pdf">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
                  <div className="space-y-3">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">{lang.language}</span>
                        <Badge variant="outline" className="text-sm dark:border-gray-600 dark:text-gray-300">
                          {lang.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
