/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow static image imports from the public folder
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
