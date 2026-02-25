"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Card,
  CardContent,
  Chip,
  TextField,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  Alert,
  Divider,
} from "@mui/material"
import {
  Home as HomeIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Storage as StorageIcon,
  BarChart as BarChartIcon,
  Handyman as HandymanIcon,
  Send as SendIcon,
} from "@mui/icons-material"
import { useTheme as useNextTheme } from "next-themes"
import Image from "next/image"
import { sendContactEmail } from "./actions/send-email"

type ActiveSection = "home" | "about" | "education" | "skills" | "projects" | "contact"

const navItems: { key: ActiveSection; label: string; icon: React.ReactNode }[] = [
  { key: "home", label: "Home", icon: <HomeIcon fontSize="small" /> },
  { key: "about", label: "About", icon: <PersonIcon fontSize="small" /> },
  { key: "education", label: "Education", icon: <SchoolIcon fontSize="small" /> },
  { key: "skills", label: "Skills", icon: <CodeIcon fontSize="small" /> },
  { key: "projects", label: "Projects", icon: <BuildIcon fontSize="small" /> },
  { key: "contact", label: "Contact", icon: <MailIcon fontSize="small" /> },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const { theme, setTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width:768px)")

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

  // Shared styles
  const bg = isDark ? "#111827" : "#fff"
  const bgAlt = isDark ? "#1f2937" : "#f8fafc"
  const textPrimary = isDark ? "#f3f4f6" : "#1e293b"
  const textSecondary = isDark ? "#9ca3af" : "#64748b"
  const blue = "#2563eb"
  const blueLight = isDark ? "rgba(37,99,235,0.15)" : "#eff6ff"
  const border = isDark ? "#374151" : "#e2e8f0"
  const cardBg = isDark ? "#1f2937" : "#fff"
  const inputBg = isDark ? "#374151" : "#fff"

  const sectionWrapper = {
    minHeight: "calc(100vh - 56px)",
    display: "flex",
    alignItems: "center",
    py: { xs: 4, md: 6 },
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: bg, transition: "background-color 0.2s" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isDark ? "rgba(17,24,39,0.9)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${border}`,
        }}
      >
        <Toolbar variant="dense" sx={{ px: { xs: 1.5, md: 3 }, minHeight: 48 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: textPrimary,
              fontSize: "0.875rem",
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 3 },
            }}
          >
            Lokesh Venkatesan
          </Typography>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.key}
                  size="small"
                  startIcon={item.icon}
                  onClick={() => navigate(item.key)}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.8rem",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    color: activeSection === item.key ? "#fff" : textSecondary,
                    bgcolor: activeSection === item.key ? blue : "transparent",
                    "&:hover": {
                      bgcolor: activeSection === item.key ? blue : blueLight,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Theme toggle */}
          {mounted && (
            <IconButton
              size="small"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              sx={{ color: textSecondary, ml: 1 }}
            >
              {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton size="small" onClick={() => setDrawerOpen(true)} sx={{ color: textSecondary, ml: 0.5 }}>
              <MenuIcon fontSize="small" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 220, bgcolor: cardBg } }}
      >
        <Box sx={{ pt: 1 }}>
          <List dense>
            {navItems.map((item) => (
              <ListItemButton
                key={item.key}
                selected={activeSection === item.key}
                onClick={() => navigate(item.key)}
                sx={{
                  py: 1,
                  mx: 1,
                  borderRadius: 1,
                  "&.Mui-selected": { bgcolor: blueLight, color: blue },
                  "&.Mui-selected:hover": { bgcolor: blueLight },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: activeSection === item.key ? blue : textSecondary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.8rem",
                    fontWeight: activeSection === item.key ? 600 : 400,
                    color: activeSection === item.key ? blue : textPrimary,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Content */}
      <Box sx={{ pt: "48px" }}>
        {/* HOME */}
        {activeSection === "home" && (
          <Box sx={{ ...sectionWrapper, bgcolor: bgAlt }}>
            <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column-reverse", md: "row" },
                  alignItems: "center",
                  gap: { xs: 3, md: 5 },
                }}
              >
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: textPrimary,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    Lokesh
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: blue,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      lineHeight: 1.2,
                      mb: 1,
                    }}
                  >
                    Venkatesan
                  </Typography>
                  <Typography sx={{ color: textSecondary, fontSize: "0.9rem", mb: 1 }}>
                    Data Science Student & Aspiring Engineer
                  </Typography>
                  <Typography sx={{ color: textSecondary, fontSize: "0.8rem", mb: 0.5 }}>
                    Engineering graduate with strong analytical and programming skills, currently pursuing
                    {"Master's"} in Data Science.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, gap: 0.5, mb: 2, color: textSecondary }}>
                    <LocationIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: "0.75rem" }}>Brisbane, Queensland, Australia</Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" }, gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate("contact")}
                      sx={{
                        bgcolor: blue,
                        textTransform: "none",
                        fontSize: "0.75rem",
                        px: 2,
                        "&:hover": { bgcolor: "#1d4ed8" },
                      }}
                    >
                      Get In Touch
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<LinkedInIcon sx={{ fontSize: 14 }} />}
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        px: 2,
                        borderColor: border,
                        color: textPrimary,
                        "&:hover": { borderColor: blue, color: blue },
                      }}
                    >
                      LinkedIn
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DescriptionIcon sx={{ fontSize: 14 }} />}
                      href="/resume.pdf"
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        px: 2,
                        borderColor: border,
                        color: textPrimary,
                        "&:hover": { borderColor: blue, color: blue },
                      }}
                    >
                      Resume
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ position: "relative", flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: { xs: 140, md: 200 },
                      height: { xs: 140, md: 200 },
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `3px solid ${isDark ? "#374151" : "#fff"}`,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Image
                      src="/lokesh-photo.jpg"
                      alt="Lokesh Venkatesan"
                      width={200}
                      height={200}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      bgcolor: blue,
                      color: "#fff",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <Box sx={{ ...sectionWrapper, bgcolor: bg }}>
            <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: textPrimary, textAlign: "center", mb: 3, fontSize: { xs: "1.2rem", md: "1.4rem" } }}
              >
                About Me
              </Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: textSecondary, fontSize: "0.8rem", lineHeight: 1.7, mb: 1.5 }}>
                    I am a detail-oriented and motivated engineering graduate with strong analytical and programming
                    skills. Proficient in Python, SQL, R, and C#, with a keen interest in data analysis, software
                    development, and problem-solving.
                  </Typography>
                  <Typography sx={{ color: textSecondary, fontSize: "0.8rem", lineHeight: 1.7, mb: 2 }}>
                    Known for a fast-learning curve and adaptability, I am eager to apply technical knowledge in a
                    professional setting and contribute meaningfully to innovative projects. Committed to continuous
                    learning and development in the tech industry.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate("skills")}
                      sx={{ bgcolor: blue, textTransform: "none", fontSize: "0.75rem", "&:hover": { bgcolor: "#1d4ed8" } }}
                    >
                      View Skills
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate("projects")}
                      sx={{ textTransform: "none", fontSize: "0.75rem", borderColor: border, color: textPrimary, "&:hover": { borderColor: blue, color: blue } }}
                    >
                      See Projects
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DescriptionIcon sx={{ fontSize: 14 }} />}
                      href="/resume.pdf"
                      download="Lokesh_Venkatesan_Resume.pdf"
                      sx={{ textTransform: "none", fontSize: "0.75rem", borderColor: border, color: textPrimary, "&:hover": { borderColor: blue, color: blue } }}
                    >
                      Download Resume
                    </Button>
                  </Box>
                </Box>

                <Card
                  variant="outlined"
                  sx={{
                    minWidth: { xs: "100%", md: 220 },
                    bgcolor: bgAlt,
                    borderColor: border,
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Typography sx={{ fontWeight: 600, color: textPrimary, fontSize: "0.8rem", mb: 1.5 }}>
                      Languages
                    </Typography>
                    {languages.map((lang, i) => (
                      <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: i < languages.length - 1 ? 1 : 0 }}>
                        <Typography sx={{ color: textSecondary, fontSize: "0.8rem" }}>{lang.language}</Typography>
                        <Chip label={lang.level} size="small" variant="outlined" sx={{ fontSize: "0.7rem", height: 22, borderColor: border, color: textSecondary }} />
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Box>
            </Container>
          </Box>
        )}

        {/* EDUCATION */}
        {activeSection === "education" && (
          <Box sx={{ ...sectionWrapper, bgcolor: bgAlt }}>
            <Container maxWidth="sm" sx={{ px: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: textPrimary, textAlign: "center", mb: 3, fontSize: { xs: "1.2rem", md: "1.4rem" } }}
              >
                Education
              </Typography>
              <Card variant="outlined" sx={{ bgcolor: cardBg, borderColor: border, borderRadius: 2 }}>
                <CardContent sx={{ p: { xs: 2, md: 3 }, "&:last-child": { pb: 2 } }}>
                  <Typography sx={{ fontWeight: 700, color: blue, fontSize: "1rem", mb: 0.25 }}>
                    Master of Information Technology
                  </Typography>
                  <Typography sx={{ fontWeight: 500, color: textPrimary, fontSize: "0.85rem", mb: 1.5 }}>
                    Data Science Major
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 1.5 }}>
                    <Box>
                      <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Duration
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: textPrimary }}>July 2024 - June 2026</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Location
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: textPrimary }}>Brisbane, Queensland, Australia</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                      Status
                    </Typography>
                    <Chip
                      label="Currently Enrolled"
                      size="small"
                      sx={{ bgcolor: blueLight, color: blue, fontSize: "0.7rem", fontWeight: 600, height: 24 }}
                    />
                  </Box>

                  <Divider sx={{ borderColor: border, my: 1.5 }} />

                  <Typography sx={{ color: textSecondary, fontSize: "0.8rem", lineHeight: 1.6 }}>
                    Pursuing advanced studies in data science, focusing on machine learning, statistical analysis,
                    and data visualization techniques to solve real-world problems.
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          </Box>
        )}

        {/* SKILLS */}
        {activeSection === "skills" && (
          <Box sx={{ ...sectionWrapper, bgcolor: bg }}>
            <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: textPrimary, textAlign: "center", mb: 3, fontSize: { xs: "1.2rem", md: "1.4rem" } }}
              >
                Technical Skills
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                  gap: 2,
                }}
              >
                {[
                  { title: "Programming", icon: <CodeIcon sx={{ fontSize: 20, color: blue }} />, skills: technicalSkills.programming },
                  { title: "Database", icon: <StorageIcon sx={{ fontSize: 20, color: blue }} />, skills: technicalSkills.database },
                  { title: "Data Analysis", icon: <BarChartIcon sx={{ fontSize: 20, color: blue }} />, skills: technicalSkills.dataAnalysis },
                  { title: "Tools", icon: <HandymanIcon sx={{ fontSize: 20, color: blue }} />, skills: technicalSkills.tools },
                ].map((cat) => (
                  <Card
                    key={cat.title}
                    variant="outlined"
                    sx={{
                      bgcolor: cardBg,
                      borderColor: border,
                      borderRadius: 2,
                      textAlign: "center",
                      transition: "box-shadow 0.2s",
                      "&:hover": { boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
                    }}
                  >
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      {cat.icon}
                      <Typography sx={{ fontWeight: 600, color: textPrimary, fontSize: "0.8rem", mt: 0.5, mb: 1 }}>
                        {cat.title}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {cat.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: blueLight,
                              color: blue,
                              fontSize: "0.7rem",
                              fontWeight: 500,
                              height: 24,
                              width: "100%",
                              "& .MuiChip-label": { px: 1 },
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Container>
          </Box>
        )}

        {/* PROJECTS */}
        {activeSection === "projects" && (
          <Box sx={{ ...sectionWrapper, bgcolor: bgAlt }}>
            <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: textPrimary, textAlign: "center", mb: 3, fontSize: { xs: "1.2rem", md: "1.4rem" } }}
              >
                Featured Project
              </Typography>
              <Card variant="outlined" sx={{ bgcolor: cardBg, borderColor: border, borderRadius: 2 }}>
                <CardContent sx={{ p: { xs: 2, md: 3 }, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "center" }, gap: 1, mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, color: blue, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                      Numerical Board Game Suite
                    </Typography>
                    <Chip label="C#" size="small" variant="outlined" sx={{ fontSize: "0.7rem", borderColor: border, color: textSecondary, width: "fit-content" }} />
                  </Box>
                  <Typography sx={{ color: textSecondary, fontSize: "0.8rem", mb: 1.5 }}>
                    Console-based Application with Multiple 2-Player Board Games
                  </Typography>
                  <Typography sx={{ color: textSecondary, fontSize: "0.8rem", lineHeight: 1.6, mb: 2 }}>
                    Developed a comprehensive console-based application in C# implementing multiple 2-player board
                    games including Tic-Tac-Toe, Gomoku, and Notakto.
                  </Typography>

                  <Typography sx={{ fontWeight: 600, color: textPrimary, fontSize: "0.8rem", mb: 1 }}>
                    Key Features:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2, "& li": { color: textSecondary, fontSize: "0.8rem", lineHeight: 1.8 } }}>
                    <li>Applied Object-Oriented Programming (OOP) principles</li>
                    <li>Implemented Save/Load functionality for game persistence</li>
                    <li>Added Undo/Redo functionality for enhanced user experience</li>
                    <li>Designed flexible architecture to allow easy integration of new games</li>
                  </Box>

                  <Typography sx={{ fontWeight: 600, color: textPrimary, fontSize: "0.8rem", mb: 1 }}>
                    Technologies Used:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                    {["C#", "OOP", "Console Application", "Game Development"].map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        sx={{ bgcolor: blueLight, color: blue, fontSize: "0.7rem", fontWeight: 500, height: 24 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Container>
          </Box>
        )}

        {/* CONTACT */}
        {activeSection === "contact" && (
          <Box sx={{ ...sectionWrapper, bgcolor: bg }}>
            <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: textPrimary, textAlign: "center", mb: 3, fontSize: { xs: "1.2rem", md: "1.4rem" } }}
              >
                Get In Touch
              </Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                {/* Left column */}
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: textPrimary, fontSize: "0.9rem", mb: 0.5 }}>
                    {"Let's Connect"}
                  </Typography>
                  <Typography sx={{ color: textSecondary, fontSize: "0.8rem", lineHeight: 1.6, mb: 2 }}>
                    {"I'm always interested in discussing new opportunities, collaborations, or projects related to data science and software development."}
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                    {[
                      { icon: <MailIcon sx={{ fontSize: 16, color: blue }} />, text: "vklokeshvk@gmail.com", href: "mailto:vklokeshvk@gmail.com" },
                      { icon: <PhoneIcon sx={{ fontSize: 16, color: blue }} />, text: "+61 422 934 518", href: "tel:+61422934518" },
                      { icon: <LocationIcon sx={{ fontSize: 16, color: blue }} />, text: "Brisbane, Queensland, Australia" },
                      { icon: <LinkedInIcon sx={{ fontSize: 16, color: blue }} />, text: "lokesh-venkatesan-vk0706", href: "https://www.linkedin.com/in/lokesh-venkatesan-vk0706" },
                    ].map((item, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.5,
                          bgcolor: bgAlt,
                          borderRadius: 1.5,
                        }}
                      >
                        {item.icon}
                        {item.href ? (
                          <Typography
                            component="a"
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            sx={{
                              color: textPrimary,
                              fontSize: "0.75rem",
                              textDecoration: "none",
                              wordBreak: "break-all",
                              "&:hover": { color: blue },
                            }}
                          >
                            {item.text}
                          </Typography>
                        ) : (
                          <Typography sx={{ color: textPrimary, fontSize: "0.75rem" }}>{item.text}</Typography>
                        )}
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<LinkedInIcon sx={{ fontSize: 14 }} />}
                      href="https://www.linkedin.com/in/lokesh-venkatesan-vk0706"
                      target="_blank"
                      sx={{ bgcolor: blue, textTransform: "none", fontSize: "0.75rem", "&:hover": { bgcolor: "#1d4ed8" } }}
                    >
                      Connect on LinkedIn
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<MailIcon sx={{ fontSize: 14 }} />}
                      href="mailto:vklokeshvk@gmail.com"
                      sx={{ textTransform: "none", fontSize: "0.75rem", borderColor: border, color: textPrimary, "&:hover": { borderColor: blue, color: blue } }}
                    >
                      Send Email
                    </Button>
                  </Box>
                </Box>

                {/* Right column - form */}
                <Card variant="outlined" sx={{ flex: 1, bgcolor: cardBg, borderColor: border, borderRadius: 2 }}>
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Typography sx={{ fontWeight: 600, color: textPrimary, fontSize: "0.85rem", mb: 0.25 }}>
                      Send a Message
                    </Typography>
                    <Typography sx={{ color: textSecondary, fontSize: "0.7rem", mb: 2 }}>
                      {"I'll get back to you as soon as possible"}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <TextField
                          name="name"
                          label="Name"
                          size="small"
                          required
                          fullWidth
                          placeholder="Your name"
                          slotProps={{
                            inputLabel: { sx: { fontSize: "0.8rem" } },
                            input: { sx: { fontSize: "0.8rem", bgcolor: inputBg } },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: border },
                              "&:hover fieldset": { borderColor: blue },
                              "&.Mui-focused fieldset": { borderColor: blue },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: blue },
                          }}
                        />
                        <TextField
                          name="email"
                          label="Email"
                          type="email"
                          size="small"
                          required
                          fullWidth
                          placeholder="your.email@example.com"
                          slotProps={{
                            inputLabel: { sx: { fontSize: "0.8rem" } },
                            input: { sx: { fontSize: "0.8rem", bgcolor: inputBg } },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: border },
                              "&:hover fieldset": { borderColor: blue },
                              "&.Mui-focused fieldset": { borderColor: blue },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: blue },
                          }}
                        />
                        <TextField
                          name="message"
                          label="Message"
                          multiline
                          rows={3}
                          size="small"
                          required
                          fullWidth
                          placeholder="Your message..."
                          slotProps={{
                            inputLabel: { sx: { fontSize: "0.8rem" } },
                            input: { sx: { fontSize: "0.8rem", bgcolor: inputBg } },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: border },
                              "&:hover fieldset": { borderColor: blue },
                              "&.Mui-focused fieldset": { borderColor: blue },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: blue },
                          }}
                        />

                        {submitMessage && (
                          <Alert
                            severity={submitMessage.type === "success" ? "success" : "error"}
                            sx={{ fontSize: "0.75rem", py: 0 }}
                          >
                            {submitMessage.text}
                            {submitMessage.type === "error" && (
                              <Box sx={{ mt: 0.5 }}>
                                <Typography component="span" sx={{ fontSize: "0.7rem" }}>
                                  {"Reach me directly at: "}
                                </Typography>
                                <Typography
                                  component="a"
                                  href="mailto:vklokeshvk@gmail.com"
                                  sx={{ fontSize: "0.7rem", color: blue, textDecoration: "underline" }}
                                >
                                  vklokeshvk@gmail.com
                                </Typography>
                              </Box>
                            )}
                          </Alert>
                        )}

                        <Button
                          type="submit"
                          variant="contained"
                          size="small"
                          disabled={isSubmitting}
                          endIcon={<SendIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            bgcolor: blue,
                            textTransform: "none",
                            fontSize: "0.75rem",
                            "&:hover": { bgcolor: "#1d4ed8" },
                            "&.Mui-disabled": { bgcolor: isDark ? "#374151" : "#e2e8f0" },
                          }}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Box>
            </Container>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: isDark ? "#0f172a" : "#1e293b", py: 2 }}>
        <Typography sx={{ color: "#94a3b8", fontSize: "0.7rem", textAlign: "center" }}>
          {"© 2024 Lokesh Venkatesan. All rights reserved."}
        </Typography>
      </Box>
    </Box>
  )
}
