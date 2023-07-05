import { LOCALES } from '@/utils/constants'

import type { LOCALES_TYPE } from '@/locales/languages'

export const generateLocalePath = (locale: LOCALES_TYPE, path: string) => {
	const pathArray = path.split('/')
	const pathArrayWithoutLocale = pathArray.filter((pathItem) => !LOCALES.includes(pathItem))
	const pathWithoutLocale = pathArrayWithoutLocale.join('/')
	const localePath = `/${locale}`
	return `${localePath}${pathWithoutLocale}`
}
