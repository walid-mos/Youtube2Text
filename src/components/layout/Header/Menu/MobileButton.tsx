'use client'

import { useSetAtom } from 'jotai'
import { Bars3Icon } from '@heroicons/react/24/outline'

import { isMenuOpenAtom } from '@/atoms/layout'

const MobileBars = () => {
	const setIsMenuOpen = useSetAtom(isMenuOpenAtom)

	return (
		<Bars3Icon
			className="block w-6 h-6 text-white transition-all cursor-pointer md:hidden"
			onClick={() => setIsMenuOpen((prev) => !prev)}
		/>
	)
}

export default MobileBars
