"use client"

import { useEffect } from "react"
import { observeWebVitals } from "@/lib/performance-utils"

export function PerformanceMonitor() {
  useEffect(() => {
    // Observe Web Vitals
    observeWebVitals()

    // Log if Navigation Timing API is available
    if (performance && performance.getEntriesByType) {
      window.addEventListener(
        "load",
        () => {
          const navigationEntries = performance.getEntriesByType("navigation")
          if (navigationEntries.length > 0) {
            const navTiming = navigationEntries[0] as PerformanceNavigationTiming
            if (process.env.NODE_ENV === "development") {
              console.log("Navigation Timing:", {
                dns: navTiming.domainLookupEnd - navTiming.domainLookupStart,
                tcp: navTiming.connectEnd - navTiming.connectStart,
                ttfb: navTiming.responseStart - navTiming.requestStart,
                download: navTiming.responseEnd - navTiming.responseStart,
                domParsing: navTiming.domInteractive - navTiming.domLoading,
                domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domLoading,
                pageComplete: navTiming.loadEventEnd - navTiming.domLoading,
              })
            }
          }
        },
        { once: true },
      )
    }
  }, [])

  return null
}
