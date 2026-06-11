import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sanyglobal-img.sany.com.cn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
