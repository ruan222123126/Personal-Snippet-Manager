/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // 开启独立模式，优化 Docker 镜像体积
};

export default nextConfig;
