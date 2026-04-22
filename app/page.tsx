"use client"

import { useState } from "react"
import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Education } from "@/components/portfolio/education"
import { Timeline } from "@/components/portfolio/timeline"
import { Skills } from "@/components/portfolio/skills"
import { Projects } from "@/components/portfolio/projects"
import { Contact } from "@/components/portfolio/contact"
import { sendContactEmail } from "./actions/send-email"

type ActiveSection = "home" | "about" | "journey" | "education" | "skills" | "projects" | "contact"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const languages = [
    { language: "English", level: "Fluent" },
    { language: "Tamil", level: "Native" },
  ]

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="pt-20">
        {activeSection === "home" && <Hero setActiveSection={setActiveSection} />}
        {activeSection === "about" && <About setActiveSection={setActiveSection} languages={languages} />}
        {activeSection === "journey" && <Timeline />}
        {activeSection === "education" && <Education />}
        {activeSection === "skills" && <Skills />}
        {activeSection === "projects" && <Projects />}
        {activeSection === "contact" && (
          <Contact
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
          />
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
