"use client";

export function PageFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 mb-20 relative z-10 border-t border-border/50 pt-8">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                    Connect with Rohit Dudi across all platforms.
                </p>
                <div className="flex justify-center gap-6 text-xs text-muted-foreground mb-4 flex-wrap">
                    <a
                        href="https://devrohitdudi.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Website
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.youtube.com/@RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        YouTube
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.instagram.com/realrohitdudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Instagram
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.linkedin.com/in/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        LinkedIn
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://x.com/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        X
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.facebook.com/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Facebook
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.threads.com/@realrohitdudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Threads
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.github.com/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Github
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.reddit.com/r/Real_Rohit_Dudi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Reddit
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://in.pinterest.com/RealRohitDudi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Pinterest
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://www.tumblr.com/blog/realrohitdudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Tumblr
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://soundcloud.com/rohit-dudi-286180280"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        SoundCloud
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://open.spotify.com/user/31i7aqr2qho5vqgorzfi7dzdbdly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Spotify
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://discord.gg/ZHM6gfDz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Discord
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://t.me/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Telegram
                    </a>
                    <span className="text-border">•</span>
                    <a
                        href="https://whatsapp.com/channel/0029VaAFT0cFy727f8XzfR18"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Whatsapp Channel
                    </a>
                </div>
                <p className="text-xs text-muted-foreground/60">
                    © {currentYear} Rohit Dudi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
