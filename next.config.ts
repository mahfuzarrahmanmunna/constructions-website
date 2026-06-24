/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com", // Kept in case you use Firebase Storage later
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
