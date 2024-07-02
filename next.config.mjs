/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        EXCHANGE_RATE_API: process.env.EXCHANGE_RATE_API,
        SERVER_URL: process.env.SERVER_URL,
    },
};

export default nextConfig;
