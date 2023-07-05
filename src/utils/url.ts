import { LOCALES, LOCALES_TYPE } from '@/utils/constants'

export const generateLocalePath = (locale: LOCALES_TYPE, path: string) => {
	const pathArray = path.split('/')
	const pathArrayWithoutLocale = pathArray.filter((pathItem) => !LOCALES.includes(pathItem))
	const pathWithoutLocale = pathArrayWithoutLocale.join('/')
	const localePath = `/${locale}`
	return `${localePath}${pathWithoutLocale}`
}
