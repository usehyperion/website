import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	redirects() {
		return [
			{
				source: '/',
				destination: '/introduction',
				permanent: true
			}
		];
	},
	experimental: {
		optimizePackageImports: ['@phosphor-icons/react']
	}
};

export default withMDX(config);
