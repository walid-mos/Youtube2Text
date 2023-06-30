'use server'

import { z } from 'zod'

import { withValidate } from '@/utils/form-validation'

const schema = z.array(z.string().url())

type Error = {
	isError: boolean
	issues: {
		code: string,
		message: string
	}[]
}

export type ActionProps<T> = {
	errors?: Error | null
	data: T
}
export type ActionType<T> = (data: ActionProps<T>) => Promise<ActionProps<T>>

export const saveLinks = withValidate<string[]>((formData: ActionProps<string[]>) => {
	const { errors, data } = formData
	if (errors?.isError) {
		return Promise.resolve({ errors, data })
	}

	return Promise.resolve({ data })
}, schema)

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
