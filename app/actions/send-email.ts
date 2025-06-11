"use server"

import { Resend } from "resend"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!name || !email || !message) {
    return {
      success: false,
      error: "All fields are required",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address",
    }
  }

  // Check if API key exists
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set")
    return {
      success: false,
      error: "Email service is not configured. Please try contacting me directly via email.",
    }
  }

  // Validate API key format (Resend keys start with 're_')
  if (!apiKey.startsWith("re_")) {
    console.error("Invalid Resend API key format")
    return {
      success: false,
      error: "Email service configuration error. Please try contacting me directly via email.",
    }
  }

  const resend = new Resend(apiKey)

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You can customize this
      to: ["vklokeshvk@gmail.com"], // Your email address
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f3f4f6; border-radius: 5px;">
              <strong>${name}</strong><br>
              <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 5px;">Message:</h3>
            <div style="padding: 15px; background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 5px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    })

    if (error) {
      console.error("Resend error:", error)

      // Handle specific Resend errors
      if (error.message?.includes("API key")) {
        return {
          success: false,
          error: "Email service authentication failed. Please try contacting me directly via email.",
        }
      }

      return {
        success: false,
        error: "Failed to send message. Please try contacting me directly via email.",
      }
    }

    console.log("Email sent successfully:", data)
    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Send email error:", error)
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    }
  }
}
