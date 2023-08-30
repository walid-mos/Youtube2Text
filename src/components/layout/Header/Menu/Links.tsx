'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
	name: string
	href: string
	external?: boolean
}

const MenuLink: React.FC<Props> = ({ name, href, external }) => {
	const pathname = usePathname()
	const isActive = pathname === href

	return (
		<Link
			className={`flex items-center justify-center px-3 py-2 duration-300 font-medium text-xl md:text-base hover:text-red-500  dark:hover:text-red-600
                    ${
						isActive
							? 'text-red-600 dark:text-red-600'
							: 'text-zinc-600 dark:text-zinc-50'
					}`}
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
		>
			{name}
		</Link>
	)
}

export default MenuLink
