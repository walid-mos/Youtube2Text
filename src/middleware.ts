import { NextResponse } from 'next/server'

import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import { LOCALES, LOCALE_COOKIE_NAME } from '@/utils/constants'

// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import type { NextRequest } from 'next/server'
// import type { Database } from '@/types/database.types'

const getLocale = (request: NextRequest) => {
	const negotiatorHeaders: Record<string, string> = {}
	// eslint-disable-next-line no-return-assign
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

	const locales: string[] = [...LOCALES.langs]
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
		locales,
	)

	if (request.cookies.has(LOCALE_COOKIE_NAME)) {
		return matchLocale([request.cookies.get(LOCALE_COOKIE_NAME)?.value as string], locales, LOCALES.defaultLocale)
	}

	const locale = matchLocale(languages, locales, LOCALES.defaultLocale)

	return locale
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
	// const supabase = createMiddlewareClient<Database>({ req: request, res: response })
	// await supabase.auth.getSession()

	// ------------------------------
	// Internationalization middleware

	// Redirect if there is no locale
	const { pathname, search } = request.nextUrl
	const pathnameIsMissingLocale = LOCALES.langs.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	)
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)

		// e.g. incoming request is /generate -> The new URL is now /en-US/generate
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${search || ''}`,
				request.url,
			),
		)
	}

	return response
}
