"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Mail, Phone, MapPin, Code, Database, BarChart3, Wrench, Home, FileText } from "lucide-react"
import Image from "next/image"
import { sendContactEmail } from "./actions/send-email"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "contact"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const technicalSkills = {
    programming: ["Python", "C#", "R"],
    database: ["SQL", "MySQL"],
    dataAnalysis: ["Pandas", "NumPy", "Plotly"],
    tools: ["Jupyter Notebook", "Visual Studio"],
  }

  const languages = [
    { language: "English", level: "Fluent" },
    { language: "Tamil", level: "Native" },
  ]

  const NavButton = ({
    section,
    children,
    icon,
  }: { section: ActiveSection; children: React.ReactNode; icon?: React.ReactNode }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
        activeSection === section ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    const formData = new FormData(event.currentTarget)
    const result = await sendContactEmail(formData)

    if (result.success) {
      setSubmitMessage({ type: "success", text: result.message || "Message sent successfully!" })
      // Reset form
      event.currentTarget.reset()
    } else {
      setSubmitMessage({ type: "error", text: result.error || "Failed to send message" })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Lokesh Venkatesan</h1>
            <div className="hidden md:flex space-x-2">
              <NavButton section="home" icon={<Home className="w-4 h-4" />}>
                Home
              </NavButton>
              <NavButton section="about">About</NavButton>
              <NavButton section="education">Education</NavButton>
              <NavButton section="skills">Skills</NavButton>
              <NavButton section="projects">Projects</NavButton>
              <NavButton section="contact">Contact</NavButton>
            </div>
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value as ActiveSection)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="home">Home</option>
                <option value="about">About</option>
                <option value="education">Education</option>
                <option value="skills">Skills</option>
                <option value="projects">Projects</option>
                <option value="contact">Contact</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="pt-20">
        {/* Home Section */}
        {activeSection === "home" && (
          <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                      Lokesh
                      <br />
                      <span className="text-blue-600">Venkatesan</span>
                    </h1>
                    <p className="text-2xl lg:text-3xl text-gray-600 font-light">
                      Data Science Student & Aspiring Engineer
                    </p>
                    <p className="text-lg text-gray-500 max-w-lg">
                      Engineering graduate with strong analytical and programming skills, currently pursuing Master's in
                      Data Science
                    </p>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Brisbane, Queensland, Australia</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setActiveSection("contact")}
                    >
                      Get In Touch
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <a
                        href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <FileText className="w-5 h-5 mr-2" />
                        View Resume
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                      <Image
                        src="/placeholder.svg?height=400&width=400"
                        alt="Lokesh Venkatesan"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg">
                      <Linkedin className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <section className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">About Me</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      I am a detail-oriented and motivated engineering graduate with strong analytical and programming
                      skills. Proficient in Python, SQL, R, and C#, with a keen interest in data analysis, software
                      development, and problem-solving.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Known for a fast-learning curve and adaptability, I am eager to apply technical knowledge in a
                      professional setting and contribute meaningfully to innovative projects. Committed to continuous
                      learning and development in the tech industry.
                    </p>
                    <div className="flex space-x-4">
                      <Button onClick={() => setActiveSection("skills")} className="bg-blue-600 hover:bg-blue-700">
                        View My Skills
                      </Button>
                      <Button variant="outline" onClick={() => setActiveSection("projects")}>
                        See My Projects
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="/resume.pdf" download="Lokesh_Venkatesan_Resume.pdf">
                          <FileText className="w-4 h-4 mr-2" />
                          Download Resume
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Languages</h3>
                        <div className="space-y-3">
                          {languages.map((lang, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">{lang.language}</span>
                              <Badge variant="outline" className="text-sm">
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
        )}

        {/* Education Section */}
        {activeSection === "education" && (
          <section className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="container mx-auto px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Education</h2>
                <div className="flex justify-center">
                  <Card className="bg-white shadow-lg max-w-2xl w-full">
                    <CardHeader className="text-center">
                      <CardTitle className="text-3xl text-blue-600 mb-2">Master of Information Technology</CardTitle>
                      <CardDescription className="text-xl font-medium text-gray-700">
                        Data Science Major
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Duration</p>
                          <p className="text-lg text-gray-900">July 2024 – June 2026</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Location</p>
                          <p className="text-lg text-gray-900">Brisbane, Queensland, Australia</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</p>
                        <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">Currently Enrolled</Badge>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="text-gray-600 leading-relaxed">
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
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <section className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Technical Skills</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Code className="w-12 h-12 mx-auto text-blue-600 mb-2" />
                      <CardTitle className="text-lg">Programming</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.programming.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 w-full justify-center py-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Database className="w-12 h-12 mx-auto text-green-600 mb-2" />
                      <CardTitle className="text-lg">Database</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.database.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-green-100 text-green-800 w-full justify-center py-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <BarChart3 className="w-12 h-12 mx-auto text-purple-600 mb-2" />
                      <CardTitle className="text-lg">Data Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.dataAnalysis.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-purple-100 text-purple-800 w-full justify-center py-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Wrench className="w-12 h-12 mx-auto text-orange-600 mb-2" />
                      <CardTitle className="text-lg">Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.tools.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-orange-100 text-orange-800 w-full justify-center py-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <section className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="container mx-auto px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Project</h2>
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl text-blue-600 flex items-center justify-between">
                      Numerical Board Game Suite
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        C#
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-xl">
                      Console-based Application with Multiple 2-Player Board Games
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Developed a comprehensive console-based application in C# implementing multiple 2-player board
                      games including Tic-Tac-Toe, Gomoku, and Notakto.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-900">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-3 text-gray-600 text-lg">
                        <li>Applied Object-Oriented Programming (OOP) principles</li>
                        <li>Implemented Save/Load functionality for game persistence</li>
                        <li>Added Undo/Redo functionality for enhanced user experience</li>
                        <li>Designed flexible architecture to allow easy integration of new games</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-900">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-sm px-3 py-2">
                          C#
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm px-3 py-2">
                          Object-Oriented Programming
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-sm px-3 py-2">
                          Console Application
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-sm px-3 py-2">
                          Game Development
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <section className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Get In Touch</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Let's Connect</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        I'm always interested in discussing new opportunities, collaborations, or projects related to
                        data science and software development. Feel free to reach out!
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <Mail className="w-6 h-6 text-blue-600" />
                        <a
                          href="mailto:vklokeshvk@gmail.com"
                          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                          vklokeshvk@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <Phone className="w-6 h-6 text-blue-600" />
                        <a
                          href="tel:+61422934518"
                          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                          +61 422 934 518
                        </a>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        <span className="text-gray-700 font-medium">Brisbane, Queensland, Australia</span>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <Linkedin className="w-6 h-6 text-blue-600" />
                        <a
                          href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                          linkedin.com/in/lokesh-venkatesan-vk0706
                        </a>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button asChild size="lg">
                        <a
                          href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Linkedin className="w-5 h-5 mr-2" />
                          Connect on LinkedIn
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <a href="mailto:vklokeshvk@gmail.com">
                          <Mail className="w-5 h-5 mr-2" />
                          Send Email
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Send a Message</CardTitle>
                      <CardDescription>I'll get back to you as soon as possible</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your message..."
                          />
                        </div>

                        {submitMessage && (
                          <div
                            className={`p-3 rounded-md ${
                              submitMessage.type === "success"
                                ? "bg-green-50 text-green-800 border border-green-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                          >
                            {submitMessage.text}
                            {submitMessage.type === "error" && (
                              <div className="mt-2 text-sm">
                                <p>You can also reach me directly at:</p>
                                <a
                                  href="mailto:vklokeshvk@gmail.com"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  vklokeshvk@gmail.com
                                </a>
                              </div>
                            )}
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-400">© 2024 Lokesh Venkatesan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
