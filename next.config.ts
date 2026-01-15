import type { NextConfig } from "next";
const BASE_URL = process.env.PUBLIC_API_URL ?? "http://10.28.7.6:3001";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
