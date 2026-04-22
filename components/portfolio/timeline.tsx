"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react"

interface TimelineEvent {
  type: "education" | "work"
  title: string
  organization: string
  duration: string
  location: string
  description: string
  status?: string
}

const events: TimelineEvent[] = [
  {
    type: "education",
    title: "Master of Information Technology (Data Science)",
    organization: "Queensland University of Technology",
    duration: "July 2024 – June 2026",
    location: "Brisbane, QLD, Australia",
    description: "Specializing in Data Science major. Focused on machine learning, big data systems, and advanced statistical modeling.",
    status: "Currently Enrolled"
  },
  {
    type: "work",
    title: "Aspiring Data Scientist / Intern",
    organization: "Tech Solutions Inc.",
    duration: "Jan 2024 – June 2024",
    location: "Remote / Chennai, India",
    description: "Assisted in data preprocessing, exploratory data analysis (EDA), and building internal reporting dashboards using Python and SQL."
  },
  {
    type: "education",
    title: "Bachelor of Engineering",
    organization: "Anna University",
    duration: "2019 – 2023",
    location: "Tamil Nadu, India",
    description: "Focused on core engineering principles, programming, and mathematics."
  }
]

export function Timeline() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-16 sm:py-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            My Journey
          </h2>
          
          <div className="relative border-l-2 border-blue-200 dark:border-gray-700 ml-4 md:ml-6 space-y-12">
            {events.map((event, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Dot */}
                <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 flex items-center justify-center z-10">
                  {event.type === "education" ? (
                    <GraduationCap className="w-3 h-3 text-white hidden" />
                  ) : (
                    <Briefcase className="w-3 h-3 text-white hidden" />
                  )}
                </div>
                
                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {event.organization}
                        </p>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        {event.status && (
                          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                            {event.status}
                          </Badge>
                        )}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.duration}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
