/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },

  serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },

  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "ro-ma-sys.vercel.app",
  },

    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "https://ro-ma-sys-server.vercel.app/api/:path*", // URL del backend
        },
      ];
    },
  };

export default nextConfig;
