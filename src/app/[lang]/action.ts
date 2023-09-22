'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { isString } from 'radash'

import type { Database } from '@/types/database.types'

export const onLinkSubmit = async (formData: FormData) => {
	const link = formData.get('link')

	if (!link || !isString(link)) {
		throw new Error('Error with link')
	}

	await new Promise(resolve => {
		const supabase = createServerActionClient<Database>({ cookies }, { options: { db: { schema: 'links' } } })
		supabase
			.from('queries')
			.insert([{ link }])
			.select()
			.limit(1)
			.single()
			.then(({ data }) => {
				if (!data) throw new Error('')

				supabase.from('links.process_step').insert([{ link_id: data.id }])
			})

		setTimeout(resolve, 1500)
	})

	redirect(`/summarize/?${new URLSearchParams([['link', link]])}`)
}
