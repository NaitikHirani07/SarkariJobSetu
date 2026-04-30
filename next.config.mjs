/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow static image imports from the public folder
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
