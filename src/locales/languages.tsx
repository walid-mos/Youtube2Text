import { FRFlagIcon, USFlagIcon } from '@/components/icons'

export type LOCALES_TYPE = 'en-US' | 'fr'

type LanguagesType = {
	name: string
	code: LOCALES_TYPE
	icon: JSX.Element
}[]

export const languages: LanguagesType = [
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
