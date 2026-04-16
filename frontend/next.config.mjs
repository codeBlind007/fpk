/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fpkbackend-production.up.railway.app",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "fpkbackend-production.up.railway.app",
        pathname: "/api/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
