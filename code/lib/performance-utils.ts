"use client"

export interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  cls?: number // Cumulative Layout Shift
  fid?: number // First Input Delay
  ttfb?: number // Time to First Byte
}

export function reportMetrics(metrics: PerformanceMetrics): void {
  if (typeof window === "undefined") return

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("Performance Metrics:", metrics)
  }

  // Send to analytics service (if needed)
  // Example: sendToAnalytics(metrics)
}

export function observeWebVitals(): void {
  if (typeof window === "undefined" || !("web-vital" in window)) return

  const metrics: PerformanceMetrics = {}

  // Observe First Contentful Paint
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            metrics.fcp = entry.startTime
          }
        })
      })
      observer.observe({ entryTypes: ["paint"] })
    } catch (error) {
      console.error("Error observing paint metrics:", error)
    }
  }

  // Observe Largest Contentful Paint
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        if (entries.length > 0) {
          metrics.lcp = entries[entries.length - 1].startTime
        }
      })
      observer.observe({ entryTypes: ["largest-contentful-paint"] })
    } catch (error) {
      console.error("Error observing LCP:", error)
    }
  }

  if (Object.keys(metrics).length > 0) {
    reportMetrics(metrics)
  }
}

export function prefetchResource(href: string, as: "image" | "font" | "script" | "style"): void {
  if (typeof document === "undefined") return

  const link = document.createElement("link")
  link.rel = "prefetch"
  link.as = as
  link.href = href
  document.head.appendChild(link)
}

export function optimizeImages(): void {
  if (typeof document === "undefined") return

  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy")
    }
  })
}
