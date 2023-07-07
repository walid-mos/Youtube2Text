'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCookies } from 'react-cookie'

// import { generateLocalePath } from '@/utils/url'
import StepCheck from '@/components/icons/svg/StepCheck'
import { LOCALES_TYPE, LOCALE_COOKIE_NAME } from '@/utils/constants'
import { useSetAtom } from 'jotai'
import { isLanguageMenuOpenAtom } from '@/components/atoms/layout'

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
	const [, setCookie] = useCookies([LOCALE_COOKIE_NAME])

	const onClick = (newLangCode: LOCALES_TYPE) => {
		setIsLanguageMenuOpen(false)
		setCookie(LOCALE_COOKIE_NAME, newLangCode)
	}

	const switchLanguage = (newLangCode: LOCALES_TYPE) => {
		if (!pathname) return '/'
		const segments = pathname.split('/')
		segments[1] = newLangCode
		return segments.join('/')
	}

	return (
		<Link href={switchLanguage(code)} onClick={() => onClick(code)} className="flex items-center px-4 py-2 no-underline transition-colors duration-100 hover:bg-gray-100 hover:no-underline">
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
