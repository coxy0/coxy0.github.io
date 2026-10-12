import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // shortcut: no basePath, correct for <user>.github.io; set it if deploying to a project repo.
};

export default nextConfig;
