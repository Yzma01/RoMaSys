/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,
    serverRuntineConfig: {
        MONGODB_URI: "mongodb://localhost/EXAMEN_jrojas",//!Cambiaaaaaaaar
       // secret: 'Aqui colocar algo para que sea diferente a los demas que ya lo hice'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000' // development api
            : 'http://localhost:3000' // production api
    }


};

export default nextConfig;
