"use client"

import type React from "react"
import { Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

type ActiveSection = "home" | "about" | "journey" | "education" | "skills" | "projects" | "contact"

interface NavbarProps {
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function Navbar({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
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

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lokesh Venkatesan</h1>
          <div className="hidden md:flex space-x-2 items-center">
            <NavButton section="home" icon={<Home className="w-4 h-4" />}>
              Home
            </NavButton>
            <NavButton section="about">About</NavButton>
            <NavButton section="journey">Journey</NavButton>
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
                  {(["home", "about", "journey", "education", "skills", "projects", "contact"] as const).map((section) => (
                    <button
                      key={section}
                      onClick={() => {
                        setActiveSection(section)
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 capitalize"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
