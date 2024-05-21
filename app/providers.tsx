"use client"

import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <style
        jsx
        global
      >{`:root { --font-sans: ${fontSans.style.fontFamily};}}`}</style>
      <div className={cn(
        "min-h-screen min-w-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        {children}
      </div>
    </ThemeProvider>
  )
}