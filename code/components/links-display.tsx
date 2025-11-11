"use client";

import type { PersonalLink } from "@/types";
import { ICON_MAP } from "./link-icons";
import { ExternalLink, EyeOff } from "lucide-react";

interface LinksDisplayProps {
    links: PersonalLink[];
    isAdmin?: boolean;
    onEdit?: (link: PersonalLink) => void;
    onDelete?: (id: string) => void;
    onToggleVisibility?: (id: string) => void;
}

export function LinksDisplay({
    links,
    isAdmin = false,
    onEdit,
    onDelete,
    onToggleVisibility,
}: LinksDisplayProps) {
    const visibleLinks = links
        .filter((link) => link.visible)
        .sort((a, b) => a.order - b.order);

    return (
        <div
            className="w-full max-w-2xl mx-auto px-4 relative z-10"
            role="region"
            aria-label="Personal links"
        >
            <div className="space-y-4">
                {visibleLinks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No links available yet.</p>
                    </div>
                ) : (
                    visibleLinks.map((link, index) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                            aria-label={`${link.title} - Opens in new window`}
                            style={{ minHeight: "64px" }}
                        >
                            {/* Background glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300" />

                            {/* Content: Icon and Title Centered */}
                            <div className="relative flex items-center justify-center gap-5 w-full">
                                <span className="text-primary group-hover:scale-125 transition-transform duration-300 flex-shrink-0">
                                    {ICON_MAP[link.icon] || ICON_MAP.globe}
                                </span>
                                <span className="flex-1 text-center">
                                    <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 block">
                                        {link.title}
                                    </span>
                                    {isAdmin && (
                                        <span className="text-xs text-muted-foreground truncate mt-1 block">
                                            {link.url}
                                        </span>
                                    )}
                                </span>
                            </div>

                            {/* Actions */}
                            {isAdmin ? (
                                <div className="relative flex items-center gap-2 ml-4 flex-shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onToggleVisibility?.(link.id);
                                        }}
                                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                                        title={link.visible ? "Hide" : "Show"}
                                        aria-label={
                                            link.visible
                                                ? "Hide link"
                                                : "Show link"
                                        }
                                    >
                                        {!link.visible && (
                                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                                        )}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onEdit?.(link);
                                        }}
                                        className="px-3 py-1 text-xs bg-primary/20 text-primary hover:bg-primary/30 rounded transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onDelete?.(link.id);
                                        }}
                                        className="px-3 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <ExternalLink
                                    className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 ml-2"
                                    aria-hidden="true"
                                />
                            )}
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}
