import type { PersonalLink } from "@/types"

export const DEFAULT_LINKS: PersonalLink[] = [
  {
    id: "1",
    title: "Website",
    url: "https://devrohitdudi.vercel.app",
    icon: "globe",
    visible: true,
    order: 0,
  },
  {
    id: "2",
    title: "YouTube",
    url: "https://www.youtube.com/@RealRohitDudi",
    icon: "youtube",
    visible: true,
    order: 1,
  },
  {
    id: "3",
    title: "Instagram",
    url: "https://www.instagram.com/realrohitdudi",
    icon: "instagram",
    visible: true,
    order: 2,
  },
  {
    id: "4",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/RealRohitDudi",
    icon: "linkedin",
    visible: true,
    order: 3,
  },
  {
    id: "5",
    title: "X",
    url: "https://x.com/RealRohitDudi",
    icon: "twitter",
    visible: true,
    order: 4,
  },
  {
    id: "6",
    title: "GitHub",
    url: "https://www.github.com/RealRohitDudi",
    icon: "github",
    visible: true,
    order: 5,
  },
  {
    id: "7",
    title: "Facebook",
    url: "https://www.facebook.com/RealRohitDudi",
    icon: "facebook",
    visible: true,
    order: 6,
  },
  {
    id: "8",
    title: "Discord",
    url: "https://discord.gg/ZHM6gfDz",
    icon: "discord",
    visible: true,
    order: 7,
  },
  {
    id: "9",
    title: "Telegram",
    url: "https://t.me/RealRohitDudi",
    icon: "telegram",
    visible: true,
    order: 8,
  },
  {
    id: "10",
    title: "Threads",
    url: "https://www.threads.com/@realrohitdudi",
    icon: "threads",
    visible: true,
    order: 9,
  },
]

export const DEFAULT_PROFILE = {
  name: "Rohit Dudi",
  bio: "Hey mate! Explore the links & connect with me there.",
  profileImage: "",
}

export const THEME_ACCENT_COLORS = {
  cyan: "#00d9ff",
  purple: "#8b5cf6",
  pink: "#ec4899",
  green: "#10b981",
  orange: "#f97316",
  red: "#ef4444",
}

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // Edit credentials here only. These are only editable via code.
}
