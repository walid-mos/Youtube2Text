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
	<Card>
		<CardBody
			className={cn('bg-background dark:bg-default-100/50', 'flex flex-col justify-center gap-y-8', className)}
		>
			{children}
		</CardBody>
	</Card>
)

const Status: React.FC<Props> = ({ promise }) => {
	const [isPending, setIsPending] = useState<boolean>(true)

	useEffect(() => {
		promise.then(() => setIsPending(false))
	}, [])

	return (
		<Skeleton
			className={cn(
				'h-56  rounded-2xl border',
				isPending
					? [
							'border-blue-300',
							'before:absolute before:inset-0',
							'before:bg-gradient-to-r before:from-transparent before:via-blue-600/20 before:to-transparent',
							'before:-translate-x-full before:animate-[shimmer_2s_infinite]',
					  ]
					: 'border-green-400',
			)}
		>
			{isPending ? (
				<>
					<div />
					<Progress size="sm" isIndeterminate aria-label="Loading..." />
				</>
			) : (
				'Loading'
			)}
		</Skeleton>
	)
}

export default Status
