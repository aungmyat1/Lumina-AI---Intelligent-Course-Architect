/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    serverComponentsExternalPackages: ["@google/genai"],
  },
};

module.exports = nextConfig;