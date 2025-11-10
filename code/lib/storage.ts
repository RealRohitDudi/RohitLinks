import type { PersonalLink, ProfileData, ThemeSettings } from "@/types"
import { DEFAULT_LINKS, DEFAULT_PROFILE } from "./constants"

const STORAGE_KEYS = {
  LINKS: "linktree_links",
  PROFILE: "linktree_profile",
  THEME: "linktree_theme",
}

export function getLinks(): PersonalLink[] {
  if (typeof window === "undefined") return DEFAULT_LINKS
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LINKS)
    return stored ? JSON.parse(stored) : DEFAULT_LINKS
  } catch {
    return DEFAULT_LINKS
  }
}

export function saveLinks(links: PersonalLink[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links))
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEYS.LINKS,
        newValue: JSON.stringify(links),
      }),
    )
  } catch (error) {
    console.error("Failed to save links:", error)
  }
}

export function getProfile(): ProfileData {
  if (typeof window === "undefined") return DEFAULT_PROFILE
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE)
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE
  } catch {
    return DEFAULT_PROFILE
  }
}

export function saveProfile(profile: ProfileData): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEYS.PROFILE,
        newValue: JSON.stringify(profile),
      }),
    )
  } catch (error) {
    console.error("Failed to save profile:", error)
  }
}

export function getTheme(): ThemeSettings {
  if (typeof window === "undefined") return { mode: "dark", accentColor: "cyan" }
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME)
    return stored ? JSON.parse(stored) : { mode: "dark", accentColor: "cyan" }
  } catch {
    return { mode: "dark", accentColor: "cyan" }
  }
}

export function saveTheme(theme: ThemeSettings): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme))
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEYS.THEME,
        newValue: JSON.stringify(theme),
      }),
    )
  } catch (error) {
    console.error("Failed to save theme:", error)
  }
}

export function exportData(): string {
  const data = {
    links: getLinks(),
    profile: getProfile(),
    theme: getTheme(),
    exportedAt: new Date().toISOString(),
    version: "1.0",
  }
  return JSON.stringify(data, null, 2)
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString)

    // Validate data structure
    if (!data.links || !data.profile || !data.theme) {
      console.warn("Invalid data structure")
      return false
    }

    if (data.links) saveLinks(data.links)
    if (data.profile) saveProfile(data.profile)
    if (data.theme) saveTheme(data.theme)
    return true
  } catch (error) {
    console.error("Failed to import data:", error)
    return false
  }
}

export function clearAllData(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(STORAGE_KEYS.LINKS)
    localStorage.removeItem(STORAGE_KEYS.PROFILE)
    localStorage.removeItem(STORAGE_KEYS.THEME)
  } catch (error) {
    console.error("Failed to clear data:", error)
  }
}

export function getProfileData(): ProfileData {
  const profile = getProfile()
  const links = getLinks()
  return {
    ...profile,
    links,
  }
}
