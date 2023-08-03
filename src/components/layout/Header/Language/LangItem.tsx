'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSetAtom } from 'jotai'

import StepCheck from '@/components/icons/svg/StepCheck'
import type { LOCALES_TYPE } from '@/utils/constants'
import { isLanguageMenuOpenAtom } from '@/atoms/layout'

type Props = {
	name: string
	code: LOCALES_TYPE
	icon: JSX.Element
	isSelected: boolean
}

const LangItem = ({
	name, code, icon, isSelected,
}: Props) => {
	const pathname = usePathname()
	const setIsLanguageMenuOpen = useSetAtom(isLanguageMenuOpenAtom)

	const onClick = () => {
		setIsLanguageMenuOpen(false)
	}

	const switchLanguage = (newLangCode: LOCALES_TYPE) => {
		if (!pathname) return '/'
		const segments = pathname.split('/')
		segments[1] = newLangCode
		return segments.join('/')
	}

	return (
		<Link href={switchLanguage(code)} onClick={() => onClick()} className="flex items-center px-4 py-2 no-underline transition-colors duration-100 hover:bg-gray-100 hover:no-underline">
			<span className="inline-block mr-2 flag-icon">
				{icon}
			</span>
			<span className="inline-block">
				{name}
			</span>
			{isSelected && (
				<span className="ml-auto">
					<StepCheck />
				</span>
			)}
		</Link>
	)
}

export default LangItem
