"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import {
  Home,
  User,
  GraduationCap,
  Code,
  Wrench,
  Mail,
  Menu,
  X,
  Linkedin,
  Phone,
  MapPin,
  FileText,
  Sun,
  Moon,
  Database,
  BarChart3,
  Settings,
  Send,
} from "lucide-react"
import { sendContactEmail } from "./actions/send-email"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "contact"

const navItems: { key: ActiveSection; label: string; icon: React.ReactNode }[] = [
  { key: "home", label: "Home", icon: <Home size={14} /> },
  { key: "about", label: "About", icon: <User size={14} /> },
  { key: "education", label: "Education", icon: <GraduationCap size={14} /> },
  { key: "skills", label: "Skills", icon: <Code size={14} /> },
  { key: "projects", label: "Projects", icon: <Wrench size={14} /> },
  { key: "contact", label: "Contact", icon: <Mail size={14} /> },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === "dark"

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

  const navigate = (section: ActiveSection) => {
    setActiveSection(section)
    setDrawerOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)
    const formData = new FormData(event.currentTarget)
    const result = await sendContactEmail(formData)
    if (result.success) {
      setSubmitMessage({ type: "success", text: result.message || "Message sent successfully!" })
      event.currentTarget.reset()
    } else {
      setSubmitMessage({ type: "error", text: result.error || "Failed to send message" })
    }
    setIsSubmitting(false)
  }

  const skillCategories = [
    { title: "Programming", icon: <Code size={18} />, skills: technicalSkills.programming },
    { title: "Database", icon: <Database size={18} />, skills: technicalSkills.database },
    { title: "Data Analysis", icon: <BarChart3 size={18} />, skills: technicalSkills.dataAnalysis },
    { title: "Tools", icon: <Settings size={18} />, skills: technicalSkills.tools },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="flex h-full items-center px-3 md:px-6">
          <span className="text-sm font-bold flex-1 md:flex-none md:mr-6">Lokesh Venkatesan</span>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                  activeSection === item.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 ml-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-56 bg-card border-l border-border shadow-lg">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded text-muted-foreground hover:text-foreground"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="px-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 rounded text-xs transition-colors mb-0.5 ${
                    activeSection === item.key
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <span className={activeSection === item.key ? "text-primary" : "text-muted-foreground"}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="pt-12">
        {/* HOME */}
        {activeSection === "home" && (
          <section className="min-h-[calc(100vh-3rem)] flex items-center bg-secondary/30">
            <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
              <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">Lokesh</h1>
                  <h1 className="text-2xl md:text-3xl font-extrabold leading-tight text-primary mb-1">Venkatesan</h1>
                  <p className="text-muted-foreground text-sm mb-1">Data Science Student & Aspiring Engineer</p>
                  <p className="text-muted-foreground text-xs mb-1">
                    Engineering graduate with strong analytical and programming skills, currently pursuing Master{"'"}s
                    in Data Science.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-1 text-muted-foreground mb-4">
                    <MapPin size={12} />
                    <span className="text-xs">Brisbane, Queensland, Australia</span>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <button
                      onClick={() => navigate("contact")}
                      className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      Get In Touch
                    </button>
                    <a
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <Linkedin size={12} />
                      LinkedIn
                    </a>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <FileText size={12} />
                      Resume
                    </a>
                  </div>
                </div>

                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-[3px] border-background shadow-lg">
                    <Image
                      src="/lokesh-photo.jpg"
                      alt="Lokesh Venkatesan"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Linkedin size={14} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <section className="min-h-[calc(100vh-3rem)] flex items-center">
            <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
              <h2 className="text-lg md:text-xl font-bold text-center mb-6">About Me</h2>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                    I am a detail-oriented and motivated engineering graduate with strong analytical and programming
                    skills. Proficient in Python, SQL, R, and C#, with a keen interest in data analysis, software
                    development, and problem-solving.
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    Known for a fast-learning curve and adaptability, I am eager to apply technical knowledge in a
                    professional setting and contribute meaningfully to innovative projects. Committed to continuous
                    learning and development in the tech industry.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate("skills")}
                      className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      View Skills
                    </button>
                    <button
                      onClick={() => navigate("projects")}
                      className="px-3 py-1.5 rounded border border-border text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      See Projects
                    </button>
                    <a
                      href="/resume.pdf"
                      download="Lokesh_Venkatesan_Resume.pdf"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <FileText size={12} />
                      Download Resume
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-52 rounded-lg border border-border bg-secondary/30 p-3">
                  <h3 className="text-xs font-semibold mb-3">Languages</h3>
                  {languages.map((lang, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center ${i < languages.length - 1 ? "mb-2" : ""}`}
                    >
                      <span className="text-muted-foreground text-xs">{lang.language}</span>
                      <span className="text-[0.65rem] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {activeSection === "education" && (
          <section className="min-h-[calc(100vh-3rem)] flex items-center bg-secondary/30">
            <div className="w-full max-w-xl mx-auto px-4 md:px-6 py-8 md:py-12">
              <h2 className="text-lg md:text-xl font-bold text-center mb-6">Education</h2>
              <div className="rounded-lg border border-border bg-card p-4 md:p-5">
                <h3 className="text-base font-bold text-primary mb-0.5">Master of Information Technology</h3>
                <p className="text-sm font-medium mb-3">Data Science Major</p>

                <div className="flex flex-col sm:flex-row gap-4 mb-3">
                  <div>
                    <span className="block text-[0.6rem] font-semibold text-muted-foreground uppercase tracking-wider">
                      Duration
                    </span>
                    <span className="text-xs">July 2024 - June 2026</span>
                  </div>
                  <div>
                    <span className="block text-[0.6rem] font-semibold text-muted-foreground uppercase tracking-wider">
                      Location
                    </span>
                    <span className="text-xs">Brisbane, Queensland, Australia</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="block text-[0.6rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Status
                  </span>
                  <span className="inline-block text-[0.65rem] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Currently Enrolled
                  </span>
                </div>

                <hr className="border-border my-3" />

                <p className="text-muted-foreground text-xs leading-relaxed">
                  Pursuing advanced studies in data science, focusing on machine learning, statistical analysis, and data
                  visualization techniques to solve real-world problems.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SKILLS */}
        {activeSection === "skills" && (
          <section className="min-h-[calc(100vh-3rem)] flex items-center">
            <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
              <h2 className="text-lg md:text-xl font-bold text-center mb-6">Technical Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skillCategories.map((cat) => (
                  <div
                    key={cat.title}
                    className="rounded-lg border border-border bg-card text-center p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="text-primary mb-1 flex justify-center">{cat.icon}</div>
                    <h3 className="text-xs font-semibold mb-2">{cat.title}</h3>
                    <div className="flex flex-col gap-1">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[0.65rem] font-medium px-2 py-1 rounded bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {activeSection === "projects" && (
          <section className="min-h-[calc(100vh-3rem)] flex items-center bg-secondary/30">
            <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
              <h2 className="text-lg md:text-xl font-bold text-center mb-6">Featured Project</h2>
              <div className="rounded-lg border border-border bg-card p-4 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-base font-bold text-primary">Numerical Board Game Suite</h3>
                  <span className="text-[0.65rem] px-2 py-0.5 rounded-full border border-border text-muted-foreground w-fit">
                    C#
                  </span>
                </div>
                <p className="text-muted-foreground text-xs mb-3">
                  Console-based Application with Multiple 2-Player Board Games
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                  Developed a comprehensive console-based application in C# implementing multiple 2-player board games
                  including Tic-Tac-Toe, Gomoku, and Notakto.
                </p>

                <h4 className="text-xs font-semibold mb-1.5">Key Features:</h4>
                <ul className="list-disc pl-4 mb-4 space-y-1">
                  <li className="text-muted-foreground text-xs">
                    Applied Object-Oriented Programming (OOP) principles
                  </li>
                  <li className="text-muted-foreground text-xs">
                    Implemented Save/Load functionality for game persistence
                  </li>
                  <li className="text-muted-foreground text-xs">
                    Added Undo/Redo functionality for enhanced user experience
                  </li>
                  <li className="text-muted-foreground text-xs">
                    Designed flexible architecture to allow easy integration of new games
                  </li>
                </ul>

                <h4 className="text-xs font-semibold mb-1.5">Technologies Used:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["C#", "OOP", "Console Application", "Game Development"].map((t) => (
                    <span
                      key={t}
                      className="text-[0.65rem] font-medium px-2 py-0.5 rounded bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        {activeSection === "contact" && (
          <section className="min-h-[calc(100vh-3rem)] flex items-center">
            <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
              <h2 className="text-lg md:text-xl font-bold text-center mb-6">Get In Touch</h2>
              <div className="flex flex-col md:flex-row gap-5">
                {/* Left */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold mb-1">{"Let's Connect"}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    {"I'm always interested in discussing new opportunities, collaborations, or projects related to data science and software development."}
                  </p>

                  <div className="flex flex-col gap-2 mb-4">
                    {[
                      {
                        icon: <Mail size={14} />,
                        text: "vklokeshvk@gmail.com",
                        href: "mailto:vklokeshvk@gmail.com",
                      },
                      { icon: <Phone size={14} />, text: "+61 422 934 518", href: "tel:+61422934518" },
                      { icon: <MapPin size={14} />, text: "Brisbane, Queensland, Australia" },
                      {
                        icon: <Linkedin size={14} />,
                        text: "lokesh-venkatesan-vk0706",
                        href: "https://www.linkedin.com/in/lokesh-venkatesan-vk0706",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-md bg-secondary/50">
                        <span className="text-primary">{item.icon}</span>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-xs break-all hover:text-primary transition-colors"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className="text-xs">{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Linkedin size={12} />
                      Connect on LinkedIn
                    </a>
                    <a
                      href="mailto:vklokeshvk@gmail.com"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <Mail size={12} />
                      Send Email
                    </a>
                  </div>
                </div>

                {/* Right - form */}
                <div className="flex-1 rounded-lg border border-border bg-card p-3">
                  <h3 className="text-sm font-semibold mb-0.5">Send a Message</h3>
                  <p className="text-muted-foreground text-[0.65rem] mb-3">
                    {"I'll get back to you as soon as possible"}
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full px-2.5 py-1.5 rounded border border-border bg-background text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-2.5 py-1.5 rounded border border-border bg-background text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        required
                        placeholder="Your message..."
                        className="w-full px-2.5 py-1.5 rounded border border-border bg-background text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    {submitMessage && (
                      <div
                        className={`p-2 rounded text-xs ${
                          submitMessage.type === "success"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
                        }`}
                      >
                        {submitMessage.text}
                        {submitMessage.type === "error" && (
                          <div className="mt-1">
                            <span className="text-[0.65rem]">Reach me directly at: </span>
                            <a href="mailto:vklokeshvk@gmail.com" className="text-[0.65rem] text-primary underline">
                              vklokeshvk@gmail.com
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send size={12} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 dark:bg-slate-900 py-3">
        <p className="text-slate-400 text-[0.65rem] text-center">
          {"© 2024 Lokesh Venkatesan. All rights reserved."}
        </p>
      </footer>
    </div>
  )
}
