"use client"

import type { ProfileData } from "@/types"

interface ProfileHeaderProps {
  profile: ProfileData
  isPreview?: boolean
}

export function ProfileHeader({ profile, isPreview = false }: ProfileHeaderProps) {
  return (
    <div className="text-center mb-12 relative z-10">
      {/* Profile Image */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-40 glow animate-pulse"></div>
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1 flex items-center justify-center shadow-2xl border-2 border-cyan-400 hover:border-purple-400 transition-colors duration-500">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage || "/placeholder.svg"}
                  alt={`${profile.name}'s profile picture`}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="text-4xl font-bold bg-gradient-to-br from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Name */}
      <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">{profile.name}</h1>

      {/* Bio */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance mb-6 leading-relaxed">
        {profile.bio}
      </p>

      {/* Social Icon Bar */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <a
          href="https://www.youtube.com/@RealRohitDudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-card/80 transition-all duration-300 text-primary hover:glow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        <a
          href="https://x.com/RealRohitDudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-card/80 transition-all duration-300 text-primary hover:glow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308L6.281 4.133H4.302l13.248 15.367z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/RealRohitDudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-card/80 transition-all duration-300 text-primary hover:glow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.814 0-9.752h3.554v1.375c.428-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.384 3.704 4.362v5.61zM5.337 8.855c-1.144 0-1.915-.761-1.915-1.71 0-.955.77-1.71 1.958-1.71 1.187 0 1.917.755 1.944 1.71 0 .949-.757 1.71-1.987 1.71zm1.581 11.597H3.715V9.705h3.203v10.747zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/realrohitdudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-card/80 transition-all duration-300 text-primary hover:glow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 1.5a8.25 8.25 0 100 16.5A8.25 8.25 0 0012 3.75zm0 1.5a6.75 6.75 0 110 13.5A6.75 6.75 0 0112 5.25zm4.5-2.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
        </a>
        <a
          href="https://www.github.com/RealRohitDudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-card/80 transition-all duration-300 text-primary hover:glow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/RealRohitDudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-card/80 transition-all duration-300 text-primary hover:glow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      </div>

      {isPreview && (
        <div
          className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-500 text-yellow-300 rounded-lg text-sm font-medium"
          role="status"
          aria-live="polite"
        >
          Preview Mode
        </div>
      )}
    </div>
  )
}
