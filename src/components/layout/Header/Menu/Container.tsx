'use client'

import { useAtom } from 'jotai'

import { isMenuOpenAtom } from '@/atoms/layout'

type Props = {
	children: React.ReactNode
}

const MenuContainer: React.FC<Props> = ({ children }) => {
	const [isMenuOpen] = useAtom(isMenuOpenAtom)
	return (
		<div
			className={`w-full md:flex md:items-center md:w-auto duration-300 origin-top md:transform-none md:h-auto ${
				!isMenuOpen ? 'scale-y-0 h-0' : 'h-auto float-right'
			}`}
		>
			{children}
		</div>
	)
}

export default MenuContainer
