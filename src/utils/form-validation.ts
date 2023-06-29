import { ZodType } from 'zod'

type ActionType<T> = (data: T) => Promise<void>

export const withValidate = <T>(action: ActionType<T>, schema: ZodType<T>) => async (data: T) => {
	const valid = await schema.parse(data)

	if (!valid) {
		throw new Error('Invalid data')
	}

	console.log('HEYYY FROM VALIDATION')

	return action(data)
}
