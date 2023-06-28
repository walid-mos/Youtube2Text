'use client'

import Link from 'next/link'
import { useSetAtom } from 'jotai'
import { Bars3Icon } from '@heroicons/react/24/outline'

import { isMenuOpenAtom } from '@/components/atoms/layout'
import Menu from './Menu'

const Header: React.FC = () => {
	const setIsMenuOpen = useSetAtom(isMenuOpenAtom)

	return (
		<div className="container mx-auto">
			<nav className="flex flex-wrap items-center justify-between gap-2 pt-2 md:flex-row md:pt-0">
				<Link href="/" className="text-2xl font-semibold text-transparent duration-300 bg-gradient-to-tr bg-clip-text from-red-400 to-red-700 hover:text-zinc-700 dark:from-red-200 dark:to-red-500 dark:hover:text-zinc-50">
					YSumAI
				</Link>
				{/* Mobile navigation */}
				<Bars3Icon
					className="block w-6 h-6 text-white transition-all cursor-pointer md:hidden"
					onClick={() => setIsMenuOpen((prev) => !prev)}
				/>
				{/* Desktop navigation */}
				<Menu />
			</nav>
		</div>
	)
}

export default Header
