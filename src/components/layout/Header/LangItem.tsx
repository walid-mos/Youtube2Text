'use client'

import { useSetAtom } from 'jotai'
import { useCookies } from 'react-cookie'
import { useRouter, usePathname } from 'next/navigation'

import { generateLocalePath } from '@/utils/url'
import StepCheck from '@/components/icons/svg/StepCheck'
import { LOCALE_COOKIE_NAME } from '@/utils/constants'
import { isLanguageMenuOpenAtom, languagesMenuIndexAtom } from '@/components/atoms/layout'
import { languages, type LOCALES_TYPE } from '@/locales/languages'

type Props = {
	name: string
	code: LOCALES_TYPE
	icon: JSX.Element
	isSelected: boolean
}

const LangItem = ({
	name, code, icon, isSelected,
}: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const [, setCookie] = useCookies([LOCALE_COOKIE_NAME])

	const setLanguageMenuIndex = useSetAtom(languagesMenuIndexAtom)
	const setIsLanguageMenuOpen = useSetAtom(isLanguageMenuOpenAtom)

	const switchLanguage = (newCode: LOCALES_TYPE) => {
		setLanguageMenuIndex(languages.findIndex((lang) => lang.code === newCode))
		setIsLanguageMenuOpen(false)
		setCookie(LOCALE_COOKIE_NAME, code)
		router.push(generateLocalePath(code, pathname))
	}
	return (
		<a onClick={() => switchLanguage(code)} href="#" className="flex items-center px-4 py-2 no-underline transition-colors duration-100 hover:bg-gray-100 hover:no-underline">
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
		</a>
	)
}

export default LangItem
