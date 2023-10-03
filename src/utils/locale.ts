import 'server-only'
import { cache } from 'react'

import { LOCALES_TYPE } from './constants'

export const ServerLocale = <T>(defaultValue: T): { getServerLocale: () => T; setServerLocale: (v: T) => void } => {
	const getRef = cache(() => ({ current: defaultValue }))
	const getServerLocale = (): T => getRef().current

	const setServerLocale = (value: T) => {
		getRef().current = value
	}
	return { getServerLocale, setServerLocale }
}

export const { getServerLocale, setServerLocale } = ServerLocale<LOCALES_TYPE>('en-US')
