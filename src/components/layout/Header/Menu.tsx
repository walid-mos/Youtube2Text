'use client'

import { usePathname } from 'next/navigation'
import { useAtomValue } from 'jotai'

import { isMenuOpenAtom } from '@/components/atoms/layout'
import { GITHUB_REPO_URL } from '@/utils/constants'
import MenuLink from './MenuLink'

type NavigationItems = { name: string; href: string; external?: boolean }[]

const navigation: NavigationItems = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Summarize',
		href: '/summarize',
	},
	{
		name: 'GitHub',
		href: GITHUB_REPO_URL,
		external: true,
	},
]

const Menu = () => {
	const pathname = usePathname()
	const isMenuOpen = useAtomValue(isMenuOpenAtom)

	return (
		<div className={`w-full md:flex md:items-center md:w-auto duration-300 origin-top md:transform-none md:h-auto ${!isMenuOpen ? 'scale-y-0 h-0' : 'h-auto'}`}>
			<ul className="gap-4 border-b-2 grow md:flex md:justify-between md:border-b-0">
				{navigation.map(({ href, name, external }) => {
					const isActive = pathname === href
					return (
						<MenuLink
							key={name}
							{...{
								isActive, href, name, external,
							}}
						/>
					)
				})}
			</ul>
		</div>
	)
}

export default Menu
