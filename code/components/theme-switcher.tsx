"use client";

import type { ThemeSettings } from "@/types";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme } from "@/lib/theme-utils";

interface ThemeSwitcherProps {
    theme: ThemeSettings;
    onThemeChange: (theme: ThemeSettings) => void;
}

const ACCENT_COLORS = [
    { name: "cyan", value: "#00d9ff" },
    { name: "purple", value: "#8b5cf6" },
    { name: "pink", value: "#ec4899" },
    { name: "green", value: "#10b981" },
    { name: "orange", value: "#f97316" },
    { name: "red", value: "#ef4444" },
];

export function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        applyTheme(theme);
    }, [theme]);

    if (!mounted) return null;

    return (
        <div className="flex gap-2 bg-card border border-border rounded-lg p-2 backdrop-blur-sm shadow-lg">
            {/* Theme Toggle */}
            <button
                onClick={() => onThemeChange({ ...theme, mode: "light" })}
                className={`p-2 rounded transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                    theme.mode === "light"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Light mode"
                aria-pressed={theme.mode === "light"}
            >
                <Sun className="w-5 h-5" />
            </button>
            <button
                onClick={() => onThemeChange({ ...theme, mode: "dark" })}
                className={`p-2 rounded transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                    theme.mode === "dark"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Dark mode"
                aria-pressed={theme.mode === "dark"}
            >
                <Moon className="w-5 h-5" />
            </button>
        </div>
    );
}
