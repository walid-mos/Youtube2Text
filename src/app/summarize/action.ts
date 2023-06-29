'use server'

import { z } from 'zod'

import { withValidate } from '@/utils/form-validation'

// import { cookies } from 'next/headers'
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

const schema = z.array(z.string().url())

export const saveLinks = withValidate((links: string[]) => {
	// const supabase = createServerActionClient({ cookies })
	// await supabase.auth.getSession()

	// const promesses = links.map((link) => supabase.from('links').insert({ link, date: new Date() }))

	// const results = await Promise.all(promesses)

	// results.filter((result) => result.error).forEach((result) => {
	// 	console.error('Error while saving links')
	// 	console.error(result)
	// })
	console.log('HEYYY FROM ACTION')
	console.log(links)

	return Promise.resolve()
}, schema)
