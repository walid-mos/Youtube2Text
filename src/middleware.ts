import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { LOCALES, LOCALE_DEFAULT, LOCALE_COOKIE_NAME } from '@/utils/constants'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

acceptLanguage.languages(LOCALES)

const getLocale = (request: NextRequest) => {
	if (request.cookies.has(LOCALE_COOKIE_NAME)) return acceptLanguage.get(request.cookies.get(LOCALE_COOKIE_NAME)?.value)
	return acceptLanguage.get(request.headers.get('Accept-Language')) || LOCALE_DEFAULT
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
	],
}
export async function middleware(request: NextRequest) {
	const response = NextResponse.next()

	// ------------------------------
	// Auth middleware
	const supabase = createMiddlewareClient<Database>({ req: request, res: response })
	await supabase.auth.getSession()

	// ------------------------------
	// Internationalization middleware

	// Redirect if there is no locale
	const { pathname } = request.nextUrl
	const pathnameIsMissingLocale = LOCALES.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	)
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request) || LOCALE_DEFAULT

		// e.g. incoming request is /generate -> The new URL is now /en-US/generate
		return NextResponse.redirect(
			new URL(`/${locale}/${pathname}`, request.url),
		)
	}

	return response
}
