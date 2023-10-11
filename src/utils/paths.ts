import { usePathname, useSearchParams } from 'next/navigation'

import type { LOCALES_TYPE } from './constants'

export const useSwitchLanguage = (newLangCode: LOCALES_TYPE) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const segments = pathname.split('/')
	const oldLang = segments[1]
	segments[1] = newLangCode

	let href = `${segments.join('/')}`
	if (searchParams.size > 0) {
		href += `?`
		const params: Array<string> = []
		searchParams.forEach((value, key) => {
			params.push(`${key}=${value}`)
		})
		href += params.join('&')
	}

	return [href, oldLang]
}
