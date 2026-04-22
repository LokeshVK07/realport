"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, MapPin, FileText } from "lucide-react"
import Image from "next/image"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "contact"

interface HeroProps {
  setActiveSection: (section: ActiveSection) => void
}

export function Hero({ setActiveSection }: HeroProps) {
  return (
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
  )
}
