/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.zyrosite.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.zyrosite.com",
        port: "",
        pathname: "/cdn-cgi/image/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-1483478550801-ceba5fe50e8e",
      },
    ],
  },
};

export default nextConfig;
