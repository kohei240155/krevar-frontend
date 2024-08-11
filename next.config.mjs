/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
    experimental: {
        middleware: true,
    },
};

export default nextConfig;