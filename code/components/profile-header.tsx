"use client";
import Image from "next/image";
import type { ProfileData } from "@/types";
import { ICON_MAP, getIconForUrl } from "./link-icons";

interface ProfileHeaderProps {
    profile: ProfileData;
    isPreview?: boolean;
}

export function ProfileHeader({
    profile,
    isPreview = false,
}: ProfileHeaderProps) {
    return (
        <div className="text-center mb-6 relative z-10 px-2 sm:px-0">
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1 flex items-center justify-center shadow-2xl border-2 border-cyan-400 hover:border-purple-400 transition-colors duration-500">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            {profile.profileImage ? (
                                <picture>
                                    <source
                                        srcSet={profile.profileImage.replace(
                                            /\.(jpg|png)$/i,
                                            ".webp"
                                        )}
                                        type="image/webp"
                                    />
                                    <Image
                                        src={profile.profileImage}
                                        alt={`${profile.name}'s profile picture`}
                                        width={128}
                                        height={128}
                                        className="w-full h-full rounded-full object-cover shadow-lg shadow-cyan-400/30"
                                        loading="lazy"
                                        priority
                                    />
                                </picture>
                            ) : (
                                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight futuristic-text drop-shadow-lg animate-fade-in">
                {profile.name}
            </h1>

            {/* Bio */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance mb-6 leading-relaxed animate-fade-in">
                {profile.bio}
            </p>

            {/* Social Icon Bar */}
            <div className="flex justify-center gap-1.5 sm:gap-2.5 md:gap-4 mb-4 flex-wrap">
                {/* Futuristic, clickable, mobile-optimized social buttons using Lucide icons */}
                {[
                    { href: "https://www.youtube.com/@RealRohitDudi" },
                    { href: "https://x.com/RealRohitDudi" },
                    { href: "https://www.linkedin.com/in/RealRohitDudi" },
                    { href: "https://www.instagram.com/realrohitdudi" },
                    { href: "https://www.github.com/RealRohitDudi" },
                    { href: "https://www.facebook.com/RealRohitDudi" },
                ].map(({ href }) => {
                    const iconKey = getIconForUrl(href);
                    return (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={
                                iconKey.charAt(0).toUpperCase() +
                                iconKey.slice(1)
                            }
                            className="group p-2 sm:p-2.5 md:p-3 rounded-full bg-gradient-to-br from-cyan-500/50 to-purple-600/50 border-2 border-primary/40 hover:border-primary focus:border-primary focus:scale-105 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 text-primary shadow-lg shadow-cyan-400/20 hover:shadow-purple-400/30 backdrop-blur-md"
                            style={{
                                touchAction: "manipulation",
                                minWidth: 40,
                                minHeight: 40,
                            }}
                        >
                            <span className="glow stars float drop-shadow-md">
                                {ICON_MAP[iconKey]}
                            </span>
                        </a>
                    );
                })}
            </div>

            {isPreview && (
                <div
                    className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-500 text-yellow-300 rounded-lg text-sm font-medium animate-pulse"
                    role="status"
                    aria-live="polite"
                >
                    Preview Mode
                </div>
            )}
        </div>
    );
}
