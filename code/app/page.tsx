import type { Metadata } from "next"
import { generateMetadata, generateJSONLD } from "@/lib/seo"
import Script from "next/script"
import { ThemeSwitcherClient } from "./theme-switcher-client"
import { PerformanceMonitor } from "./performance-monitor"
import { ProfileHeader } from "@/components/profile-header"
import { LinksDisplay } from "@/components/links-display"
import { PageFooter } from "@/components/page-footer"
import { getProfileData } from "@/lib/storage"

export const metadata: Metadata = generateMetadata()

export default async function HomePage() {
  const profileData = await getProfileData()
  const jsonLd = generateJSONLD()

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <PerformanceMonitor />
      <ThemeSwitcherClient />

      <main className="min-h-screen w-full starfield flex flex-col items-center justify-center py-12 px-4 relative">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12">
          <ProfileHeader profile={profileData} />
          <LinksDisplay links={profileData.links} />
          <PageFooter />
        </div>
      </main>
    </>
  )
}
