import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "oaidalleapiprodscus.blob.core.windows.net", "localhost", "example.com"],
    },
    experimental: {
        middleware: true,
    },
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY, // 環境変数を追加
    },
};
export default nextConfig;