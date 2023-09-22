import { getTranslator } from 'next-intl/server'

import { GITHUB_REPO_URL, type LOCALES_TYPE } from '@/utils/constants'

const navigation = [
	{
		name: 'home',
		href: '/',
		external: false,
	},
	{
		name: 'summarize',
		href: '/summarize',
		external: false,
	},
	{
		name: 'github',
		href: GITHUB_REPO_URL,
		external: true,
	},
] as const

export const getNavigationLinks = async (lang: LOCALES_TYPE) => {
	const t = await getTranslator(lang, 'layout.menu')

	return navigation.map(link => ({
		...link,
		name: t(link.name),
	}))
}

export type NavigationLinks = Awaited<ReturnType<typeof getNavigationLinks>>
