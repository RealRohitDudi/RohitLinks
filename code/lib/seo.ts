import type { Metadata } from "next";

export function generateMetadata(overrides?: Partial<Metadata>): Metadata {
    const baseUrl = "https://devrohitdudi.vercel.app";

    const title = "Rohit Dudi - Personal Links & Social Media";
    const description =
        "Connect with Rohit Dudi across all platforms. Find links to my YouTube, Instagram, LinkedIn, GitHub, and more social media accounts.";

    return {
        title,
        description,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: baseUrl,
        },
        openGraph: {
            title,
            description,
            url: baseUrl,
            siteName: "Rohit Dudi Links",
            type: "website",
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: "Rohit Dudi Personal Links",
                    type: "image/png",
                },
            ],
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${baseUrl}/og-image.png`],
            creator: "@RealRohitDudi",
            site: "@RealRohitDudi",
        },
        robots: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        viewport: {
            width: "device-width",
            initialScale: 1,
            maximumScale: 5,
        },
        keywords: [
            "Rohit Dudi",
            "personal links",
            "Rohit",
            "Dudi",
            "social media links",
            "RealRohitDudi",
            "RohitDudi",
            "link aggregator",
            "YouTube",
            "Instagram",
            "LinkedIn",
            "GitHub",
        ],
        authors: [
            {
                name: "Rohit Dudi",
            },
        ],
        creator: "Rohit Dudi",
        ...overrides,
    };
}

export function generateJSONLD() {
    const baseUrl = "https://devrohitdudi.vercel.app";

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${baseUrl}/#person`,
                name: "Rohit Dudi",
                url: baseUrl,
                image: `${baseUrl}/profile.jpg`,
                sameAs: [
                    "https://www.youtube.com/@RealRohitDudi",
                    "https://www.instagram.com/realrohitdudi",
                    "https://www.linkedin.com/in/RealRohitDudi",
                    "https://x.com/RealRohitDudi",
                    "https://www.github.com/RealRohitDudi",
                    "https://www.facebook.com/RealRohitDudi",
                ],
                jobTitle: "Developer & Content Creator",
                description: "Connect with Rohit Dudi across all platforms.",
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                url: baseUrl,
                name: "Rohit Dudi - Personal Links",
                description: "Connect with Rohit Dudi across all platforms.",
                potentialAction: {
                    "@type": "SearchAction",
                    target: `${baseUrl}?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: baseUrl,
                    },
                ],
            },
        ],
    };
}

export function validateSEO(metadata: Metadata): {
    valid: boolean;
    issues: string[];
} {
    const issues: string[] = [];

    if (
        !metadata.title ||
        (typeof metadata.title === "string" && metadata.title.length < 10) ||
        (Array.isArray(metadata.title) && metadata.title.join(" ").length < 10)
    ) {
        issues.push("Title should be at least 10 characters");
    }

    if (!metadata.description || metadata.description.length < 50) {
        issues.push("Description should be at least 50 characters");
    }

    if (metadata.description && metadata.description.length > 160) {
        issues.push("Description should be less than 160 characters");
    }

    if (
        !metadata.keywords ||
        (Array.isArray(metadata.keywords) && metadata.keywords.length < 3)
    ) {
        issues.push("Should have at least 3 keywords");
    }

    return {
        valid: issues.length === 0,
        issues,
    };
}
