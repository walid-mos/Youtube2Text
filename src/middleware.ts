import { LOCALES } from '@/utils/constants'

// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import createIntlMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
// import type { Database } from '@/types/database.types'

export async function middleware(request: NextRequest) {
	// const response = NextResponse.next()

	// ------------------------------
	// Auth middleware
	// const supabase = createMiddlewareClient<Database>({ req: request, res: response })
	// await supabase.auth.getSession()

	// ------------------------------
	// Internationalization middleware

	const handleI18nRouting = createIntlMiddleware({
		locales: LOCALES.langs as unknown as string[],
		defaultLocale: LOCALES.defaultLocale,
		localePrefix: 'always',
	})
	const response = handleI18nRouting(request)

	// Step 3: Alter the response
	response.headers.set('x-default-locale', LOCALES.defaultLocale)

	return response
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
	],
}
