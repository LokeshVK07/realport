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
      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-11 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="h-full max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button onClick={() => go("home")} className="text-[13px] font-semibold tracking-tight">
            LV
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className={`text-[12px] tracking-wide transition-colors ${
                  active === n.key ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            )}
            <button
              className="md:hidden p-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <nav
            className="absolute top-11 inset-x-0 bg-card border-b border-border shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className={`block w-full text-left px-5 py-2.5 text-[12px] transition-colors ${
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

      {/* ── Content ── */}
      <main className="pt-11">
        {/* HOME */}
        {active === "home" && (
          <section className="min-h-[calc(100vh-2.75rem)] flex items-center">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Left: text */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">Lokesh Venkatesan</h1>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    Data Science Student & Aspiring Engineer
                  </p>
                  <p className="text-[13px] text-muted-foreground mt-3 leading-relaxed max-w-md">
                    Engineering graduate with strong analytical and programming skills, currently pursuing a Master{"'"}s
                    in Data Science at Brisbane, Australia.
                  </p>

                  <div className="flex items-center gap-1.5 text-muted-foreground mt-3">
                    <MapPin size={12} />
                    <span className="text-[12px]">Brisbane, Queensland</span>
                  </div>

                  <div className="flex items-center flex-wrap gap-2 mt-5">
                    <button
                      onClick={() => go("contact")}
                      className="px-3 py-1.5 rounded-md bg-foreground text-background text-[12px] font-medium hover:opacity-90 transition-opacity"
                    >
                      Get in touch
                    </button>
                    <a
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-[12px] font-medium hover:bg-accent transition-colors"
                    >
                      <Linkedin size={12} />
                      LinkedIn
                    </a>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-[12px] font-medium hover:bg-accent transition-colors"
                    >
                      <FileText size={12} />
                      Resume
                    </a>
                  </div>
                </div>

                {/* Right: photo */}
                <div className="flex-shrink-0 order-first md:order-last">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-border">
                    <Image
                      src="/lokesh-photo.jpg"
                      alt="Lokesh Venkatesan"
                      width={112}
                      height={112}
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
          <section className="min-h-[calc(100vh-2.75rem)] flex items-center">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <h2 className="text-lg font-semibold tracking-tight mb-5">About</h2>

              <div className="space-y-3 text-[13px] text-muted-foreground leading-relaxed max-w-xl">
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

              <div className="mt-6 pt-5 border-t border-border">
                <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-widest mb-3">
                  Languages
                </h3>
                <div className="flex gap-4">
                  <div>
                    <span className="text-[13px] font-medium">English</span>
                    <span className="text-[12px] text-muted-foreground ml-1.5">Fluent</span>
                  </div>
                  <div>
                    <span className="text-[13px] font-medium">Tamil</span>
                    <span className="text-[12px] text-muted-foreground ml-1.5">Native</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => go("skills")}
                  className="flex items-center gap-1.5 text-[12px] font-medium hover:text-muted-foreground transition-colors"
                >
                  View skills
                  <ArrowRight size={12} />
                </button>
                <a
                  href="/resume.pdf"
                  download="Lokesh_Venkatesan_Resume.pdf"
                  className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText size={12} />
                  Download resume
                </a>
              </div>
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {active === "education" && (
          <section className="min-h-[calc(100vh-2.75rem)] flex items-center">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <h2 className="text-lg font-semibold tracking-tight mb-5">Education</h2>

              <div className="flex gap-4">
                <div className="w-px bg-border flex-shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
                    July 2024 - June 2026
                  </span>
                  <h3 className="text-[15px] font-semibold mt-1">Master of Information Technology</h3>
                  <p className="text-[13px] text-muted-foreground mt-0.5">Data Science Major</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Brisbane, Queensland, Australia</p>

                  <span className="inline-block text-[11px] font-medium mt-3 px-2 py-0.5 rounded-full bg-accent text-foreground">
                    Currently Enrolled
                  </span>

                  <p className="text-[13px] text-muted-foreground mt-4 leading-relaxed max-w-lg">
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
          <section className="min-h-[calc(100vh-2.75rem)] flex items-center">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <h2 className="text-lg font-semibold tracking-tight mb-5">Skills</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                {[
                  { label: "Programming", items: ["Python", "C#", "R"] },
                  { label: "Database", items: ["SQL", "MySQL"] },
                  { label: "Data Analysis", items: ["Pandas", "NumPy", "Plotly"] },
                  { label: "Tools", items: ["Jupyter Notebook", "Visual Studio"] },
                ].map((cat) => (
                  <div key={cat.label}>
                    <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-widest mb-2">
                      {cat.label}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((s) => (
                        <span
                          key={s}
                          className="text-[12px] px-2.5 py-1 rounded-md bg-accent text-foreground font-medium"
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
          <section className="min-h-[calc(100vh-2.75rem)] flex items-center">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <h2 className="text-lg font-semibold tracking-tight mb-5">Projects</h2>

              <div className="group rounded-lg border border-border p-4 sm:p-5 hover:border-muted-foreground/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-[15px] font-semibold">
                    Numerical Board Game Suite
                    <ExternalLink size={12} className="inline ml-1.5 text-muted-foreground" />
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent text-muted-foreground font-medium w-fit">
                    C#
                  </span>
                </div>

                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                  Console-based application implementing multiple 2-player board games including Tic-Tac-Toe, Gomoku, and
                  Notakto.
                </p>

                <ul className="space-y-1 mb-4">
                  {[
                    "Applied OOP principles with extensible architecture",
                    "Save/Load game persistence",
                    "Undo/Redo for enhanced UX",
                    "Flexible plugin system for new games",
                  ].map((f, i) => (
                    <li key={i} className="text-[12px] text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground/40 mt-px">{"--"}</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {["C#", "OOP", "Console App", "Game Dev"].map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-accent text-muted-foreground">
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
          <section className="min-h-[calc(100vh-2.75rem)] flex items-center">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <h2 className="text-lg font-semibold tracking-tight mb-1">Get in touch</h2>
              <p className="text-[13px] text-muted-foreground mb-6">
                {"I'm always open to discussing new opportunities and collaborations."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Info */}
                <div>
                  <div className="space-y-2.5">
                    {[
                      {
                        icon: <Mail size={13} />,
                        label: "vklokeshvk@gmail.com",
                        href: "mailto:vklokeshvk@gmail.com",
                      },
                      { icon: <Phone size={13} />, label: "+61 422 934 518", href: "tel:+61422934518" },
                      { icon: <MapPin size={13} />, label: "Brisbane, QLD, Australia" },
                      {
                        icon: <Linkedin size={13} />,
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/in/lokesh-venkatesan-vk0706",
                      },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-muted-foreground">{c.icon}</span>
                        {c.href ? (
                          <a
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-[12px] hover:text-foreground text-muted-foreground transition-colors break-all"
                          >
                            {c.label}
                          </a>
                        ) : (
                          <span className="text-[12px] text-muted-foreground">{c.label}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-5">
                    <a
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-[12px] font-medium hover:opacity-90 transition-opacity"
                    >
                      <Linkedin size={12} />
                      Connect
                    </a>
                    <a
                      href="mailto:vklokeshvk@gmail.com"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-[12px] font-medium hover:bg-accent transition-colors"
                    >
                      <Mail size={12} />
                      Email
                    </a>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="name" className="block text-[11px] font-medium uppercase tracking-wider mb-1 text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-3 py-2 rounded-md border border-border bg-background text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-wider mb-1 text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 rounded-md border border-border bg-background text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[11px] font-medium uppercase tracking-wider mb-1 text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Your message..."
                      className="w-full px-3 py-2 rounded-md border border-border bg-background text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
                    />
                  </div>

                  {msg && (
                    <p className={`text-[12px] ${msg.ok ? "text-foreground" : "text-destructive"}`}>
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-[12px] font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {submitting ? "Sending..." : "Send"}
                    <Send size={11} />
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <p className="text-[11px] text-muted-foreground text-center">
          {"Lokesh Venkatesan"} &middot; 2024
        </p>
      </footer>
    </div>
  )
}
