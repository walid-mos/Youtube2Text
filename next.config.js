/** @type {import('next').NextConfig} */

// eslint-disable-next-line node/no-missing-require
const withNextIntl = require('next-intl/plugin')(
	// This is the default (also the `src` folder is supported out of the box)
	'./i18n.ts',
)

module.exports = withNextIntl({
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				pathname: '**',
			},
		],
	},
})
