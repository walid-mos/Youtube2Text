import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

// export const middleware = async (request: NextRequest) => {
// 	throw new Error('This should be called')
// 	const response = NextResponse.next()
// 	const supabase = createMiddlewareClient<Database>({ req: request, res: response })
// 	await supabase.auth.getSession()
// 	return response
// }

export const config = {
	matcher: '/*',
}

export async function middleware(request: NextRequest) {
	const response = NextResponse.next()
	throw new Error('This should be called')
	const supabase = createMiddlewareClient<Database>({ req: request, res: response })
	await supabase.auth.getSession()
	return response
}
