# Architecture Guide

## Project Structure

\`\`\`
linktree-personal/
├── app/
│   ├── page.tsx                      # Home page (public profile)
│   ├── admin/page.tsx                # Admin dashboard
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global styles & theme
│   ├── robots.ts                     # robots.txt generation
│   ├── sitemap.ts                    # sitemap.xml generation
│   ├── performance-monitor.tsx       # Web Vitals monitoring
│   └── theme-switcher-client.tsx     # Client-side theme management
├── components/
│   ├── profile-header.tsx            # Profile display
│   ├── links-display.tsx             # Links grid
│   ├── link-icons.tsx                # Icon mapping
│   ├── draggable-link-item.tsx       # Draggable link for admin
│   ├── theme-switcher.tsx            # Theme picker
│   ├── theme-provider.tsx            # next-themes wrapper
│   ├── page-footer.tsx               # Footer component
│   └── ui/                           # shadcn/ui components
├── lib/
│   ├── storage.ts                    # localStorage utilities
│   ├── constants.ts                  # Default data & config
│   ├── seo.ts                        # SEO utilities
│   ├── utils.ts                      # Helper functions
│   ├── theme-utils.ts                # Theme utilities
│   └── performance-utils.ts          # Performance monitoring
├── types/
│   └── index.ts                      # TypeScript types
├── public/                           # Static assets
│   ├── icons/                        # Favicon files
│   ├── og-image.png                  # OG image
│   └── site.webmanifest              # PWA manifest
├── styles/                           # Additional styles (if any)
├── hooks/                            # Custom hooks
├── scripts/                          # Build/dev scripts
├── .env.example                      # Environment template
├── next.config.mjs                   # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── README.md                         # Main documentation
├── SETUP.md                          # Setup guide
├── DEVELOPMENT.md                    # Development guide
├── API_DOCUMENTATION.md              # API reference
└── ARCHITECTURE.md                   # This file
\`\`\`

## Data Flow

### Public Profile Page
1. User visits homepage
2. `app/page.tsx` renders `ThemeSwitcherClient`
3. `ThemeSwitcherClient` loads theme and data from localStorage
4. `PerformanceMonitor` tracks Web Vitals
5. `ProfileHeader` displays user profile
6. `LinksDisplay` renders user's links
7. `ThemeSwitcher` allows theme customization
8. Theme changes trigger `applyTheme()` to update CSS variables

### Admin Dashboard
1. User navigates to `/admin`
2. `app/admin/page.tsx` shows login form
3. After authentication, admin panel loads
4. **Edit Mode**: User manages links and profile
   - Drag-drop reordering using `DraggableLinkItem`
   - Add/edit/delete links through modal
   - Profile customization
5. **Preview Mode**: Shows public profile preview
6. Changes are saved to localStorage immediately
7. Export/Import functionality for backup and restore

## State Management

The app uses **localStorage** for persistence with cross-tab communication:

\`\`\`
┌─────────────────┐
│  localStorage   │
│  - links        │
│  - profile      │
│  - theme        │
└─────────────────┘
        ↓
┌─────────────────┐
│  Storage Event  │ (Cross-tab sync)
│  Dispatched     │
└─────────────────┘
        ↓
┌─────────────────┐
│  React State    │ (Update components)
│  Updated        │
└─────────────────┘
\`\`\`

## Styling Architecture

### CSS Variables System
- **Root theme**: defined in `app/globals.css`
- **Dark/Light modes**: CSS custom properties
- **Accent colors**: Dynamic via `--primary`, `--primary-hsl`
- **Dynamic updates**: `applyTheme()` updates CSS variables on runtime

### Tailwind CSS v4
- Utility-first approach
- Semantic color tokens
- Responsive design with breakpoints
- Custom animations (stars, float, glow)

## Performance Optimizations

### Code Splitting
- Admin editor lazy-loaded
- Components code-split by route
- Webpack optimization in `next.config.mjs`

### Image Optimization
- Next.js Image component with WebP format
- Lazy loading attributes
- Responsive image sizes

### Web Vitals Monitoring
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- Reported in development console

### Caching Strategy
- Vercel Analytics already integrated
- Static site generation for public page
- localStorage for client-side data

## SEO Implementation

### On-Page SEO
- Semantic HTML structure
- Proper heading hierarchy (h1, h2, etc.)
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags for tweets

### Structured Data
- JSON-LD for Person schema
- JSON-LD for WebSite schema
- BreadcrumbList for navigation
- SearchAction for search functionality

### Technical SEO
- sitemap.xml auto-generation
- robots.txt configuration
- Canonical URLs
- Mobile-responsive design
- Fast page load times

## Accessibility Features

### WCAG Compliance
- Color contrast ratios meet AA standards
- All interactive elements keyboard accessible
- Focus indicators visible
- Semantic HTML elements

### ARIA Implementation
- ARIA labels on buttons
- ARIA roles on regions
- Live regions for alerts
- Dialog roles for modals

### Keyboard Navigation
- Tab through all controls
- Enter to activate buttons
- Space to toggle switches
- Arrow keys in menus

## Authentication & Security

### Admin Login
- Simple username/password (configurable in `lib/constants.ts`)
- Client-side only (for demo purposes)
- Consider server-side auth for production

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Data Protection
- HTTPS required in production
- No sensitive data in localStorage
- Input validation on forms

## Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect Vercel to repository
3. Set environment variables
4. Deploy

### Environment Variables
- `NEXT_PUBLIC_BASE_URL`: Deployed URL
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`: Dev redirect (optional)

## Future Enhancements

### Potential Features
- Database backend (Supabase, Firebase)
- OAuth authentication
- Analytics dashboard
- QR code generation
- Link preview cards
- Custom domains
- Email notifications
- Multi-user support

### Backend Integration Pattern
1. Replace localStorage with API calls
2. Use Server Actions for mutations
3. Implement authentication middleware
4. Add database schema
5. Set up caching strategy

## Contributing

When adding features:
1. Follow existing code patterns
2. Add TypeScript types
3. Update documentation
4. Test accessibility
5. Check performance impact
