'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'

import { StepPromiseType } from '../controller'

type Props = {
	uuid: string
	promise: StepPromiseType
}

type WithLinkProps = {
	uuid: string
	isFinished: boolean
	children: React.ReactNode
}

const WithLink: React.FC<WithLinkProps> = ({ uuid, isFinished, children }) => {
	if (!isFinished) return children
	return <Link href={`/${uuid}/results`}>{children}</Link>
}

const Submit: React.FC<Props> = ({ uuid, promise }) => {
	const [isFinished, setIsFinished] = useState<boolean>(false)
	useEffect(() => {
		promise.then(() => {
			setIsFinished(true)
		})
	})

	return (
		<WithLink uuid={uuid} isFinished={isFinished}>
			<Button size="lg" disabled={!isFinished}>
				SUBMIT
			</Button>
		</WithLink>
	)
}

export default Submit
