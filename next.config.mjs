/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
