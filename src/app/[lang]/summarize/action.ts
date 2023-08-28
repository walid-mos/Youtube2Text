'use server'

import { z } from 'zod'

import { withValidate } from '@/utils/form-validation'

import type { ActionProps } from '@/types/server.actions'
import type { LinksType } from '@/types/types'

const schema = z.array(z.string().url())

export const saveLinks = withValidate<LinksType>(
	async (formData: ActionProps<LinksType>) => {
		const { errors, data } = formData
		// console.log({ formData })
		if (errors?.isError) {
			return { errors, data }
		}

		return { data }
	},
	schema,
)

// // import { cookies } from 'next/headers'
// // import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

// export type ActionProps<T> = T | any
// export type ActionType<T> = (data: ActionProps<T>) => Promise<[ZodIssue[] | null, T?]>

// const schema = z.array(z.string().url())

// export const saveLinks : ActionType<string[]> = withValidate((data) => {
// 	if (data[0]) {
// 		return Promise.resolve([data.error])
// 	}

// 	const links = data

// 	// const supabase = createServerActionClient({ cookies })
// 	// await supabase.auth.getSession()

// 	// const promesses = links.map((link) => supabase.from('links').insert({ link, date: new Date() }))

// 	// const results = await Promise.all(promesses)

// 	// results.filter((result) => result.error).forEach((result) => {
// 	// 	console.error('Error while saving links')
// 	// 	console.error(result)
// 	// })
// 	console.log('HEYYY FROM ACTION')
// 	console.log(links)

// 	return Promise.resolve([null, links])
// }, schema)
