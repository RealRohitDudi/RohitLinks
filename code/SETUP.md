# Personal Website Builder - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ or later
- npm/yarn/pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/linktree-personal.git
   cd linktree-personal
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

   Visit:
   - Public profile: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Update values:
\`\`\`bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com
\`\`\`

### Admin Credentials

Edit `lib/constants.ts`:
\`\`\`typescript
export const ADMIN_CREDENTIALS = {
  username: 'your-username',
  password: 'your-secure-password',
}
\`\`\`

⚠️ **Important**: Change default credentials in production!

### Customize Your Profile

Edit `lib/constants.ts`:

\`\`\`typescript
export const DEFAULT_PROFILE = {
  name: "Your Name",
  bio: "Your bio here",
  profileImage: "", // Add image URL or upload in admin
}

export const DEFAULT_LINKS: PersonalLink[] = [
  {
    id: "1",
    title: "Website",
    url: "https://yoursite.com",
    icon: "globe",
    visible: true,
    order: 0,
  },
  // Add more links...
]
\`\`\`

## Theme Customization

Edit colors in `app/globals.css`:

\`\`\`css
:root {
  --primary: #00d9ff;      /* Cyan - Primary accent */
  --secondary: #6366f1;    /* Indigo - Secondary */
  --accent: #8b5cf6;       /* Purple - Accent */
  --background: #0a0e27;   /* Dark background */
  --foreground: #e8eef9;   /* Light text */
  --card: #1a1f3a;         /* Card background */
}
\`\`\`

### Accent Color Options
- **Cyan**: `#00d9ff` - Default, modern, tech-forward
- **Purple**: `#8b5cf6` - Creative, sophisticated
- **Pink**: `#ec4899` - Bold, vibrant
- **Green**: `#10b981` - Nature, growth
- **Orange**: `#f97316` - Warm, energy
- **Red**: `#ef4444` - Attention, passion

## Project Structure

\`\`\`
linktree-personal/
├── app/
│   ├── page.tsx                  # Public profile (SSG)
│   ├── admin/page.tsx            # Admin dashboard
│   ├── layout.tsx                # Root layout
│   ├── robots.ts                 # SEO robots.txt
│   ├── sitemap.ts                # SEO sitemap.xml
│   └── globals.css               # Theme & styles
├── components/
│   ├── profile-header.tsx        # Profile section
│   ├── links-display.tsx         # Links grid
│   ├── theme-switcher.tsx        # Theme toggle
│   ├── link-icons.tsx            # Social icons
│   ├── theme-provider.tsx        # Theme context
│   └── ui/                       # shadcn UI components
├── lib/
│   ├── constants.ts              # Config & defaults
│   ├── storage.ts                # localStorage utils
│   ├── seo.ts                    # SEO utilities
│   └── utils.ts                  # Helper functions
├── types/
│   └── index.ts                  # TypeScript types
├── public/                       # Static assets
├── .env.example                  # Environment template
├── next.config.mjs               # Next.js config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # Project README
\`\`\`

## TypeScript Types

Key types in `types/index.ts`:

\`\`\`typescript
interface PersonalLink {
  id: string
  title: string
  url: string
  icon: string
  visible: boolean
  order: number
}

interface ProfileData {
  name: string
  bio: string
  profileImage?: string
}

interface ThemeSettings {
  mode: "light" | "dark"
  accentColor: "cyan" | "purple" | "pink" | "green" | "orange" | "red"
}
\`\`\`

## SEO Configuration

The project includes:
- ✅ Auto-generated `sitemap.xml`
- ✅ Auto-generated `robots.txt`
- ✅ JSON-LD structured data (Person + WebSite schema)
- ✅ OpenGraph and Twitter Card tags
- ✅ Canonical URLs
- ✅ Dynamic meta tags

Update SEO metadata in `lib/seo.ts`:

\`\`\`typescript
export function generateMetadata(overrides?: Partial<Metadata>): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com"
  const title = "Your Name - Personal Links"
  const description = "Your description here"
  // ...
}
\`\`\`

## Building & Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Start Production Server
\`\`\`bash
npm run start
\`\`\`

### Deploy to Vercel (Recommended)

1. Push to GitHub:
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. Go to [vercel.com](https://vercel.com)

3. Import GitHub repository

4. Set environment variables:
   - `NEXT_PUBLIC_BASE_URL`: Your deployed URL

5. Click Deploy

## Development Scripts

\`\`\`bash
# Development
npm run dev         # Start dev server at localhost:3000

# Production
npm run build       # Build for production
npm start           # Start production server

# Linting
npm run lint        # Run ESLint
\`\`\`

## LocalStorage Data Format

The app stores data locally:

\`\`\`typescript
// Profile
localStorage.getItem('linktree_profile')
// => { "name": "...", "bio": "...", "profileImage": "..." }

// Links
localStorage.getItem('linktree_links')
// => [{ "id": "1", "title": "...", "url": "...", ... }]

// Theme
localStorage.getItem('linktree_theme')
// => { "mode": "dark", "accentColor": "cyan" }
\`\`\`

### Export/Import Data

Use admin panel to export/import JSON backup of all settings.

## Performance Tips

1. **Image Optimization**
   - Keep images under 100KB
   - Use WebP format when possible
   - Add descriptive alt text

2. **Link Management**
   - Hide unused links instead of deleting
   - Keep link titles short and descriptive
   - Use relevant social icons

3. **SEO**
   - Update profile bio with keywords
   - Include relevant links in your profile
   - Monitor search console for indexing

## Troubleshooting

### Admin Panel Won't Load
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`
- Try incognito/private browsing
- Verify credentials in `lib/constants.ts`

### Changes Not Saving
- Ensure localStorage is enabled
- Check browser dev tools Application tab
- Try exporting data from admin panel

### Styling Issues
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that `globals.css` is imported in layout.tsx

### Dark/Light Mode Not Working
- Check `theme-provider.tsx` is in layout
- Verify localStorage theme key: `linktree_theme`
- Ensure CSS variables are defined in `globals.css`

## Backend Integration (Optional)

To add database persistence, replace localStorage with API calls.

### Example: Supabase Integration

\`\`\`typescript
// lib/storage.ts
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getLinks() {
  const { data } = await supabase.from('links').select('*')
  return data || DEFAULT_LINKS
}

export async function saveLinks(links: PersonalLink[]) {
  await supabase.from('links').upsert(links)
}
\`\`\`

## Support & Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Vercel Deployment**: https://vercel.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## Security Notes

⚠️ **Important for Production**:

1. Change default admin credentials
2. Never commit `.env.local` to version control
3. Use HTTPS in production (Vercel handles this)
4. Enable environment variable protection in Vercel
5. Regularly update dependencies: `npm update`

## License

MIT License - Feel free to use for personal and commercial projects.

---

**Questions?** Check the main README.md or open an issue on GitHub!
