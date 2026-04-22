"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  longDescription: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  mainTech: string
}

const projects: Project[] = [
  {
    title: "Numerical Board Game Suite",
    description: "Console-based application with multiple 2-player board games.",
    longDescription: "Developed a comprehensive console-based application in C# implementing multiple 2-player board games including Tic-Tac-Toe, Gomoku, and Notakto. Applied OOP principles, Save/Load functionality, and Undo/Redo features.",
    tags: ["C#", "OOP", "Game Logic", "Console App"],
    mainTech: "C#",
    githubUrl: "https://github.com/LokeshVK07/realport",
  },
  {
    title: "Predictive Analytics for Customer Churn",
    description: "Machine Learning model to predict customer attrition.",
    longDescription: "Built a classification model using XGBoost and Scikit-learn to identify high-risk customers. Reached an accuracy of 89% by engineering features from transaction history and demographic data.",
    tags: ["Python", "XGBoost", "Scikit-Learn", "Pandas"],
    mainTech: "Python",
  },
  {
    title: "SQL Sales Dashboard",
    description: "End-to-end data analysis of retail sales performance.",
    longDescription: "Analyzed 1M+ rows of retail data using SQL. Created a comprehensive dashboard in Tableau to visualize regional sales trends, product performance, and year-over-year growth.",
    tags: ["SQL", "Tableau", "Data Analysis", "ETL"],
    mainTech: "SQL",
  }
]

export function Projects() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-800 py-16 sm:py-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Professional Projects
          </h2>
          
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-white dark:bg-gray-900 shadow-lg border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
                        {project.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="text-sm px-3 py-1 dark:border-gray-600 dark:text-gray-300 w-fit"
                      >
                        {project.mainTech}
                      </Badge>
                    </div>
                    
                    <CardDescription className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                      {project.description}
                    </CardDescription>
                    
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {project.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild className="dark:border-gray-600 dark:text-gray-300">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
