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
                        href="https://github.com/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        GitHub
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
                </div>
                <p className="text-xs text-muted-foreground/60">
                    © {currentYear} Rohit Dudi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
