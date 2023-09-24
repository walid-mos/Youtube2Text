import createIntlMiddleware from 'next-intl/middleware'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import { LOCALES, LOCALE_DEFAULT } from '@/utils/constants'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

export async function middleware(request: NextRequest) {
	// ------------------------------
	// Internationalization middleware
	const handleI18nRouting = createIntlMiddleware({
		locales: [...LOCALES],
		defaultLocale: LOCALE_DEFAULT,
		localePrefix: 'always',
	})
	const response = handleI18nRouting(request)

	// ------------------------------
	// Auth middleware
	createMiddlewareClient<Database>({ req: request, res: response })
	// await supabase.auth.getSession()

	// Step 3: Alter the response
	response.headers.set('x-default-locale', LOCALE_DEFAULT)

	return response
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
	],
}
