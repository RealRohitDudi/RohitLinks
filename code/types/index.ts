export interface PersonalLink {
  id: string
  title: string
  url: string
  icon: string
  visible: boolean
  order: number
}

export interface ProfileData {
  name: string
  bio: string
  profileImage?: string
}

export interface ThemeSettings {
  mode: "light" | "dark"
  accentColor: "cyan" | "purple" | "pink" | "green" | "orange" | "red"
}
