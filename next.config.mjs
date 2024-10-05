/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:5000",
  },
  
  // Configuración para las variables de entorno
  serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/romadb',
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://mi-app.com',
  },

  //!Este es un proxy en el que source especifico que cuando este la ruta api, redireccione al puerto 5000
  async rewrites() {
    return [
      {
        source: '/api/:path*', 
        destination: 'http://localhost:5000/api/:path*', 
      },
    ];
  },
};

export default nextConfig;
