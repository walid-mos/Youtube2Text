'use server'

// import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export const onLinkSubmit = async (formData: FormData) => {
	const data = formData

	console.log(formData)
	console.log(formData.get('link'))

	// const supabase = createServerActionClient({ cookies })
	// await supabase.auth.getSession()

	return data
}
