/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/',
                permanent: true,
            }
        ]
    },
}

module.exports = nextConfig
