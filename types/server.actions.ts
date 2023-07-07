import { ZodError } from './Errors'

export type ActionProps<T> = {
	errors?: ZodError | null
	data: T
}
export type ActionType<T> = (data: ActionProps<T>) => Promise<ActionProps<T>>
