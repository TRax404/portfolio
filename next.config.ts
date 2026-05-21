const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hydeparkwinterwonderland.com",
      },
      {
        protocol: "https",
        hostname: "wembleypark.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
    ],
    qualities: [75, 85, 95, 100, 50],
  },
  devIndicators: false,
};

export default nextConfig;
