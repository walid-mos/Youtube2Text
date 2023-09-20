'use client'

import Link from 'next/link'

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { useAtom } from 'jotai'

import { Button } from '@/components/global/Button'
import { isMenuOpenAtom } from '@/atoms/layout'
import { getPathname } from '@/utils/paths'

import Logo from './Header/Logo'
import { NavLink, NavMenuLink } from './Header/NavLink'

import type { NavigationLinks } from '@/app/controller'

type Props = {
	navigation: NavigationLinks
}

const Header: React.FC<Props> = ({ navigation }) => {
	const pathname = getPathname()
	const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom)

	return (
		<Navbar className="bg-inherit" shouldHideOnScroll isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarBrand>
				<Logo />
			</NavbarBrand>
			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				{navigation.map(link => (
					<NavLink link={link} pathname={pathname} />
				))}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />

				<NavbarItem className="hidden md:flex">
					<Button asChild color="primary" variant="default">
						<Link href="#">Sign Up / Login</Link>
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu className="px-12 my-6">
				{navigation.map(link => (
					<NavMenuLink link={link} pathname={pathname}>
						<Link href={link.href} onClick={() => setIsMenuOpen(false)}>
							{link.name}
						</Link>
					</NavMenuLink>
				))}
			</NavbarMenu>
		</Navbar>
	)
}

// <nav className="flex flex-wrap items-center justify-between gap-2 pt-2 md:flex-row md:pt-0">
// 	<Link
// 		href="/"
// 		className="text-2xl font-semibold text-transparent duration-300 bg-gradient-to-tr bg-clip-text from-red-400 to-red-700 hover:text-zinc-700 dark:from-red-200 dark:to-red-500 dark:hover:text-zinc-50"
// 	>
// 		YSumAI
// 	</Link>

// 	<Menu lang={lang} />
// </nav>

export default Header
