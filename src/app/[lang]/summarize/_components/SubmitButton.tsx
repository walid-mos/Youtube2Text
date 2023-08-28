'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useTransition } from 'react'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

import {
	linesAtom,
	isTextAtom,
	loadingAtom,
	errorMessageAtom,
} from '@/atoms/summarize'

import { saveLinks } from '../action'

const SubmitButton = () => {
	const router = useRouter()

	const isText = useAtomValue(isTextAtom)
	const lines = useAtomValue(linesAtom)
	const [loading, setLoading] = useAtom(loadingAtom)
	const setErrorMessage = useSetAtom(errorMessageAtom)

	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		setLoading(isPending)
	}, [isPending])

	const onClick = async () => {
		const returnValue = await saveLinks(lines)
		// console.log(returnValue)

		const { errors, data: links } = returnValue
		if (errors?.issues.length) {
			const { message } = errors.issues[0]
			setErrorMessage(message)
			return
		}

		const params = new URLSearchParams({ links: JSON.stringify(links) })
		router.push(`/generate?${params.toString()}`)
	}

	return (
		<button
			type="submit"
			onClick={() => startTransition(onClick)}
			disabled={loading || !isText}
			className={`mt-6 w-full h-12 inline-flex justify-center items-center transition-all rounded-md px-4 py-1.5 md:py-2 text-base font-semibold leading-7 ring-1 ring-transparent duration-500   ${
				isText
					? 'text-white bg-gradient-to-b from-red-400/80 via-red-500/90 to-red-600 hover:from-red-500 hover:to-red-700 hover:bg-gradient-to-t focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80'
					: 'bg-zinc-100/80 text-zinc-500/80 cursor-not-allowed'
			} ${loading ? 'animate-pulse' : ''}`}
		>
			<span>
				{loading ? (
					<Cog6ToothIcon className="w-5 h-5 animate-spin" />
				) : (
					'Summarize'
				)}
			</span>
		</button>
	)
}

export default SubmitButton
