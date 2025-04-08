/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure TypeScript handling
  typescript: {
    // Disable TypeScript errors in production build to deploy even with warnings
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  // Ensure we can use any source in images
  images: {
    domains: ['*'],
  },
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig 