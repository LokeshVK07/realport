"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Sparkles, Code2, Globe2 } from "lucide-react"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "blog" | "contact"

interface AboutProps {
  setActiveSection: (section: ActiveSection) => void
  languages: { language: string; level: string }[]
}

export function About({ setActiveSection, languages }: AboutProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>The Background</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-heading font-black text-gray-900 dark:text-white leading-tight">
                  Passionate about <span className="text-blue-600 dark:text-blue-400">Data</span> & Engineering
                </h2>
              </div>
              
              <div className="space-y-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                <p>
                  I am a detail-oriented and motivated engineering graduate with strong analytical and programming
                  skills. Proficient in <span className="font-semibold text-gray-900 dark:text-white">Python, SQL, R, and C#</span>, with a keen interest in data analysis, software
                  development, and problem-solving.
                </p>
                <p>
                  Known for a fast-learning curve and adaptability, I am eager to apply technical knowledge in a
                  professional setting and contribute meaningfully to innovative projects. Committed to continuous
                  learning and development in the tech industry.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={() => setActiveSection("skills")}
                  className="h-12 px-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all"
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  View My Skills
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="h-12 px-6 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <a href="/resume.pdf" download="Lokesh_Venkatesan_Resume.pdf">
                    <FileText className="w-5 h-5 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="space-y-8 lg:mt-12">
              <Card className="bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/5 transition-transform hover:-translate-y-2 duration-500">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-2xl">
                        <Globe2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Languages</h3>
                    </div>
                    <Badge variant="outline" className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-white dark:bg-gray-800">
                      Communication
                    </Badge>
                  </div>
                  
                  <div className="space-y-6">
                    {languages.map((lang, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-gray-900 dark:text-white font-medium">{lang.language}</span>
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">{lang.level}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: lang.level === "Fluent" || lang.level === "Native" ? "100%" : "70%" }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Facts Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100/50 dark:border-white/5">
                  <p className="text-3xl font-heading font-black text-blue-600 dark:text-blue-400">2026</p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">Graduation</p>
                </div>
                <div className="p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100/50 dark:border-white/5">
                  <p className="text-3xl font-heading font-black text-indigo-600 dark:text-indigo-400">4+</p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">Core Languages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
