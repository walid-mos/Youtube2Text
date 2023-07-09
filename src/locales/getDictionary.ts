import { LOCALES, LOCALES_TYPE } from '@/utils/constants'
import 'server-only'

type DictionaryType = typeof import('./dictionaries/en-US')

const dictionaries = new Map(
	LOCALES.langs.map((code) => [
		code,
		async () => {
			const dictionary = await import(`./dictionaries/${code}`) as DictionaryType
			return dictionary.default
		},
	]),
)

export const getDictionary = async (locale: LOCALES_TYPE) => {
	const dictionary = dictionaries.get(locale)
	if (!dictionary) {
		throw new Error(`Dictionary for locale ${locale} not found`)
	}
	return dictionary()
}
