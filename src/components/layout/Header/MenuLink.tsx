import Link from 'next/link'

type Props = {
	name: string
	href: string
	isActive: boolean
	external?: boolean
}

const MenuLink: React.FC<Props> = ({
	name, href, external, isActive,
}) => (
	<li>
		<Link
			className={`flex items-center justify-center px-3 py-2 duration-300 font-medium text-xl md:text-base hover:text-red-500  dark:hover:text-red-600
                    ${isActive ? 'text-red-600 dark:text-red-600' : 'text-zinc-600 dark:text-zinc-50'}`}
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
		>
			{name}
		</Link>
	</li>
)

export default MenuLink
