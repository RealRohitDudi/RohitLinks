"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { PersonalLink, ProfileData, ThemeSettings } from "@/types";
import {
    getLinks,
    saveLinks,
    getProfile,
    saveProfile,
    getTheme,
    saveTheme,
    exportData,
    importData,
} from "@/lib/storage";
import {
    ADMIN_CREDENTIALS,
    DEFAULT_LINKS,
    DEFAULT_PROFILE,
} from "@/lib/constants";
import { ProfileHeader } from "@/components/profile-header";
import { LinksDisplay } from "@/components/links-display";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ICON_MAP } from "@/components/link-icons";
import { DraggableLinkItem } from "@/components/draggable-link-item";
import { Plus, X, Download, Upload, AlertCircle } from "lucide-react";

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [links, setLinks] = useState<PersonalLink[]>(DEFAULT_LINKS);
    const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
    const [theme, setTheme] = useState<ThemeSettings>({
        mode: "dark",
        accentColor: "cyan",
    });

    const [editingLink, setEditingLink] = useState<PersonalLink | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        icon: "globe",
    });
    const [previewMode, setPreviewMode] = useState(false);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    // Load data on mount
    useEffect(() => {
        const storedLinks = getLinks();
        const storedProfile = getProfile();
        const storedTheme = getTheme();

        setLinks(storedLinks);
        setProfile(storedProfile);
        setTheme(storedTheme);
    }, []);

    // Apply theme
    useEffect(() => {
        if (authenticated) {
            if (theme.mode === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            saveTheme(theme);
        }
    }, [theme, authenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password");
            return;
        }

        if (
            username === ADMIN_CREDENTIALS.username &&
            password === ADMIN_CREDENTIALS.password
        ) {
            setAuthenticated(true);
            setError("");
        } else {
            setError("Invalid credentials. Please try again.");
            setPassword("");
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        setUsername("");
        setPassword("");
        setPreviewMode(false);
    };

    // Link operations
    const handleAddLink = () => {
        setEditingLink(null);
        setFormData({ title: "", url: "", icon: "globe" });
        setShowModal(true);
    };

    const handleEditLink = (link: PersonalLink) => {
        setEditingLink(link);
        setFormData({ title: link.title, url: link.url, icon: link.icon });
        setShowModal(true);
    };

    const handleSaveLink = () => {
        if (!formData.title.trim() || !formData.url.trim()) {
            setError("Title and URL are required");
            return;
        }

        // Validate URL format
        try {
            new URL(formData.url);
        } catch {
            setError("Please enter a valid URL");
            return;
        }

        let updatedLinks = links;
        if (editingLink) {
            updatedLinks = links.map((l) =>
                l.id === editingLink.id
                    ? {
                          ...l,
                          title: formData.title.trim(),
                          url: formData.url.trim(),
                          icon: formData.icon,
                      }
                    : l
            );
        } else {
            const newLink: PersonalLink = {
                id: Date.now().toString(),
                title: formData.title.trim(),
                url: formData.url.trim(),
                icon: formData.icon,
                visible: true,
                order: links.length,
            };
            updatedLinks = [...links, newLink];
        }

        setLinks(updatedLinks);
        saveLinks(updatedLinks);
        setShowModal(false);
        setError("");
    };

    const handleDeleteLink = (id: string) => {
        const updatedLinks = links.filter((l) => l.id !== id);
        setLinks(updatedLinks);
        saveLinks(updatedLinks);
    };

    const handleToggleVisibility = (id: string) => {
        const updatedLinks = links.map((l) =>
            l.id === id ? { ...l, visible: !l.visible } : l
        );
        setLinks(updatedLinks);
        saveLinks(updatedLinks);
    };

    const handleMoveLink = (index: number, direction: "up" | "down") => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= links.length) return;

        const updatedLinks = [...links];
        const temp = updatedLinks[index];
        updatedLinks[index] = updatedLinks[newIndex];
        updatedLinks[newIndex] = temp;

        updatedLinks.forEach((link, idx) => {
            link.order = idx;
        });

        setLinks(updatedLinks);
        saveLinks(updatedLinks);
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDropOnItem = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();

        if (!draggedItem || draggedItem === targetId) {
            setDraggedItem(null);
            return;
        }

        const draggedIndex = links.findIndex((l) => l.id === draggedItem);
        const targetIndex = links.findIndex((l) => l.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const updatedLinks = [...links];
        const draggedLink = updatedLinks[draggedIndex];
        updatedLinks.splice(draggedIndex, 1);
        updatedLinks.splice(targetIndex, 0, draggedLink);

        updatedLinks.forEach((link, idx) => {
            link.order = idx;
        });

        setLinks(updatedLinks);
        saveLinks(updatedLinks);
        setDraggedItem(null);
    };

    const handleSaveProfile = () => {
        if (!profile.name.trim()) {
            setError("Name is required");
            return;
        }
        saveProfile(profile);
        setError("");
    };

    const handleExport = () => {
        const data = exportData();
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `linktree-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                if (importData(content)) {
                    const storedLinks = getLinks();
                    const storedProfile = getProfile();
                    const storedTheme = getTheme();

                    setLinks(storedLinks);
                    setProfile(storedProfile);
                    setTheme(storedTheme);
                    setError("");
                    alert("Data imported successfully!");
                } else {
                    setError("Invalid file format");
                }
            } catch (err) {
                setError("Error importing file");
            }
        };
        reader.readAsText(file);
    };

    if (!authenticated) {
        return (
            <main
                className="min-h-screen starfield flex items-center justify-center px-4"
                role="main"
            >
                <div className="w-full max-w-md">
                    <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
                        <h1 className="text-3xl font-bold text-white mb-8 text-center">
                            Admin Panel
                        </h1>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Enter username"
                                    autoComplete="username"
                                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter password"
                                    autoComplete="current-password"
                                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {error && (
                                <div
                                    className="p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm flex gap-2"
                                    role="alert"
                                >
                                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-xs text-muted-foreground text-center mt-6">
                            Default: admin / admin123 (edit in constants.ts)
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen starfield px-4 py-8" role="main">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Admin Panel
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your personal link profile
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>

                {error && (
                    <div
                        className="p-4 bg-red-500/20 border border-red-500 text-red-400 rounded-lg mb-6 relative z-10 flex gap-3"
                        role="alert"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>{error}</div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-8 relative z-10">
                    <button
                        onClick={() => setPreviewMode(false)}
                        className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                            !previewMode
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border text-foreground hover:border-primary"
                        }`}
                    >
                        Edit Mode
                    </button>
                    <button
                        onClick={() => setPreviewMode(true)}
                        className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                            previewMode
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border text-foreground hover:border-primary"
                        }`}
                    >
                        Preview
                    </button>
                </div>

                {previewMode ? (
                    <div className="relative z-10">
                        <ProfileHeader profile={profile} isPreview={true} />
                        <LinksDisplay links={links} />
                    </div>
                ) : (
                    <div className="space-y-8 relative z-10">
                        {/* Profile Section */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Profile Settings
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Your name"
                                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="bio"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        value={profile.bio}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                bio: e.target.value,
                                            })
                                        }
                                        placeholder="Write a short bio"
                                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows={3}
                                    />
                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                                >
                                    Save Profile
                                </button>
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    Links ({links.length})
                                </h2>
                                <button
                                    onClick={handleAddLink}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Link
                                </button>
                            </div>

                            <div className="space-y-2" role="list">
                                {links.length === 0 ? (
                                    <p className="text-muted-foreground text-center py-8">
                                        No links yet. Add one to get started!
                                    </p>
                                ) : (
                                    links.map((link, index) => (
                                        <DraggableLinkItem
                                            key={link.id}
                                            link={link}
                                            index={index}
                                            total={links.length}
                                            isDragging={draggedItem === link.id}
                                            onEdit={handleEditLink}
                                            onDelete={handleDeleteLink}
                                            onToggleVisibility={
                                                handleToggleVisibility
                                            }
                                            onMoveUp={() =>
                                                handleMoveLink(index, "up")
                                            }
                                            onMoveDown={() =>
                                                handleMoveLink(index, "down")
                                            }
                                            onDragStart={(e) =>
                                                handleDragStart(e, link.id)
                                            }
                                            onDragEnd={handleDragEnd}
                                            onDrop={(e) =>
                                                handleDropOnItem(e, link.id)
                                            }
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Backup & Import Section */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Backup & Import
                            </h2>

                            <div className="flex gap-4 flex-wrap">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary"
                                >
                                    <Download className="w-4 h-4" />
                                    Export Data
                                </button>

                                <label className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary">
                                    <Upload className="w-4 h-4" />
                                    Import Data
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={handleImport}
                                        className="hidden"
                                        aria-label="Import data file"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3
                                id="modal-title"
                                className="text-xl font-bold text-white"
                            >
                                {editingLink ? "Edit Link" : "Add New Link"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 hover:bg-muted rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Close dialog"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="link-title"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    Title
                                </label>
                                <input
                                    id="link-title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., My Website"
                                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="link-url"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    URL
                                </label>
                                <input
                                    id="link-url"
                                    type="url"
                                    value={formData.url}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            url: e.target.value,
                                        })
                                    }
                                    placeholder="https://example.com"
                                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="link-icon"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    Icon
                                </label>
                                <select
                                    id="link-icon"
                                    value={formData.icon}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            icon: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {Object.keys(ICON_MAP).map((icon) => (
                                        <option key={icon} value={icon}>
                                            {icon.charAt(0).toUpperCase() +
                                                icon.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveLink}
                                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-muted"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Theme Switcher */}
            <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
        </main>
    );
}
