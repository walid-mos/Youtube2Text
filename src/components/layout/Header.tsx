'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GITHUB_REPO_URL } from '@/utils/constants'

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

const Header: React.FC = () => {
	const pathname = usePathname()
	return (
		<div className="container mx-auto">
			<div className="flex flex-col items-center justify-between gap-2 pt-6 sm:h-20 sm:flex-row sm:pt-0">
				<Link href="/" className="text-2xl font-semibold duration-300 text-zinc-700 dark:text-zinc-50 hover:text-red-500 dark:hover:text-red-600">
					YSumAI
				</Link>
				{/* Desktop navigation */}
				<nav className="flex items-center grow">
					<ul className="flex flex-wrap items-center justify-end gap-4 grow">
						{navigation.map((item) => (
							<li className="" key={item.href}>
								<Link
									className={`flex items-center px-3 py-2 duration-300 font-medium text-sm sm:text-base hover:text-red-500  dark:hover:text-red-600
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
				</nav>
			</div>
		</div>
	)
}

export default Header
