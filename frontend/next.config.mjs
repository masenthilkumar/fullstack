/** @type {import('next').NextConfig} */
/**const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
    },
};

export default nextConfig;*/

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337', // Optional if your server is running on a specific port
                pathname: '/uploads/**', // Match specific paths
            },
        ],
    },
};

export default nextConfig;


