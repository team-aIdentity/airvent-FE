/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: [],
  },
  eslint: {
    // 빌드 시 ESLint 오류 무시
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
