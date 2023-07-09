import { LOCALES, LOCALES_TYPE } from '@/utils/constants'
import 'server-only'

const dictionaries = new Map(
	LOCALES.langs.map((code) => [
		code,
		() => import(`./dictionaries/${code}.json`).then((module) => module.default),
	]),
)

export const getDictionary = async (locale: LOCALES_TYPE) => {
	const dictionary = dictionaries.get(locale)
	if (!dictionary) {
		throw new Error(`Dictionary for locale ${locale} not found`)
	}
	return dictionary()
}
