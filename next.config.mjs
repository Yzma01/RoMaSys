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
        : "https://ro-ma-sys-server.vercel.app",
  },

  //!Este es un proxy en el que source especifico que cuando este la ruta api, redireccione al puerto 5000
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BASE_URL_WHATSAPP}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
