import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rohit Dudi - Personal Links",
    description:
        "Explore my social media, content, and connect with me across all platforms. Digital creator and developer.",
    generator: "v0.app",
    icons: {
        icon: [
            {
                url: "/favicon.png",
                sizes: "any",
            },
        ],
        apple: {
            url: "/favicon.png",
            sizes: "180x180",
        },
        shortcut: "/favicon.png",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preload critical fonts for performance */}
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@400;700&display=swap"
                    as="style"
                />
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&display=swap"
                    as="style"
                />
                {/* Google Site Verification */}
                <meta
                    name="google-site-verification"
                    content="tziaHAHC1l1FcK8MvSbKARbP83hZ1GHmlYzpyHeNa6Y"
                />
                {/* Basic SEO Meta Tags */}
                <meta
                    name="keywords"
                    content="Rohit, Dudi, Rohit Dudi, personal links, social media, developer, digital creator"
                />
                <meta name="author" content="Rohit Dudi" />
                <meta name="copyright" content="Rohit Dudi" />
                <meta name="theme-color" content="#00d9ff" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5"
                />
                {/* Canonical URL */}
                <link rel="canonical" href="https://devrohitdudi.vercel.app/" />
                {/* Preconnects */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="dns-prefetch" href="https://cdn.vercel.com" />
                {/* Open Graph Meta Tags */}
                <meta
                    property="og:title"
                    content="Rohit Dudi - Personal Links & Social Media"
                />
                <meta
                    property="og:description"
                    content="Connect with Rohit Dudi across all platforms. Find links to my YouTube, Instagram, LinkedIn, GitHub, and more social media accounts."
                />
                <meta
                    property="og:url"
                    content="https://devrohitdudi.vercel.app/"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://devrohitdudi.vercel.app/og-image.png"
                />
                <meta
                    property="og:image:alt"
                    content="Rohit Dudi Personal Links"
                />
                <meta property="og:site_name" content="Rohit Dudi Links" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Rohit Dudi - Personal Links & Social Media"
                />
                <meta
                    name="twitter:description"
                    content="Connect with Rohit Dudi across all platforms. Find links to my YouTube, Instagram, LinkedIn, GitHub, and more social media accounts."
                />
                <meta
                    name="twitter:image"
                    content="https://devrohitdudi.vercel.app/og-image.png"
                />
                <meta name="twitter:creator" content="@RealRohitDudi" />
                <meta name="twitter:site" content="@RealRohitDudi" />
                {/* Robots Meta Tag */}
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
                {/* Structured Data: JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Person",
                                    "@id": "https://devrohitdudi.vercel.app/#person",
                                    name: "Rohit Dudi",
                                    url: "https://devrohitdudi.vercel.app/",
                                    image: "https://devrohitdudi.vercel.app/profile.jpg",
                                    sameAs: [
                                        "https://devrohitdudi.vercel.app",
                                        "https://www.youtube.com/@RealRohitDudi",
                                        "https://www.instagram.com/realrohitdudi",
                                        "https://www.linkedin.com/in/RealRohitDudi",
                                        "https://x.com/RealRohitDudi",
                                        "https://www.facebook.com/RealRohitDudi",
                                        "https://www.threads.com/@realrohitdudi",
                                        "https://www.github.com/RealRohitDudi",
                                        "https://www.reddit.com/r/Real_Rohit_Dudi/",
                                        "https://in.pinterest.com/RealRohitDudi/",
                                        "https://www.tumblr.com/blog/realrohitdudi",
                                        "https://soundcloud.com/rohit-dudi-286180280",
                                        "https://open.spotify.com/user/31i7aqr2qho5vqgorzfi7dzdbdly",
                                        "https://discord.gg/ZHM6gfDz",
                                        "https://t.me/RealRohitDudi",
                                        "https://whatsapp.com/channel/0029VaAFT0cFy727f8XzfR18",
                                    ],
                                    jobTitle: "Developer & Content Creator",
                                    description:
                                        "Connect with Rohit Dudi across all platforms. Personal links for Rohit Dudi, digital creator and developer.",
                                },
                                {
                                    "@type": "WebSite",
                                    "@id": "https://devrohitdudi.vercel.app/#website",
                                    url: "https://devrohitdudi.vercel.app/",
                                    name: "Rohit Dudi - Personal Links",
                                    description:
                                        "Connect with Rohit Dudi across all platforms. Personal links for Rohit Dudi, digital creator and developer.",
                                    potentialAction: {
                                        "@type": "SearchAction",
                                        target: "https://devrohitdudi.vercel.app/?q={search_term_string}",
                                        "query-input":
                                            "required name=search_term_string",
                                    },
                                },
                                {
                                    "@type": "BreadcrumbList",
                                    itemListElement: [
                                        {
                                            "@type": "ListItem",
                                            position: 1,
                                            name: "Home",
                                            item: "https://devrohitdudi.vercel.app/",
                                        },
                                    ],
                                },
                            ],
                        }),
                    }}
                />
            </head>
            <body className={`font-sans antialiased`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
