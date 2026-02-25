"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  FileText,
  Sun,
  Moon,
  Send,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import { sendContactEmail } from "./actions/send-email"

type Section = "home" | "about" | "education" | "skills" | "projects" | "contact"

const NAV: { key: Section; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
]

export default function Portfolio() {
  const [active, setActive] = useState<Section>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const go = (s: Section) => {
    setActive(s)
    setMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setMsg(null)
    const fd = new FormData(e.currentTarget)
    const r = await sendContactEmail(fd)
    setMsg(r.success ? { ok: true, text: r.message || "Sent!" } : { ok: false, text: r.error || "Failed" })
    if (r.success) e.currentTarget.reset()
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="h-full max-w-4xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <button onClick={() => go("home")} className="text-base font-bold tracking-tight">
            LV
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className={`text-sm tracking-wide transition-colors ${
                  active === n.key ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <nav
            className="absolute top-14 inset-x-0 bg-card border-b border-border shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className={`block w-full text-left px-6 py-3.5 text-sm transition-colors ${
                  active === n.key
                    ? "text-foreground font-medium bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Content */}
      <main className="pt-14">
        {/* HOME */}
        {active === "home" && (
          <section className="min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-12">
              <div className="flex flex-col md:flex-row items-start gap-10">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">Lokesh Venkatesan</h1>
                  <p className="text-lg text-muted-foreground mt-2 leading-relaxed">
                    Data Science Student & Aspiring Engineer
                  </p>
                  <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-lg">
                    Engineering graduate with strong analytical and programming skills, currently pursuing a Master{"'"}s
                    in Data Science at Brisbane, Australia.
                  </p>

                  <div className="flex items-center gap-2 text-muted-foreground mt-4">
                    <MapPin size={16} />
                    <span className="text-sm">Brisbane, Queensland</span>
                  </div>

                  <div className="flex items-center flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => go("contact")}
                      className="px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Get in touch
                    </button>
                    <a
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </a>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <FileText size={16} />
                      Resume
                    </a>
                  </div>
                </div>

                <div className="flex-shrink-0 order-first md:order-last">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-2 ring-border">
                    <Image
                      src="/lokesh-photo.jpg"
                      alt="Lokesh Venkatesan"
                      width={176}
                      height={176}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {active === "about" && (
          <section className="min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">About</h2>

              <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  A detail-oriented and motivated engineering graduate with strong analytical and programming skills.
                  Proficient in Python, SQL, R, and C#, with a keen interest in data analysis, software development, and
                  problem-solving.
                </p>
                <p>
                  Known for a fast-learning curve and adaptability, I am eager to apply technical knowledge in a
                  professional setting and contribute meaningfully to innovative projects. Committed to continuous learning
                  and development in the tech industry.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
                  Languages
                </h3>
                <div className="flex gap-6">
                  <div>
                    <span className="text-base font-medium">English</span>
                    <span className="text-sm text-muted-foreground ml-2">Fluent</span>
                  </div>
                  <div>
                    <span className="text-base font-medium">Tamil</span>
                    <span className="text-sm text-muted-foreground ml-2">Native</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={() => go("skills")}
                  className="flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors"
                >
                  View skills
                  <ArrowRight size={16} />
                </button>
                <a
                  href="/resume.pdf"
                  download="Lokesh_Venkatesan_Resume.pdf"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText size={16} />
                  Download resume
                </a>
              </div>
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {active === "education" && (
          <section className="min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">Education</h2>

              <div className="flex gap-5">
                <div className="w-px bg-border flex-shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    July 2024 - June 2026
                  </span>
                  <h3 className="text-xl font-semibold mt-2">Master of Information Technology</h3>
                  <p className="text-base text-muted-foreground mt-1">Data Science Major</p>
                  <p className="text-sm text-muted-foreground mt-1">Brisbane, Queensland, Australia</p>

                  <span className="inline-block text-xs font-medium mt-4 px-3 py-1 rounded-full bg-accent text-foreground">
                    Currently Enrolled
                  </span>

                  <p className="text-base text-muted-foreground mt-5 leading-relaxed max-w-lg">
                    Pursuing advanced studies in data science, focusing on machine learning, statistical analysis, and data
                    visualization techniques to solve real-world problems.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SKILLS */}
        {active === "skills" && (
          <section className="min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">Skills</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { label: "Programming", items: ["Python", "C#", "R"] },
                  { label: "Database", items: ["SQL", "MySQL"] },
                  { label: "Data Analysis", items: ["Pandas", "NumPy", "Plotly"] },
                  { label: "Tools", items: ["Jupyter Notebook", "Visual Studio"] },
                ].map((cat) => (
                  <div key={cat.label}>
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                      {cat.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((s) => (
                        <span
                          key={s}
                          className="text-sm px-3.5 py-1.5 rounded-md bg-accent text-foreground font-medium"
                        >
                          {s}
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
        {active === "projects" && (
          <section className="min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">Projects</h2>

              <div className="rounded-lg border border-border p-5 sm:p-6 hover:border-muted-foreground/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-lg font-semibold">
                    Numerical Board Game Suite
                    <ExternalLink size={14} className="inline ml-2 text-muted-foreground" />
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-accent text-muted-foreground font-medium w-fit">
                    C#
                  </span>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Console-based application implementing multiple 2-player board games including Tic-Tac-Toe, Gomoku, and
                  Notakto.
                </p>

                <ul className="space-y-2 mb-5">
                  {[
                    "Applied OOP principles with extensible architecture",
                    "Save/Load game persistence",
                    "Undo/Redo for enhanced UX",
                    "Flexible plugin system for new games",
                  ].map((f, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground/40 mt-0.5">{"--"}</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {["C#", "OOP", "Console App", "Game Dev"].map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-md bg-accent text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        {active === "contact" && (
          <section className="min-h-[calc(100vh-3.5rem)] flex items-center">
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-2">Get in touch</h2>
              <p className="text-base text-muted-foreground mb-8">
                {"I'm always open to discussing new opportunities and collaborations."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Info */}
                <div>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Mail size={16} />,
                        label: "vklokeshvk@gmail.com",
                        href: "mailto:vklokeshvk@gmail.com",
                      },
                      { icon: <Phone size={16} />, label: "+61 422 934 518", href: "tel:+61422934518" },
                      { icon: <MapPin size={16} />, label: "Brisbane, QLD, Australia" },
                      {
                        icon: <Linkedin size={16} />,
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/in/lokesh-venkatesan-vk0706",
                      },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-muted-foreground">{c.icon}</span>
                        {c.href ? (
                          <a
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm hover:text-foreground text-muted-foreground transition-colors break-all"
                          >
                            {c.label}
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">{c.label}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <a
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Linkedin size={16} />
                      Connect
                    </a>
                    <a
                      href="mailto:vklokeshvk@gmail.com"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <Mail size={16} />
                      Email
                    </a>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Your message..."
                      className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
                    />
                  </div>

                  {msg && (
                    <p className={`text-sm ${msg.ok ? "text-foreground" : "text-destructive"}`}>
                      {msg.text}
                      {!msg.ok && (
                        <>
                          {" "}
                          <a href="mailto:vklokeshvk@gmail.com" className="underline">
                            Email me directly
                          </a>
                        </>
                      )}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {submitting ? "Sending..." : "Send message"}
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-5">
        <p className="text-xs text-muted-foreground text-center">
          {"Lokesh Venkatesan"} &middot; 2024
        </p>
      </footer>
    </div>
  )
}
