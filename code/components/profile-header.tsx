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
                            <Image
                                src={require("@/public/header_profile.png")}
                                alt={`${profile.name}'s profile picture`}
                                width={128}
                                height={128}
                                className="w-full h-full rounded-full object-cover shadow-lg shadow-cyan-400/30"
                                priority
                            />
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

            {/* Social Icon Bar - Clean UI */}
            <div
                className="flex justify-center gap-6 mb-6 flex-wrap px-4 py-2 border-2 border-cyan-400 rounded-full bg-black/80"
                style={{ maxWidth: "700px", margin: "0 auto" }}
            >
                {[
                    { href: "https://www.github.com/RealRohitDudi" },
                    { href: "https://x.com/RealRohitDudi" },
                    { href: "https://www.youtube.com/@RealRohitDudi" },
                    { href: "https://www.linkedin.com/in/RealRohitDudi" },
                    { href: "https://www.instagram.com/realrohitdudi" },
                    { href: "https://www.facebook.com/RealRohitDudi" },
                    { href: "https://in.pinterest.com/RealRohitDudi/" },
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
                            className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white hover:border-cyan-400 transition-colors duration-200 bg-black"
                            style={{ boxShadow: "0 0 0 2px #00d9ff" }}
                        >
                            <span className="text-white text-3xl">
                                {ICON_MAP[iconKey]}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
