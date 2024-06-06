/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "screenshots.webflow.com",
      },
    ],
  },
};

export default nextConfig;
