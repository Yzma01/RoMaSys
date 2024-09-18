/** @type {import('next').NextConfig} */

const nextConfig = {

    reactStrictMode: true,
    serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/romadb',
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://mi-app.com',
  },


};

export default nextConfig;
