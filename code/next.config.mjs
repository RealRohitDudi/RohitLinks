/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
        formats: ["image/webp", "image/avif"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/admin",
                destination: "/admin",
                permanent: false,
            },
        ];
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization.splitChunks.cacheGroups = {
                default: false,
                vendors: false,
                // Vendor chunk
                vendor: {
                    filename: "chunks/vendor.js",
                    test: /node_modules/,
                    priority: 10,
                    reuseExistingChunk: true,
                    name: "vendor",
                },
            };
        }
        return config;
    },
    productionBrowserSourceMaps: false,
    // ESLint configuration
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
