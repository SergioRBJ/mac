/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "mac-wine.vercel.app",
      "mac-sergiorbjs-projects.vercel.app",
      "mac-git-main-sergiorbjs-projects.vercel.app",
    ],
  },
};

export default nextConfig;
