"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Mail, Phone, MapPin, Code, Database, BarChart3, Wrench, Home, FileText, Menu } from "lucide-react"
import Image from "next/image"
import { sendContactEmail } from "./actions/send-email"
import { ThemeToggle } from "@/components/theme-toggle"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "contact"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        activeSection === section
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lokesh Venkatesan</h1>
            <div className="hidden md:flex space-x-2 items-center">
              <NavButton section="home" icon={<Home className="w-4 h-4" />}>
                Home
              </NavButton>
              <NavButton section="about">About</NavButton>
              <NavButton section="education">Education</NavButton>
              <NavButton section="skills">Skills</NavButton>
              <NavButton section="projects">Projects</NavButton>
              <NavButton section="contact">Contact</NavButton>
              <ThemeToggle />
            </div>
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="relative z-50"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>

                {mobileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-40 border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setActiveSection("home")
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => {
                        setActiveSection("about")
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      About
                    </button>
                    <button
                      onClick={() => {
                        setActiveSection("education")
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Education
                    </button>
                    <button
                      onClick={() => {
                        setActiveSection("skills")
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Skills
                    </button>
                    <button
                      onClick={() => {
                        setActiveSection("projects")
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => {
                        setActiveSection("contact")
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Contact
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="pt-20">
        {/* Home Section */}
        {activeSection === "home" && (
          <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6 text-center lg:text-left">
                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                      Lokesh
                      <br />
                      <span className="text-blue-600 dark:text-blue-400">Venkatesan</span>
                    </h1>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
                      Data Science Student & Aspiring Engineer
                    </p>
                    <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto lg:mx-0">
                      Engineering graduate with strong analytical and programming skills, currently pursuing Master's in
                      Data Science
                    </p>
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>Brisbane, Queensland, Australia</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={() => setActiveSection("contact")}
                    >
                      Get In Touch
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <a
                        href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <FileText className="w-5 h-5 mr-2" />
                        View Resume
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
                  <div className="relative">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-2xl">
                      <Image
                        src="/lokesh-photo.jpg"
                        alt="Lokesh Venkatesan"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg">
                      <Linkedin className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === "about" && (
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
        )}

        {/* Education Section */}
        {activeSection === "education" && (
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
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
                  Technical Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <Code className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                      <CardTitle className="text-lg text-gray-900 dark:text-white">Programming</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.programming.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-full justify-center py-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <Database className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-green-600 dark:text-green-400 mb-2" />
                      <CardTitle className="text-lg text-gray-900 dark:text-white">Database</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.database.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 w-full justify-center py-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
                      <CardTitle className="text-lg text-gray-900 dark:text-white">Data Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.dataAnalysis.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 w-full justify-center py-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <Wrench className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-orange-600 dark:text-orange-400 mb-2" />
                      <CardTitle className="text-lg text-gray-900 dark:text-white">Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {technicalSkills.tools.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 w-full justify-center py-2"
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
          <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
                  Featured Project
                </h2>
                <Card className="bg-white dark:bg-gray-900 shadow-lg border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400">
                        Numerical Board Game Suite
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="text-base sm:text-lg px-3 py-1 dark:border-gray-600 dark:text-gray-300 w-fit"
                      >
                        C#
                      </Badge>
                    </div>
                    <CardDescription className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mt-2">
                      Console-based Application with Multiple 2-Player Board Games
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 sm:space-y-8">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      Developed a comprehensive console-based application in C# implementing multiple 2-player board
                      games including Tic-Tac-Toe, Gomoku, and Notakto.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                        <li>Applied Object-Oriented Programming (OOP) principles</li>
                        <li>Implemented Save/Load functionality for game persistence</li>
                        <li>Added Undo/Redo functionality for enhanced user experience</li>
                        <li>Designed flexible architecture to allow easy integration of new games</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-2"
                        >
                          C#
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-2"
                        >
                          Object-Oriented Programming
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-2"
                        >
                          Console Application
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm px-3 py-2"
                        >
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
          <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
                  Get In Touch
                </h2>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                        Let's Connect
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        I'm always interested in discussing new opportunities, collaborations, or projects related to
                        data science and software development. Feel free to reach out!
                      </p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <a
                          href="mailto:vklokeshvk@gmail.com"
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm sm:text-base break-all"
                        >
                          vklokeshvk@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <a
                          href="tel:+61422934518"
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm sm:text-base"
                        >
                          +61 422 934 518
                        </a>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                          Brisbane, Queensland, Australia
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <a
                          href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm sm:text-base break-all"
                        >
                          linkedin.com/in/lokesh-venkatesan-vk0706
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        <a
                          href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-5 h-5 mr-2" />
                          Connect on LinkedIn
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <a href="mailto:vklokeshvk@gmail.com">
                          <Mail className="w-5 h-5 mr-2" />
                          Send Email
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Send a Message</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        I'll get back to you as soon as possible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Your message..."
                          />
                        </div>

                        {submitMessage && (
                          <div
                            className={`p-3 rounded-md ${
                              submitMessage.type === "success"
                                ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700"
                                : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700"
                            }`}
                          >
                            {submitMessage.text}
                            {submitMessage.type === "error" && (
                              <div className="mt-2 text-sm">
                                <p>You can also reach me directly at:</p>
                                <a
                                  href="mailto:vklokeshvk@gmail.com"
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
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
                          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
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
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-gray-400 dark:text-gray-500">© 2024 Lokesh Venkatesan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
