import { usePathname } from 'next/navigation'

import type { LOCALES_TYPE } from './constants'

export const switchLanguage = (pathname: string, newLangCode: LOCALES_TYPE) => {
	const segments = pathname.split('/')
	const oldLang = segments[1]
	segments[1] = newLangCode
	return [segments.join('/'), oldLang]
}

export const getPathname = () => {
	const pathname = usePathname()

	// delete locale
	const [, , ...truePathname] = pathname.split('/')

	return `/${truePathname.join('/')}`
}
