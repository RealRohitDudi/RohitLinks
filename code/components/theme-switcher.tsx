"use client"

import type { ThemeSettings } from "@/types"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { applyTheme } from "@/lib/theme-utils"

interface ThemeSwitcherProps {
  theme: ThemeSettings
  onThemeChange: (theme: ThemeSettings) => void
}

const ACCENT_COLORS = [
  { name: "cyan", value: "#00d9ff" },
  { name: "purple", value: "#8b5cf6" },
  { name: "pink", value: "#ec4899" },
  { name: "green", value: "#10b981" },
  { name: "orange", value: "#f97316" },
  { name: "red", value: "#ef4444" },
]

export function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    applyTheme(theme)
  }, [theme])

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Theme Toggle */}
      <div
        className="flex gap-2 bg-card border border-border rounded-lg p-2 backdrop-blur-sm shadow-lg"
        role="group"
        aria-label="Theme mode selector"
      >
        <button
          onClick={() => onThemeChange({ ...theme, mode: "light" })}
          className={`p-2 rounded transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            theme.mode === "light"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Light mode"
          aria-pressed={theme.mode === "light"}
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => onThemeChange({ ...theme, mode: "dark" })}
          className={`p-2 rounded transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            theme.mode === "dark" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Dark mode"
          aria-pressed={theme.mode === "dark"}
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      {/* Accent Color Picker */}
      <div
        className="flex flex-wrap gap-2 bg-card border border-border rounded-lg p-2 backdrop-blur-sm shadow-lg max-w-xs"
        role="group"
        aria-label="Accent color selector"
      >
        {ACCENT_COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => onThemeChange({ ...theme, accentColor: color.name as any })}
            className={`w-6 h-6 rounded-full transition-all border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-primary ${
              theme.accentColor === color.name ? "border-foreground scale-110" : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: color.value }}
            aria-label={`${color.name} accent color`}
            aria-pressed={theme.accentColor === color.name}
            title={`Set ${color.name} accent color`}
          />
        ))}
      </div>
    </div>
  )
}
