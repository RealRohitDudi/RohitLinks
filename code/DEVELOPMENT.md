# Development Guide

## Getting Started

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start dev server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in browser**
   - http://localhost:3000 (public profile)
   - http://localhost:3000/admin (admin dashboard)

## Code Standards

### File Naming
- Components: `PascalCase` (e.g., `ProfileHeader.tsx`)
- Files: `kebab-case` (e.g., `profile-header.tsx`)
- Utilities: `camelCase` (e.g., `getLinkIcon.ts`)

### Component Structure

\`\`\`typescript
// 1. Imports
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

// 2. Type definitions
interface Props {
  title: string
  onClick: () => void
}

// 3. Component
export function MyComponent({ title, onClick }: Props) {
  return (
    <button onClick={onClick}>{title}</button>
  )
}
\`\`\`

### TypeScript Best Practices

- Always add type annotations
- Use `type` for object types, `interface` for class-like structures
- Import types with `import type` keyword
- Avoid `any` type

## Testing Locally

### Test Public Profile
- Check responsive design at mobile sizes
- Verify theme switching works
- Test all social links open correctly
- Check SEO meta tags in page source

### Test Admin Dashboard
- Login with credentials
- Add/edit/delete links
- Reorder links with drag-drop
- Edit profile info
- Export/import data
- Verify localStorage persistence

### Test Theme System
- Switch between light/dark modes
- Change accent color
- Verify colors persist on reload
- Check mobile theme switching

## Common Tasks

### Add a New Social Link

1. **Add icon in `components/link-icons.tsx`**
   \`\`\`typescript
   import { TicketIcon as TikTok } from 'lucide-react'
   
   export const ICON_MAP: Record<string, React.ReactNode> = {
     // ...existing
     tiktok: <TikTok className="w-5 h-5" />,
   }
   \`\`\`

2. **Add link in `lib/constants.ts`**
   \`\`\`typescript
   export const DEFAULT_LINKS = [
     // ...existing
     {
       id: "11",
       title: "TikTok",
       url: "https://tiktok.com/@yourprofile",
       icon: "tiktok",
       visible: true,
       order: 10,
     },
   ]
   \`\`\`

### Change Theme Colors

Edit `app/globals.css`:
\`\`\`css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  --accent: #your-color;
}
\`\`\`

### Update SEO Metadata

Edit `lib/seo.ts`:
\`\`\`typescript
export function generateMetadata() {
  return {
    title: "Your title here",
    description: "Your description here",
    // ...
  }
}
\`\`\`

## Performance Checklist

- [ ] Images optimized (< 100KB)
- [ ] No unused dependencies
- [ ] CSS is minified
- [ ] JavaScript is code-split
- [ ] No console errors/warnings
- [ ] Lighthouse score > 90

## Commit Message Format

\`\`\`
feat: Add new feature description
fix: Fix bug description
docs: Update documentation
refactor: Refactor existing code
test: Add tests
chore: Update dependencies
\`\`\`

## Version Control

\`\`\`bash
# Create a new branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: Add my feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request
# ...review and merge
\`\`\`

## Debugging Tips

### Use Console Logs
\`\`\`typescript
console.log("[v0] Debug message:", value)
\`\`\`

### Browser DevTools
- **Elements**: Check HTML structure
- **Console**: View errors and logs
- **Application**: Check localStorage
- **Network**: Monitor API calls
- **Performance**: Profile runtime

### Common Issues

**Dark mode not applying**
- Check if `dark` class is on `html` element
- Verify CSS variables in `globals.css`
- Clear browser cache

**Links not saving**
- Check localStorage in DevTools
- Verify JSON format is correct
- Check for console errors

**Build errors**
- Clear `.next` folder: `rm -rf .next`
- Reinstall node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## Resources

- **React 19 Docs**: https://react.dev
- **Next.js 16 Guide**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org/docs
- **shadcn/ui**: https://ui.shadcn.com/docs
