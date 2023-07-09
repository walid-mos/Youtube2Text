'use client'

import {
	useEffect, useRef,
} from 'react'
import { useAtom } from 'jotai'

import { isLanguageMenuOpenAtom } from '@/atoms/layout'
import { ChevronDownIcon, FRFlagIcon, USFlagIcon } from '@/components/icons'
import LangItem from './LangItem'

import type { LOCALES_TYPE } from '@/utils/constants'

type Props = {
	lang: LOCALES_TYPE
}

type LanguagesType = {
	name: string
	code: LOCALES_TYPE
	icon: JSX.Element
}

export const languagesArray: LanguagesType[] = [
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

const LanguageSwitcher: React.FC<Props> = ({ lang }) => {
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useAtom(isLanguageMenuOpenAtom)
	const languageDropdownRef = useRef(null)

	const localeObject = languagesArray.find(({ code }) => code === lang) as LanguagesType

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
					{ localeObject.icon}
				</span>
				<ChevronDownIcon size="s" />
			</button>
			{isLanguageMenuOpen && (
				<div className="absolute top-0 right-0 z-30 w-48 min-w-full mt-12 text-sm text-gray-700 bg-white rounded shadow-md" ref={languageDropdownRef}>
					<span className="absolute top-0 right-0 w-3 h-3 mr-3 -mt-1 transform rotate-45 bg-white" />
					<div className="relative z-10 w-full overflow-auto bg-white rounded">
						<ul className="list-reset">
							{languagesArray.map((language) => {
								const isSelected = language.code === localeObject.code
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
