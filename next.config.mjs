import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;

    return {
        distDir: isDev ? '.next' : '.next_prod',
        experimental: {
            optimizePackageImports: [
                'react-icons/fa',
                'react-icons/fa6',
                'react-icons/lu',
                'react-icons/cg',
                'react-icons/tb',
            ],
        },
        webpack: (config, { dev }) => {
            config.resolve.alias.canvas = false;
            if (dev) {
                config.cache = false;
            }
            return config;
        },
    };
};

export default nextConfig;
