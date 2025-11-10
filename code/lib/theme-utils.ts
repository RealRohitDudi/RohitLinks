"use client"

import type { ThemeSettings } from "@/types"

const ACCENT_COLOR_MAP: Record<ThemeSettings["accentColor"], { hex: string; hsl: string }> = {
  cyan: { hex: "#00d9ff", hsl: "191 100% 50%" },
  purple: { hex: "#8b5cf6", hsl: "270 95% 64%" },
  pink: { hex: "#ec4899", hsl: "330 81% 60%" },
  green: { hex: "#10b981", hsl: "160 84% 39%" },
  orange: { hex: "#f97316", hsl: "33 97% 55%" },
  red: { hex: "#ef4444", hsl: "0 84% 60%" },
}

export function applyTheme(theme: ThemeSettings): void {
  const root = document.documentElement
  const accentColor = ACCENT_COLOR_MAP[theme.accentColor]

  // Update mode
  if (theme.mode === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }

  // Update accent colors (using CSS variables)
  root.style.setProperty("--primary", accentColor.hex)
  root.style.setProperty("--primary-hsl", accentColor.hsl)

  // Update chart colors to match accent
  root.style.setProperty("--chart-1", accentColor.hex)
}

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function watchSystemTheme(callback: (mode: "light" | "dark") => void): () => void {
  if (typeof window === "undefined") return () => {}

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches ? "dark" : "light")
  }

  mediaQuery.addEventListener("change", handleChange)

  return () => {
    mediaQuery.removeEventListener("change", handleChange)
  }
}

export const THEME_TRANSITION_CLASS = "transition-colors duration-300"

export function getThemePreference(): ThemeSettings {
  if (typeof localStorage === "undefined") {
    return { mode: "dark", accentColor: "cyan" }
  }

  try {
    const stored = localStorage.getItem("linktree_theme")
    return stored ? JSON.parse(stored) : { mode: "dark", accentColor: "cyan" }
  } catch {
    return { mode: "dark", accentColor: "cyan" }
  }
}

export function saveThemePreference(theme: ThemeSettings): void {
  if (typeof localStorage === "undefined") return

  localStorage.setItem("linktree_theme", JSON.stringify(theme))
}

export const COLOR_NAMES = ["cyan", "purple", "pink", "green", "orange", "red"] as const
