'use client'

import { useEffect, useRef, useState } from 'react'

import { Card, CardBody } from '@nextui-org/card'
import { CircularProgress } from '@nextui-org/progress'
import { useTranslations } from 'next-intl'
import { useAtom } from 'jotai'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/classnames'
import { currentPromiseAtom } from '@/atoms/summarize'

import type { StepPromiseType } from '../controller'

type Props = {
	label: string
	description: string
	promise: StepPromiseType
	id: number
}

const SkeletonVariants = cva(
	cn('h-56 rounded-2xl border', 'bg-background dark:bg-default-100/50', 'grid place-items-center gap-y-4'),
	{
		variants: {
			variant: {
				muted: cn('border-slate-300'),
				pending: cn(
					'border-blue-300',
					'before:absolute before:inset-0',
					'before:bg-gradient-to-r before:from-transparent before:via-blue-600/10 before:to-transparent',
					'before:-translate-x-full before:animate-[shimmer_2s_infinite]',
				),
				success: cn('border-green-400'),
			},
		},
	},
)

const TitleVariant = cva('text-xl font-bold', {
	variants: {
		variant: {
			muted: 'text-slate-400',
			pending: 'text-blue-600/80',
			success: 'text-green-600/80',
		},
	},
})

type VariantType = NonNullable<VariantProps<typeof SkeletonVariants>['variant']>

type SkeletonProps = {
	children: React.ReactNode
	variant: VariantType
}

const Skeleton: React.FC<SkeletonProps> = ({ children, variant }) => (
	<Card>
		<CardBody className={cn(SkeletonVariants({ variant }))}>{children}</CardBody>
	</Card>
)

type IconProps = {
	variant: VariantType
}

const Icon: React.FC<IconProps> = ({ variant }) => {
	const t = useTranslations('summarize.steps')

	if (variant === 'muted') return <div className="h-20">{t('waiting')}</div>
	if (variant === 'pending')
		return (
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
				<span>{t('loading')}</span>
			</>
		)
	if (variant === 'success')
		return (
			<>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-12 h-12 stroke-green-500 drop-shadow-md"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>

				<span>{t('success')}</span>
			</>
		)

	throw new Error('Variant not in range')
}

const Status: React.FC<Props> = ({ promise, label, description, id }) => {
	const [currentPromise, setCurrentPromise] = useAtom(currentPromiseAtom)
	const isFinished = useRef(false)
	const [variant, setVariant] = useState<VariantType>('muted')

	useEffect(() => {
		promise.then(({ value }) => {
			if (value === undefined) return
			setCurrentPromise(value)
			isFinished.current = true
			setVariant('success')
		})
	}, [])

	useEffect(() => {
		if (id === (currentPromise || 0) + 1) setVariant('pending')
	}, [currentPromise])

	return (
		<Skeleton variant={variant}>
			<div className="text-center">
				<div className={cn(TitleVariant({ variant }))}>{label}</div>
				<div className="text-small">{description}</div>
			</div>
			<div className="grid gap-3 place-items-center">
				<Icon variant={variant} />
			</div>
		</Skeleton>
	)
}

export default Status
