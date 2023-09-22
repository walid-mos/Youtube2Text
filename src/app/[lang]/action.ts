'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { isString } from 'radash'

import type { Database } from '@/types/database.types'

export const onLinkSubmit = async (formData: FormData) => {
	const link = formData.get('link')

	if (!link || !isString(link)) {
		throw new Error('Error with link')
	}

	await new Promise(resolve => {
		const supabase = createServerActionClient<Database>({ cookies })
		supabase.from('queries').insert([{ link }])
		setTimeout(resolve, 1500)
	})

	revalidatePath('/')
}
