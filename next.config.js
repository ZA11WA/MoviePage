const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  // Remove experimental.appDir as it's now default in Next.js 13+
  // Add any other configuration you might need
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);