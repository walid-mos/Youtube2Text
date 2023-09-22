import createIntlMiddleware from 'next-intl/middleware'

import { LOCALES, LOCALE_DEFAULT } from '@/utils/constants'

import type { NextRequest } from 'next/server'

// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// import type { Database } from '@/types/database.types'

const handleI18nRouting = createIntlMiddleware({
	locales: [...LOCALES],
	defaultLocale: LOCALE_DEFAULT,
	localePrefix: 'always',
})

export async function middleware(request: NextRequest) {
	// const response = NextResponse.next()

	// ------------------------------
	// Auth middleware
	// const supabase = createMiddlewareClient<Database>({ req: request, res: response })
	// await supabase.auth.getSession()

	// ------------------------------
	// Internationalization middleware
	const response = handleI18nRouting(request)

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
