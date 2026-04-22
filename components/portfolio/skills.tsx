"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, BarChart3, Wrench, ChevronRight } from "lucide-react"

interface SkillCategory {
  title: string
  icon: React.ReactNode
  color: string
  skills: { name: string; level: number }[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: <Code className="w-6 h-6" />,
    color: "text-blue-600 dark:text-blue-400",
    skills: [
      { name: "Python", level: 90 },
      { name: "C#", level: 75 },
      { name: "R", level: 70 },
      { name: "JavaScript", level: 65 }
    ]
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6" />,
    color: "text-green-600 dark:text-green-400",
    skills: [
      { name: "SQL", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 60 }
    ]
  },
  {
    title: "Data Science",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "text-purple-600 dark:text-purple-400",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "Plotly", level: 80 },
      { name: "Scikit-Learn", level: 75 }
    ]
  },
  {
    title: "Tools",
    icon: <Wrench className="w-6 h-6" />,
    color: "text-orange-600 dark:text-orange-400",
    skills: [
      { name: "Jupyter", level: 95 },
      { name: "VS Code", level: 90 },
      { name: "Git/GitHub", level: 85 },
      { name: "Tableau", level: 75 }
    ]
  }
]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<number>(0)

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-16 sm:py-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Technical Expertise
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Category Browser */}
            <div className="space-y-4">
              {skillCategories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    activeCategory === index
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 shadow-sm"
                      : "bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${cat.color}`}>{cat.icon}</div>
                    <span className="font-semibold text-gray-900 dark:text-white">{cat.title}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeCategory === index ? "rotate-90 text-blue-600" : "text-gray-400"}`} />
                </button>
              ))}
            </div>

            {/* Detailed Skills View */}
            <div className="lg:col-span-2">
              <Card className="h-full bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <span className={skillCategories[activeCategory].color}>
                      {skillCategories[activeCategory].icon}
                    </span>
                    {skillCategories[activeCategory].title} Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {skillCategories[activeCategory].skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                        <Badge variant="outline" className="text-xs">{skill.level}%</Badge>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
