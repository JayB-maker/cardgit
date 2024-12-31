/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // mapsApiKey: process.env.MAPS_API_KEY,
    // sessionSecret: process.env.SESSION_SECRET,
    // appEnv: process.env.APP_ENV,
    API_BASE_URL: process.env.NEXT_APP_API_BASE_URL,
    PAYSTACK_KEY: process.env.NEXT_APP_PAYSTACK_KEY,
    APP_ENV: process.env.NEXT_APP_APP_ENV,
    SESSION_SECRET: process.env.NEXT_APP_SESSION_SECRET,
    PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    GOOGLE_CLIENT_ID: process.env.NEXT_APP_GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;
