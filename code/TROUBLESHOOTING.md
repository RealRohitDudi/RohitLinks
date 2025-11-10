# Troubleshooting Guide

## Common Issues & Solutions

### Authentication Issues

#### Admin panel shows "Invalid credentials"
**Solution:**
1. Check default credentials in `lib/constants.ts`
2. Verify you're using correct username and password
3. Clear browser cache and localStorage
4. Try incognito/private browsing mode

#### Admin panel won't load after login
**Solution:**
1. Clear localStorage: `localStorage.clear()`
2. Hard refresh page: Ctrl+Shift+R (Cmd+Shift+R on Mac)
3. Check browser console for errors
4. Ensure JavaScript is enabled

---

## Data Issues

### Changes not saving to links
**Diagnosis:**
1. Check if localStorage is enabled
2. Open DevTools → Application → LocalStorage
3. Look for `linktree_links`, `linktree_profile`, `linktree_theme`

**Solutions:**
1. Enable localStorage in browser settings
2. Check if browser is in private/incognito mode
3. Clear storage and refresh: `localStorage.clear()`
4. Try exporting data to verify it's being stored

### Profile picture not showing
**Solutions:**
1. Verify image URL is correct and accessible
2. Check image format (PNG, JPG, WebP supported)
3. Image must be less than 5MB
4. Try uploading image through admin panel
5. Check CORS headers if external URL

### Import fails or says "Invalid file format"
**Solutions:**
1. Ensure file is valid JSON
2. Check file was exported from this app
3. File must contain `links`, `profile`, and `theme` keys
4. Try exporting and re-importing test data
5. Check browser console for detailed error

---

## Styling Issues

### Dark mode not applying
**Diagnosis:**
Check if dark class is on html element:
\`\`\`javascript
console.log(document.documentElement.classList.contains('dark'))
\`\`\`

**Solutions:**
1. Hard refresh: Ctrl+Shift+R
2. Clear browser cache
3. Check localStorage for theme: `localStorage.getItem('linktree_theme')`
4. Verify CSS variables in DevTools → Styles

### Text looks weird or unreadable
**Solutions:**
1. Check color contrast in DevTools
2. Verify font is loading: Network tab → Fonts
3. Clear browser cache
4. Try different browser to isolate issue
5. Check system font settings

### Layout broken on mobile
**Solutions:**
1. Verify viewport meta tag in `app/layout.tsx`
2. Check responsive classes in components
3. Test with DevTools device emulation
4. Clear cache and reload
5. Check for console errors

---

## Performance Issues

### Site loading slowly
**Diagnosis:**
Check DevTools Lighthouse:
1. Performance tab
2. Look at metrics: LCP, FCP, CLS

**Solutions:**
1. Optimize images: reduce file size or use WebP
2. Reduce JavaScript bundle: check what's imported
3. Enable compression in Next.js config
4. Use Vercel Analytics to track metrics
5. Check network latency

### Theme switching lag
**Solutions:**
1. Check for blocking JavaScript
2. Reduce number of links
3. Profile with DevTools Performance tab
4. Check if localStorage operations are blocking
5. Consider lazy-loading theme colors

---

## Browser-Specific Issues

### Works in Chrome but not Firefox
**Common causes:**
- CSS property not supported
- localStorage issues in private mode
- Missing polyfills

**Solutions:**
1. Check browser compatibility
2. Test in DevTools with different user agents
3. Use `@supports` queries for CSS features
4. Check Firefox console for errors

### iOS/Safari issues
**Common causes:**
- localStorage in private mode is cleared
- CSS grid/flexbox differences
- Touch event handling

**Solutions:**
1. Test in Safari DevTools (macOS)
2. Use viewport-fit for notches
3. Test touch interactions
4. Check -webkit- prefix requirements

---

## Development Issues

### Build errors
**Solutions:**
1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript errors: no strict mode errors
4. Verify environment variables are set

### "Cannot find module" errors
**Solutions:**
1. Check import paths use correct case
2. Verify files exist in correct location
3. Use @/* aliases from tsconfig.json
4. Clear .next cache

### Hot reload not working
**Solutions:**
1. Check if files are being saved
2. Verify editor has permission to access files
3. Try stopping dev server and restarting
4. Check for syntax errors in changed file

---

## Analytics & Monitoring

### Analytics not showing data
**Solutions:**
1. Check Vercel Analytics is initialized
2. Verify tracking ID in `@vercel/analytics/next`
3. Allow enough time for data to populate
4. Check for ad blockers blocking analytics
5. Verify public access to analytics dashboard

### Web Vitals not being reported
**Solutions:**
1. Check `PerformanceMonitor` is mounted
2. Verify browser supports Performance Observer API
3. Check browser console for errors
4. Wait for page to fully load
5. Try in different browser

---

## Getting Help

### Where to find logs
1. Browser DevTools Console: F12 or Right-click → Inspect
2. Next.js Terminal: Check build and dev server output
3. Browser Network tab: Check API/resource loading
4. Local storage: DevTools → Application → LocalStorage

### Debug Information to collect
- Browser and version
- Steps to reproduce issue
- Console errors (full error message and stack trace)
- What you expected vs what happened
- Screenshots or video if applicable

### Report Issues
When reporting issues, include:
1. Exact error message
2. How to reproduce
3. Expected behavior
4. Current behavior
5. Browser/OS information
6. Console logs

---

## Advanced Troubleshooting

### Enable verbose logging
Add to `app/theme-switcher-client.tsx`:
\`\`\`typescript
useEffect(() => {
  console.log("[v0] Theme loaded:", theme)
  console.log("[v0] Storage check:", {
    links: localStorage.getItem('linktree_links')?.length,
    profile: localStorage.getItem('linktree_profile')?.length,
    theme: localStorage.getItem('linktree_theme'),
  })
}, [theme])
\`\`\`

### Check storage quota
\`\`\`javascript
navigator.storage.estimate().then(({usage, quota}) => {
  console.log(\`Storage: \${usage} of \${quota} bytes\`)
})
\`\`\`

### Clear and reset
\`\`\`javascript
// Clear all data
localStorage.clear()
// Clear specific items
localStorage.removeItem('linktree_theme')
localStorage.removeItem('linktree_links')
localStorage.removeItem('linktree_profile')
\`\`\`

\`\`\`
