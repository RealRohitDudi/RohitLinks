import type React from "react";
import {
    Globe,
    Youtube,
    Instagram,
    Linkedin,
    Twitter,
    Github,
    Facebook,
    MessageCircle,
    Send,
    Zap,
    Music,
    Disc3,
    Users,
    Pin,
    Maximize,
    Radio,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ReactNode> = {
    globe: <Globe className="w-7 h-7" />,
    youtube: <Youtube className="w-7 h-7" />,
    instagram: <Instagram className="w-7 h-7" />,
    linkedin: <Linkedin className="w-7 h-7" />,
    twitter: <Twitter className="w-7 h-7" />,
    github: <Github className="w-7 h-7" />,
    facebook: <Facebook className="w-7 h-7" />,
    discord: <MessageCircle className="w-7 h-7" />,
    telegram: <Send className="w-7 h-7" />,
    threads: <Zap className="w-7 h-7" />,
    soundcloud: <Music className="w-7 h-7" />,
    spotify: <Disc3 className="w-7 h-7" />,
    reddit: <Users className="w-7 h-7" />,
    pinterest: <Pin className="w-7 h-7" />,
    tumblr: <Maximize className="w-7 h-7" />,
    whatsapp: <Radio className="w-7 h-7" />,
};

export function getIconForUrl(url: string): string {
    if (url.includes("youtube.com")) return "youtube";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("x.com") || url.includes("twitter.com")) return "twitter";
    if (url.includes("github.com")) return "github";
    if (url.includes("facebook.com")) return "facebook";
    if (url.includes("discord.gg")) return "discord";
    if (url.includes("t.me")) return "telegram";
    if (url.includes("threads.com")) return "threads";
    if (url.includes("soundcloud.com")) return "soundcloud";
    if (url.includes("spotify.com")) return "spotify";
    if (url.includes("reddit.com")) return "reddit";
    if (url.includes("pinterest.com")) return "pinterest";
    if (url.includes("tumblr.com")) return "tumblr";
    if (url.includes("whatsapp.com")) return "whatsapp";
    return "globe";
}
