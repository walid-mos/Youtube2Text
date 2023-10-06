import { cookies } from 'next/headers'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { supabaseOptionsLinksSchema } from '@/supabase/shemasOptions'

import type { Database } from '@/types/database.types'

export const getProcessStepByUUID = async (uuid: string) => {
	const supabase = createServerComponentClient<Database>({ cookies }, supabaseOptionsLinksSchema)

	const { data, error } = await supabase
		.from('process_step')
		.select(`*, queries!inner(*)`)
		.eq('queries.uuid', uuid)
		.limit(1)
		.single()

	if (error || !data.queries) throw new Error('An error happened fetching queries')
	if (!data) return null

	return { ...data, queries: data.queries }
}

export const setProcessStepData = async (id: number, data: { [key: string]: unknown }) => {
	const supabase = createServerComponentClient<Database>({ cookies }, supabaseOptionsLinksSchema)

	await supabase.from('process_step').update(data).eq('id', id)
}

export type ProcessStepType = NonNullable<Awaited<ReturnType<typeof getProcessStepByUUID>>>
