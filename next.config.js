/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PROD_URL: process.env.PROD_URL,
    DEV_URL: process.env.DEV_URL,
    DB_URL: process.env.DB_URL
  }
}

module.exports = nextConfig
