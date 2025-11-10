"use client"

import React, { useEffect } from "react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { getTheme, saveTheme } from "@/lib/storage"
import { applyTheme } from "@/lib/theme-utils"
import { DEFAULT_LINKS, DEFAULT_PROFILE } from "@/lib/constants"
import { ProfileHeader } from "@/components/profile-header"
import { LinksDisplay } from "@/components/links-display"
import { PageFooter } from "@/components/page-footer"

export function ThemeSwitcherClient() {
  const [theme, setTheme] = React.useState({ mode: "dark" as const, accentColor: "cyan" as const })
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = getTheme()
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme)
    saveTheme(newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    // Server-side render placeholder with default theme
    return (
      <main className="min-h-screen starfield flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl flex-1">
          <div className="mb-16 md:mb-20">
            <ProfileHeader profile={DEFAULT_PROFILE} />
          </div>
          <div className="mb-8">
            <LinksDisplay links={DEFAULT_LINKS} />
          </div>
        </div>
        <div className="w-full">
          <PageFooter />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen starfield flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl flex-1">
        <div className="mb-16 md:mb-20">
          <ProfileHeader profile={DEFAULT_PROFILE} />
        </div>
        <div className="mb-8">
          <LinksDisplay links={DEFAULT_LINKS} />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <PageFooter />
      </div>

      <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
    </main>
  )
}
