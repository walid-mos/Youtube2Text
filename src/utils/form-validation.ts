import type { ZodType, SafeParseReturnType } from 'zod'
import type { ActionType } from '@/types/server.actions'

const process = <T>(data: T, validation: SafeParseReturnType<T, T>) => {
	if (!validation.success) {
		const errors = {
			isError: true,
			issues: validation.error.issues.map(({ code, message }) => ({ code, message })),
		}

		return { errors, data }
	}

	return { data }
}

export const withValidate = <T>(action: ActionType<T>, schema: ZodType) => async (formData: T) => {
	const data = process<T>(formData, schema.safeParse(formData))

	return action(data)
}
