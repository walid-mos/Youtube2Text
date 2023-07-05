'use client'

import { useCookies } from 'react-cookie'
import { LOCALE_COOKIE_NAME } from '@/utils/constants'
import { useRouter } from 'next/navigation'

const Button = () => {
	const router = useRouter()
	const [, setCookie] = useCookies([LOCALE_COOKIE_NAME])

	const switchToFrench = () => {
		setCookie(LOCALE_COOKIE_NAME, 'fr')
		router.push('/')
	}
	return (
		<button type="button" onClick={switchToFrench}>
			Switch to french
		</button>
	)
}

export default Button
