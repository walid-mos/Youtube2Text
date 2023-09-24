'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { isString } from 'radash'

import type { Database } from '@/types/database.types'

const supabaseOptions = {
	options: {
		db: {
			schema: 'links',
		},
	},
} as const

export const onLinkSubmit = async (formData: FormData) => {
	const link = formData.get('link')

	if (!link || !isString(link)) {
		throw new Error('Error with link')
	}

	const supabase = createServerActionClient<Database>({ cookies }, supabaseOptions)

	const { data, error: linkError } = await supabase.from('queries').insert([{ link }]).select().limit(1).single()

	if (!data) throw new Error(linkError.message)

	const { error: processError } = await supabase
		.from('process_step')
		.insert([{ link_id: data.id }])
		.select()

	if (processError?.message) throw new Error(processError.message)

	await new Promise(resolve => {
		setTimeout(resolve, 1500)
	})

	redirect(`/summarize/?${new URLSearchParams([['link', link]])}`)
}
