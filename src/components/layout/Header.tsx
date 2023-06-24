'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { GITHUB_REPO_URL } from '@/utils/constants'

export type NavigationItems = { name: string; href: string; external?: boolean }[]

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

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = usePathname()

	return (
		<div className="container mx-auto">
			<nav className="flex flex-wrap items-center justify-between gap-2 pt-2 md:flex-row md:pt-0">
				<Link href="/" className="text-2xl font-semibold text-transparent duration-300 bg-gradient-to-tr bg-clip-text from-red-400 to-red-700 hover:text-zinc-700 dark:from-red-200 dark:to-red-500 dark:hover:text-zinc-50">
					YSumAI
				</Link>
				{/* Mobile navigation */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="menu-button"
					className="block w-6 h-6 transition-all cursor-pointer md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
				{/* Desktop navigation */}
				<div className={`w-full md:flex md:items-center md:w-auto duration-300 origin-top md:transform-none md:h-auto ${!isMenuOpen ? 'scale-y-0 h-0' : 'h-auto'}`}>
					<ul className="gap-4 border-b-2 grow md:flex md:justify-between md:border-b-0">
						{navigation.map((item) => (
							<li className="" key={item.href}>
								<Link
									className={`flex items-center justify-center px-3 py-2 duration-300 font-medium text-xl md:text-base hover:text-red-500  dark:hover:text-red-600
                    ${pathname === item.href ? 'text-red-600 dark:text-red-600' : 'text-zinc-600 dark:text-zinc-50'}`}
									href={item.href}
									target={item.external ? '_blank' : undefined}
									rel={item.external ? 'noopener noreferrer' : undefined}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</div>
	)
}

export default Header
