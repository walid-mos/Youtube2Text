'use client'

import { useEffect, useState } from 'react'

import { Card, CardBody } from '@nextui-org/card'
import { CircularProgress } from '@nextui-org/progress'
import { useTranslations } from 'next-intl'

import { cn } from '@/utils/classnames'

import type { StepsPromiseType } from '../controllers'

type Props = {
	label: string
	description: string
	promise: StepsPromiseType
}

type SkeletonProps = {
	children: React.ReactNode
	className: string
}

const Skeleton: React.FC<SkeletonProps> = ({ children, className }) => (
	<Card>
		<CardBody className={cn('bg-background dark:bg-default-100/50', 'grid place-items-center gap-y-4', className)}>
			{children}
		</CardBody>
	</Card>
)

const Status: React.FC<Props> = ({ promise, label, description }) => {
	const [isPending, setIsPending] = useState<boolean>(true)
	const t = useTranslations('summarize.steps')

	useEffect(() => {
		promise.then(() => setIsPending(false))
	}, [])

	return (
		<Skeleton
			className={cn(
				'h-56 rounded-2xl border',
				isPending
					? [
							'border-blue-300',
							'before:absolute before:inset-0',
							'before:bg-gradient-to-r before:from-transparent before:via-blue-600/10 before:to-transparent',
							'before:-translate-x-full before:animate-[shimmer_2s_infinite]',
					  ]
					: 'border-green-400',
			)}
		>
			<div className="text-center">
				<div className={cn('text-xl font-bold', isPending ? 'text-blue-600/80' : 'text-green-600/80')}>
					{label}
				</div>
				<div className="text-small">{description}</div>
			</div>
			<div className="grid gap-3 place-items-center">
				{isPending ? (
					<>
						<CircularProgress
							classNames={{
								svg: 'w-12 h-12 drop-shadow-md',
								indicator: 'stroke-blue-400 stroke-[4px]',
								track: 'stroke-blue-200/40  stroke-[3px]',
								value: 'text-3xl font-semibold text-white',
							}}
							aria-label="loading"
						/>
						<span aria-label="loading">{t('loading')}</span>
					</>
				) : (
					'Success'
				)}
			</div>
		</Skeleton>
	)
}

export default Status
