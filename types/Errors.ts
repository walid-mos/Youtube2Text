export type Error = {
	code: string,
	message: string
}

export type ZodError = {
	isError: boolean
	issues: Error[]
}
