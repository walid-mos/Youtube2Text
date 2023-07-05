'use client'

import { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useAtom, useAtomValue } from 'jotai'

import { isLanguageMenuOpenAtom, languagesMenuIndexAtom, isLoadedLanguageMenuAtom } from '@/components/atoms/layout'
import { ChevronDownIcon } from '@/components/icons'

import { LOCALE_COOKIE_NAME, LOCALE_DEFAULT } from '@/utils/constants'
import LoadingAnimated from '@/components/icons/svg/LoadingAnimated'
import { languages } from '@/locales/languages'
import LangItem from './LangItem'

const LanguageSwitcher = () => {
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useAtom(isLanguageMenuOpenAtom)
	const isLoadedLanguageMenuIndex = useAtomValue(isLoadedLanguageMenuAtom)
	const [languageMenuIndex, setLanguageMenuIndex] = useAtom(languagesMenuIndexAtom)

	const [cookies] = useCookies([LOCALE_COOKIE_NAME])
	const languageDropdownRef = useRef(null)

	// Set the language menu index to the current language
	useEffect(() => {
		setLanguageMenuIndex(isLoadedLanguageMenuIndex
			? languages.findIndex((lang) => lang.code === cookies[LOCALE_COOKIE_NAME])
			: languages.findIndex((lang) => lang.code === LOCALE_DEFAULT))
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
								{languages.map((language) => {
									const isSelected = language.code === languages[languageMenuIndex].code
									return (
										<LangItem key={language.code} isSelected={isSelected} {...language} />
									)
								})}
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default LanguageSwitcher
