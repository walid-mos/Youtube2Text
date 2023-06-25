'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

// eslint-disable-next-line import/prefer-default-export
export const saveLinks = async (links: string[]) => {
	const supabase = createServerActionClient({ cookies })
	await supabase.auth.getSession()

	const promesses = links.map((link) => supabase.from('links').insert({ link }))

	const results = await Promise.all(promesses)

	results.filter((result) => result.error).forEach((result) => {
		console.error('Error while saving links')
		console.error(result)
	})
}
