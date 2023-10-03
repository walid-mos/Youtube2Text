'use client'

import { useEffect, useState } from 'react'

import { Card, CardBody } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'

import { cn } from '@/utils/classnames'

import type { StepsPromiseType } from '../controllers'

type Props = {
	promise: StepsPromiseType
}

type SkeletonProps = {
	children: React.ReactNode
	className: string
}

const Skeleton: React.FC<SkeletonProps> = ({ children, className }) => (
	<Card className="bg-background dark:bg-default-100/50">
		<CardBody className="flex flex-col justify-center gap-y-8">
			<div className={cn('text-center', className)}>{children}</div>
		</CardBody>
	</Card>
)

const Status: React.FC<Props> = ({ promise }) => {
	const [isPending, setIsPending] = useState<boolean>(true)

	useEffect(() => {
		console.log('here')
		promise.then(() => setIsPending(false))
	}, [])

	return (
		<Skeleton className="text-blue-200">
			{isPending ? <Progress size="sm" isIndeterminate aria-label="Loading..." /> : 'Loading'}
		</Skeleton>
	)
}

export default Status
