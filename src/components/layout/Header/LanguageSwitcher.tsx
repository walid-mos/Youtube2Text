'use client'

import { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter, usePathname } from 'next/navigation'
import { useAtom, useAtomValue } from 'jotai'

import { isLanguageMenuOpenAtom, languagesMenuIndexAtom, isLoadedLanguageMenuAtom } from '@/components/atoms/layout'
import { ChevronDownIcon, FRFlagIcon, USFlagIcon } from '@/components/icons'
import StepCheck from '@/components/icons/svg/StepCheck'

import { LOCALES_TYPE, LOCALE_COOKIE_NAME } from '@/utils/constants'
import { generateLocalePath } from '@/utils/url'
import LoadingAnimated from '@/components/icons/svg/LoadingAnimated'

type LanguagesType = {
	name: string
	code: LOCALES_TYPE
	icon: JSX.Element
}[]

const languages: LanguagesType = [
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
	const isLoadedLanguageMenuIndex = useAtomValue(isLoadedLanguageMenuAtom)
	const [languageMenuIndex, setLanguageMenuIndex] = useAtom(languagesMenuIndexAtom)

	const router = useRouter()
	const pathname = usePathname()
	const [cookies, setCookie] = useCookies([LOCALE_COOKIE_NAME])
	const languageDropdownRef = useRef(null)

	const switchLanguage = (code: LOCALES_TYPE) => {
		setLanguageMenuIndex(languages.findIndex((lang) => lang.code === code))
		setIsLanguageMenuOpen(false)
		setCookie(LOCALE_COOKIE_NAME, code)
		router.push(generateLocalePath(code, pathname))
	}

	// Set the language menu index to the current language
	useEffect(() => {
		setLanguageMenuIndex(languages.findIndex((lang) => lang.code === cookies[LOCALE_COOKIE_NAME]))
	}, [])

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
					{isLoadedLanguageMenuIndex ? languages[languageMenuIndex].icon : <LoadingAnimated className="rounded-full text-gray-700/20 dark:text-gray-400/30 fill-white/80" />}
				</span>
				<ChevronDownIcon size="s" />
			</button>
			{isLanguageMenuOpen && (
				<div className="absolute top-0 right-0 z-30 w-48 min-w-full mt-12 text-sm text-gray-700 bg-white rounded shadow-md" ref={languageDropdownRef}>
					<span className="absolute top-0 right-0 w-3 h-3 mr-3 -mt-1 transform rotate-45 bg-white" />
					<div className="relative z-10 w-full overflow-auto bg-white rounded">
						<ul className="list-reset">
							<li>
								{languages.map(({ name, code, icon }) => (
									<a key={code} onClick={() => switchLanguage(code)} href="#" className="flex items-center px-4 py-2 no-underline transition-colors duration-100 hover:bg-gray-100 hover:no-underline">
										<span className="inline-block mr-2 flag-icon">
											{icon}
										</span>
										<span className="inline-block">
											{name}
										</span>
										{code === cookies.i18next && (
											<span className="ml-auto">
												<StepCheck />
											</span>
										)}
									</a>
								))}
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default LanguageSwitcher
