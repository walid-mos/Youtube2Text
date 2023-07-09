'use client'

import { usePathname } from 'next/navigation'
import { useAtomValue, useSetAtom } from 'jotai'
import { Bars3Icon } from '@heroicons/react/24/outline'

import { isMenuOpenAtom } from '@/atoms/layout'
import { GITHUB_REPO_URL, type LOCALES_TYPE } from '@/utils/constants'

import LanguageSwitcher from './LanguageSwitcher'
import MenuLink from './MenuLink'

type Props = {
	lang: LOCALES_TYPE
}

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

const Menu: React.FC<Props> = ({ lang }) => {
	const pathname = usePathname()
	const isMenuOpen = useAtomValue(isMenuOpenAtom)
	const setIsMenuOpen = useSetAtom(isMenuOpenAtom)

	return (
		<>
			{/* Mobile navigation */}
			<Bars3Icon
				className="block w-6 h-6 text-white transition-all cursor-pointer md:hidden"
				onClick={() => setIsMenuOpen((prev) => !prev)}
			/>
			{/* Desktop navigation */}
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
					{!isMenuOpen && <LanguageSwitcher lang={lang} />}
				</ul>
			</div>
		</>
	)
}

export default Menu
