'use client'

import {
	useState, useEffect, useRef,
} from 'react'
import { useCookies } from 'react-cookie'
import { useAtom } from 'jotai'

import { isLanguageMenuOpenAtom } from '@/components/atoms/layout'
import { ChevronDownIcon, FRFlagIcon, USFlagIcon } from '@/components/icons'

import { LOCALE_COOKIE_NAME, LOCALE_DEFAULT, LOCALES_TYPE } from '@/utils/constants'
import LoadingAnimated from '@/components/icons/svg/LoadingAnimated'
import LangItem from './LangItem'

type LanguagesType = {
	name: string
	code: LOCALES_TYPE
	icon: JSX.Element
}

export const languages: LanguagesType[] = [
	{
		name: 'English',
		code: 'en-US',
		icon: <USFlagIcon />,
	},
	{
		name: 'Français',
		code: 'fr',
		icon: <FRFlagIcon />,
	},
]

const LanguageSwitcher = () => {
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useAtom(isLanguageMenuOpenAtom)
	const [localeState, setLocale] = useState<LanguagesType | null>(null)
	const languageDropdownRef = useRef(null)

	const [cookies] = useCookies([LOCALE_COOKIE_NAME])

	useEffect(() => {
		const locale = languages.find(({ code }) => {
			if (!cookies[LOCALE_COOKIE_NAME]) return code === LOCALE_DEFAULT
			return code === cookies[LOCALE_COOKIE_NAME]
		}) as LanguagesType
		setLocale(locale)
	}, [cookies])

	// Close the language menu when the user clicks outside of it
	useEffect(() => {
		if (!isLanguageMenuOpen) return undefined
		function handleClick(event: MouseEvent) {
			if (languageDropdownRef.current && !(languageDropdownRef.current as HTMLElement).contains(event.target as Node)) {
				setIsLanguageMenuOpen(false)
			}
		}
		document.addEventListener('click', handleClick)
		// clean up
		return () => document.removeEventListener('click', handleClick)
	}, [isLanguageMenuOpen])

	return (
		<div className="relative hidden pb-5 md:block">
			<button type="button" className="flex items-center py-2 pl-5 pr-3 text-gray-500 bg-white rounded shadow focus:outline-none" onClick={() => setIsLanguageMenuOpen((get) => !get)}>
				<span className="pr-4">
					{ localeState ? localeState.icon : <LoadingAnimated className="rounded-full text-gray-700/20 dark:text-gray-400/30 fill-white/80" />}
				</span>
				<ChevronDownIcon size="s" />
			</button>
			{isLanguageMenuOpen && localeState && (
				<div className="absolute top-0 right-0 z-30 w-48 min-w-full mt-12 text-sm text-gray-700 bg-white rounded shadow-md" ref={languageDropdownRef}>
					<span className="absolute top-0 right-0 w-3 h-3 mr-3 -mt-1 transform rotate-45 bg-white" />
					<div className="relative z-10 w-full overflow-auto bg-white rounded">
						<ul className="list-reset">
							{languages.map((language) => {
								const isSelected = language.code === localeState.code
								return (
									<li key={language.code}>
										<LangItem isSelected={isSelected} {...language} />
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default LanguageSwitcher
