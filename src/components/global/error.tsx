'use client'

import { useAtomValue } from 'jotai'

import { errorMessageAtom } from '@/components/atoms/summarize'

const ErrorMessage = () => {
	const errorMessage = useAtomValue(errorMessageAtom)

	return errorMessage === '' ? null : (
		<div className="flex items-center justify-center my-8 lg:my-16">
			<span className="px-4 py-2 text-red-500 border rounded border-red-500/50 bg-red-500/10"> {errorMessage}</span>
		</div>
	)
}

export default ErrorMessage
