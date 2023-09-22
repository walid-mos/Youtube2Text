import Link from 'next/link'

import { NavbarItem, NavbarMenuItem } from '@nextui-org/navbar'

import { NavigationLinks } from '@/app/controller'
import { cn } from '@/utils/classnames'

type Props = {
	link: NavigationLinks[number]
	pathname: string
}

export const NavLink: React.FC<Props> = ({ link: { name, href, external }, pathname }) => (
	<NavbarItem
		key={name}
		isActive={pathname === href}
		className={cn(
			'relative group text-slate-700',
			'transition-all duration-300',
			'hover:text-stone-700 hover:font-medium',
			pathname === href &&
				'font-semi-bold text-transparent bg-gradient-to-tr bg-clip-text from-red-400 to-red-700 hover:text-red-800',
		)}
	>
		<span
			className={cn(
				'block absolute bg-current',
				'w-0 -bottom-2 left-0 h-[2px] rounded-[2px] transition-all duration-300',
				'group-hover:w-full',
			)}
		>
			{' '}
		</span>
		<Link href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
			{name}
		</Link>
	</NavbarItem>
)

export const NavMenuLink: React.FC<Props & { children: React.ReactNode }> = ({
	link: { name, href },
	pathname,
	children,
}) => (
	<NavbarMenuItem
		key={`${name}`}
		className={cn(
			'w-full text-xl font-medium',
			'my-2 text-slate-700',
			'focus:text-stone-700',
			pathname === href &&
				'font-semi-bold text-transparent bg-gradient-to-tr bg-clip-text from-red-400 to-red-700 hover:text-red-800',
		)}
	>
		{children}
	</NavbarMenuItem>
)
