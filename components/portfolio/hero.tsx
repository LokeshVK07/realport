"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, MapPin, FileText, ArrowRight } from "lucide-react"
import Image from "next/image"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "blog" | "contact"

interface HeroProps {
  setActiveSection: (section: ActiveSection) => void
}

export function Hero({ setActiveSection }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-950 font-sans">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>Available for New Opportunities</span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-heading font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Lokesh
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Venkatesan
                </span>
              </h1>

              <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto lg:mx-0 leading-tight animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                Data Science Student & <span className="font-medium text-gray-900 dark:text-white">Aspiring Engineer</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400">
                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-800">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span className="text-lg">Brisbane, Queensland, Australia</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl shadow-blue-500/20"
                onClick={() => setActiveSection("contact")}
              >
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg rounded-xl dark:border-gray-700 dark:hover:bg-gray-900"
              >
                <a
                  href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 mr-3" />
                  LinkedIn
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-14 px-8 text-lg rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-5 h-5 mr-3" />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
              <div className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/lokesh-photo.jpg"
                  alt="Lokesh Venkatesan"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-2xl z-20 border border-gray-100 dark:border-gray-800 animate-bounce duration-[3000ms]">
                <Linkedin className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
