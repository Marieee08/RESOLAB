/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.resolve.fallback = { fs: false };
      return config;
    },

    experimental: {
      serverActions: true,
    },
    // Allow file uploads and static file serving
    serverRuntimeConfig: {
      uploadDir: './public/uploads',
    },
    publicRuntimeConfig: {
      uploadUrl: '/uploads',
    }
  };
  
  export default nextConfig;