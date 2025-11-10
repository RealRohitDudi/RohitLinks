# API Documentation

## Storage API

The storage layer provides utilities for persisting and retrieving user data.

### Functions

#### `getLinks(): PersonalLink[]`
Retrieves all stored links from localStorage.

**Returns:** Array of PersonalLink objects, or DEFAULT_LINKS if nothing is stored.

**Example:**
\`\`\`typescript
import { getLinks } from "@/lib/storage"

const links = getLinks()
console.log(links) // PersonalLink[]
\`\`\`

#### `saveLinks(links: PersonalLink[]): void`
Saves links to localStorage and dispatches a storage event for cross-tab sync.

**Parameters:**
- `links`: Array of PersonalLink objects

**Example:**
\`\`\`typescript
import { saveLinks } from "@/lib/storage"

const newLinks = [...]
saveLinks(newLinks)
\`\`\`

#### `getProfile(): ProfileData`
Retrieves profile data from localStorage.

**Returns:** ProfileData object or DEFAULT_PROFILE

#### `saveProfile(profile: ProfileData): void`
Saves profile data to localStorage.

**Parameters:**
- `profile`: ProfileData object with name, bio, and optional profileImage

#### `getTheme(): ThemeSettings`
Retrieves theme settings from localStorage.

**Returns:** ThemeSettings with mode and accentColor

#### `saveTheme(theme: ThemeSettings): void`
Saves theme settings to localStorage.

**Parameters:**
- `theme`: ThemeSettings object

#### `exportData(): string`
Exports all data (links, profile, theme) as JSON string.

**Returns:** JSON string with all data including export timestamp and version

**Example:**
\`\`\`typescript
import { exportData } from "@/lib/storage"

const jsonBackup = exportData()
// Save to file or send to server
\`\`\`

#### `importData(jsonString: string): boolean`
Imports data from JSON string and saves to localStorage.

**Parameters:**
- `jsonString`: JSON string from exportData()

**Returns:** true if import was successful, false otherwise

**Example:**
\`\`\`typescript
import { importData } from "@/lib/storage"

const success = importData(jsonString)
if (success) {
  console.log("Data imported!")
} else {
  console.log("Import failed")
}
\`\`\`

#### `clearAllData(): void`
Clears all stored data from localStorage.

**Example:**
\`\`\`typescript
import { clearAllData } from "@/lib/storage"

clearAllData() // All data is removed
\`\`\`

---

## Theme API

### `applyTheme(theme: ThemeSettings): void`
Applies theme to the document by updating CSS variables and DOM classes.

**Parameters:**
- `theme`: ThemeSettings with mode and accentColor

**Example:**
\`\`\`typescript
import { applyTheme } from "@/lib/theme-utils"

applyTheme({ mode: "dark", accentColor: "purple" })
\`\`\`

### `getSystemTheme(): "light" | "dark"`
Detects the system's preferred theme.

**Returns:** "light" or "dark" based on system preferences

### `watchSystemTheme(callback: (mode: "light" | "dark") => void): () => void`
Watches for system theme changes and calls callback when theme changes.

**Parameters:**
- `callback`: Function to call with new theme when it changes

**Returns:** Unsubscribe function to stop watching

**Example:**
\`\`\`typescript
import { watchSystemTheme } from "@/lib/theme-utils"

const unsubscribe = watchSystemTheme((mode) => {
  console.log("System theme changed to:", mode)
})

// Later, stop watching
unsubscribe()
\`\`\`

---

## SEO API

### `generateMetadata(overrides?: Partial<Metadata>): Metadata`
Generates comprehensive SEO metadata for the page.

**Parameters:**
- `overrides` (optional): Partial metadata to override defaults

**Returns:** Metadata object for Next.js

**Example:**
\`\`\`typescript
import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "My Custom Title"
})
\`\`\`

### `generateJSONLD(): Record<string, any>`
Generates JSON-LD structured data for search engines.

**Returns:** JSON-LD object with Person and WebSite schema

### `validateSEO(metadata: Metadata): { valid: boolean; issues: string[] }`
Validates metadata against SEO best practices.

**Parameters:**
- `metadata`: Metadata object to validate

**Returns:** Object with validation result and list of issues

**Example:**
\`\`\`typescript
import { validateSEO, generateMetadata } from "@/lib/seo"

const metadata = generateMetadata()
const { valid, issues } = validateSEO(metadata)

if (!valid) {
  console.log("SEO Issues:", issues)
}
\`\`\`

---

## Performance API

### `observeWebVitals(): void`
Observes Core Web Vitals (FCP, LCP, CLS) and reports metrics.

**Example:**
\`\`\`typescript
import { observeWebVitals } from "@/lib/performance-utils"

observeWebVitals()
\`\`\`

### `reportMetrics(metrics: PerformanceMetrics): void`
Reports performance metrics (logs in development, sends to analytics in production).

**Parameters:**
- `metrics`: PerformanceMetrics object

### `optimizeImages(): void`
Applies lazy loading to all images on the page.

**Example:**
\`\`\`typescript
import { optimizeImages } from "@/lib/performance-utils"

optimizeImages()
\`\`\`

---

## Component API

### ProfileHeader
Displays user profile with image, name, and bio.

**Props:**
- `profile` (ProfileData): User profile data
- `isPreview` (boolean, optional): Show preview mode indicator

### LinksDisplay
Displays list of personal links in a grid format.

**Props:**
- `links` (PersonalLink[]): Array of links to display
- `isAdmin` (boolean, optional): Show admin controls
- `onEdit` (function, optional): Callback when edit is clicked
- `onDelete` (function, optional): Callback when delete is clicked
- `onToggleVisibility` (function, optional): Callback when visibility is toggled

### ThemeSwitcher
Displays theme and accent color picker.

**Props:**
- `theme` (ThemeSettings): Current theme
- `onThemeChange` (function): Callback when theme changes

### DraggableLinkItem
Displays a link item with drag-drop support.

**Props:**
- `link` (PersonalLink): Link data
- `index` (number): Position in list
- `total` (number): Total number of links
- `isDragging` (boolean, optional): Whether item is being dragged
- `onEdit` (function): Edit callback
- `onDelete` (function): Delete callback
- `onToggleVisibility` (function): Visibility toggle callback
- `onMoveUp` (function): Move up callback
- `onMoveDown` (function): Move down callback
- `onDragStart` (function, optional): Drag start callback
- `onDragOver` (function, optional): Drag over callback
- `onDrop` (function, optional): Drop callback
- `onDragEnd` (function, optional): Drag end callback

---

## Type Definitions

### PersonalLink
\`\`\`typescript
interface PersonalLink {
  id: string
  title: string
  url: string
  icon: string
  visible: boolean
  order: number
}
\`\`\`

### ProfileData
\`\`\`typescript
interface ProfileData {
  name: string
  bio: string
  profileImage?: string
}
\`\`\`

### ThemeSettings
\`\`\`typescript
interface ThemeSettings {
  mode: "light" | "dark"
  accentColor: "cyan" | "purple" | "pink" | "green" | "orange" | "red"
}
\`\`\`

### PerformanceMetrics
\`\`\`typescript
interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  cls?: number // Cumulative Layout Shift
  fid?: number // First Input Delay
  ttfb?: number // Time to First Byte
}
\`\`\`
