'use client'

import { isLanguageMenuOpenAtom } from '@/components/atoms/layout'
import { ChevronDownIcon, FRFlagIcon, USFlagIcon } from '@/components/icons'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

const languages = [
	{
		name: 'English',
		code: 'en-US',
		icon: <USFlagIcon />,
	},
	{
		name: 'Français',
		code: 'fr-FR',
		icon: <FRFlagIcon />,
	},
]

const LanguageSwitcher = () => {
	const isLanguageMenuOpen = useAtomValue(isLanguageMenuOpenAtom)
	const setIsLanguageMenuOpen = useSetAtom(isLanguageMenuOpenAtom)

	useEffect(() => {
		// Close the language menu when the user clicks outside of it
	}, [])

	return (
		<div className="relative hidden pb-5 md:block">
			<button type="button" className="flex items-center py-2 pl-5 pr-3 text-gray-500 bg-white rounded shadow-lg focus:outline-none" onClick={() => setIsLanguageMenuOpen((get) => !get)}>
				<span className="pr-4">
					{languages.find(({ code }) => code === 'en-US')?.icon}
				</span>
				<ChevronDownIcon size="s" />
			</button>
			<div className="absolute top-0 right-0 z-30 w-48 min-w-full mt-12 text-sm text-gray-700 bg-white rounded shadow-md">
				<span className="absolute top-0 right-0 w-3 h-3 mr-3 -mt-1 transform rotate-45 bg-white" />
				<div className="relative z-10 w-full overflow-auto bg-white rounded">
					<ul className="list-reset">
						<li>
							<a href="#" className="flex px-4 py-2 no-underline transition-colors duration-100 hover:bg-gray-100 hover:no-underline">
								<span className="inline-block mr-2 flag-icon" />
								<span className="inline-block" />
								<span className="ml-auto">
									<i className="mdi mdi-check" />
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default LanguageSwitcher
