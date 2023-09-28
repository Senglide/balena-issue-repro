// @ts-check
/**
 * @type {import('next').NextConfig}
 * */
module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        config.externals.push('serialport')
        return config
    },
    transpilePackages: [
        '@dripl/utils',
        '@dripl/constants',
        '@dripl/components',
        '@dripl/locales',
    ],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        typedRoutes: true,
    },
    // output: 'standalone',
}
