# Rohit Dudi - Personal Links (Linktree Clone)

A modern, SEO-first personal link aggregator built with Next.js 16, TypeScript, and Tailwind CSS. Features a cosmic-themed design, admin dashboard with authentication, and comprehensive SEO optimization.

## Features

### Public Profile
- **Cosmic Responsive Design** - Beautiful dark theme with animated starfield background
- **Quick Access to All Links** - Display all your social media and personal links in one place
- **Mobile-First** - Fully responsive and optimized for all devices
- **Smooth Interactions** - Hover effects, transitions, and animations

### Admin Dashboard
- **Secure Authentication** - Username/password protected admin panel
- **Link Management** - Add, edit, delete, and reorder links
- **Visibility Toggle** - Hide/show individual links without deleting
- **Profile Customization** - Edit name and bio
- **Preview Mode** - See changes in real-time before publishing
- **Data Backup** - Export/import your links as JSON

### SEO & Performance
- **Static Site Generation (SSG)** - Pre-rendered for fast page loads
- **Dynamic Meta Tags** - Title, description, OG tags, Twitter cards
- **JSON-LD Schema** - Structured data for Person and WebSite types
- **Sitemap & Robots.txt** - Auto-generated for search engines
- **Canonical URLs** - Prevent duplicate indexing
- **Image Optimization** - WebP format, responsive sizes, lazy loading
- **WCAG Accessibility** - Full keyboard navigation, ARIA labels, semantic HTML
- **Performance** - Minimal JavaScript, font preloading, critical CSS

### Customization
- **Theme Switcher** - Light/dark mode toggle
- **Accent Colors** - Choose from 6 beautiful accent colors (cyan, purple, pink, green, orange, red)
- **Drag-and-Drop Reordering** - Rearrange links easily
- **Icon Mapping** - Auto-detect social platform icons
- **LocalStorage Persistence** - All changes saved locally

## Quick Start

### 1. Clone & Install

\`\`\`bash
# Using the shadcn CLI
npx shadcn-cli@latest init -d

# Or download the ZIP and extract
cd linktree-personal
npm install
\`\`\`

### 2. Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Page**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

Default credentials:
- Username: `admin`
- Password: `admin123`

### 3. Customize

#### Change Credentials (Required)
Edit `lib/constants.ts`:
\`\`\`typescript
export const ADMIN_CREDENTIALS = {
  username: 'your-username',
  password: 'your-secure-password',
}
\`\`\`

#### Update Your Links
You can edit links via the admin panel, or manually update `DEFAULT_LINKS` in `lib/constants.ts`.

#### Customize Profile
- Edit `DEFAULT_PROFILE` name and bio in `lib/constants.ts`
- Add your profile image by uploading in admin panel

## File Structure

\`\`\`
linktree-personal/
├── app/
│   ├── page.tsx                # Public profile page (SSG)
│   ├── admin/page.tsx          # Admin dashboard
│   ├── layout.tsx              # Root layout with metadata
│   ├── globals.css             # Tailwind + theme variables
│   ├── robots.ts               # robots.txt generation
│   └── sitemap.ts              # sitemap.xml generation
├── components/
│   ├── profile-header.tsx      # Profile section
│   ├── links-display.tsx       # Links grid
│   ├── theme-switcher.tsx      # Theme toggle
│   └── link-icons.tsx          # Icon mapping
├── lib/
│   ├── storage.ts              # localStorage utilities
│   ├── constants.ts            # Default data & config
│   ├── seo.ts                  # SEO utilities
│   └── link-icons.tsx          # Icon components
├── types/
│   └── index.ts                # TypeScript types
├── public/                     # Static assets
├── README.md                   # This file
└── next.config.mjs             # Next.js configuration
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Click "Deploy"
5. Set environment variables (optional):
   - `NEXT_PUBLIC_BASE_URL`: Your deployed URL (for SEO)

### Environment Variables

Create `.env.local` (optional):
\`\`\`bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com
\`\`\`

## SEO Checklist

- [x] Static Site Generation (SSG) for public page
- [x] Dynamic meta tags (title, description)
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] JSON-LD structured data (Person + WebSite schema)
- [x] Canonical URL on main page
- [x] Sitemap.xml auto-generation
- [x] Robots.txt configuration
- [x] Preconnect for Google Fonts
- [x] Image optimization
- [x] Semantic HTML structure
- [x] ARIA labels and keyboard navigation
- [x] Mobile responsive design

## Backend Integration (Future)

To add backend persistence, you can replace localStorage with API calls:

### Example: Supabase Integration

\`\`\`typescript
// lib/storage.ts - Replace localStorage calls with:

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

### Database Schema

\`\`\`sql
-- Create links table
CREATE TABLE links (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  visible BOOLEAN DEFAULT true,
  "order" INTEGER,
  created_at TIMESTAMP DEFAULT now()
);

-- Create profile table
CREATE TABLE profile (
  id TEXT PRIMARY KEY,
  name TEXT,
  bio TEXT,
  profileImage TEXT,
  updated_at TIMESTAMP DEFAULT now()
);
\`\`\`

## Performance Optimizations

- **Code Splitting** - Admin editor loaded only when needed
- **Image Optimization** - Next.js Image component with WebP
- **Font Loading** - `font-display: swap` for faster rendering
- **Minimal JavaScript** - Static generation reduces runtime JS
- **CSS-in-JS** - Tailwind CSS for small bundle size

## Accessibility Features

- **WCAG AA Compliance** - Meets accessibility standards
- **Keyboard Navigation** - All interactive elements keyboard accessible
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **Color Contrast** - High contrast ratios for readability
- **Focus Indicators** - Visible focus states

## Customization Guide

### Change Theme Colors

Edit `app/globals.css`:
\`\`\`css
:root {
  --primary: #00d9ff;      /* Main accent */
  --secondary: #8b5cf6;    /* Secondary accent */
  --background: #0a0e27;   /* Main background */
  --foreground: #e8eef9;   /* Text color */
  --card: #1a1f3a;         /* Card background */
  /* ... more colors */
}
\`\`\`

### Add More Social Links

Edit `lib/constants.ts`:
\`\`\`typescript
export const DEFAULT_LINKS: PersonalLink[] = [
  // ... existing links
  {
    id: '11',
    title: 'TikTok',
    url: 'https://tiktok.com/@yourprofile',
    icon: 'tiktok',
    visible: true,
    order: 10,
  },
]
\`\`\`

Don't forget to add the icon in `components/link-icons.tsx`:
\`\`\`typescript
export const ICON_MAP: Record<string, React.ReactNode> = {
  // ... existing icons
  tiktok: <TikTok className="w-5 h-5" />,
}
\`\`\`

## Troubleshooting

### Admin Panel Not Loading
- Clear browser cache and localStorage
- Check console for errors
- Verify credentials in `lib/constants.ts`

### Links Not Saving
- Check if localStorage is enabled in browser
- Try exporting data to verify it's being stored
- For production, implement backend integration

### Styling Issues
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check that `globals.css` is properly imported

## Support

For issues, questions, or feature requests, please open an issue on GitHub or visit the documentation.

## License

MIT License - feel free to use for personal and commercial projects.

## Future Enhancements

- [ ] QR code generation for profile
- [ ] Analytics dashboard (click tracking)
- [ ] Custom domain support
- [ ] Email notifications for new followers
- [ ] Multi-user support
- [ ] Database persistence (Supabase/Firebase)
- [ ] Link preview cards
- [ ] Schedule link publishing
