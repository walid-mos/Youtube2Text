'use client'

import { useAtomValue } from 'jotai'
import { useTranslations } from 'next-intl'

import { StepAtom, StepLoadingAtom } from '@/atoms/generate'

import TimelineComponent from './TimelineStep'

const Timeline = () => {
	const activeStepState = useAtomValue(StepAtom)
	const loadingStepState = useAtomValue(StepLoadingAtom)
	const keys = ['preparation', 'generation', 'done'] as const
	const t = useTranslations('generate.timeline')

	return (
		<div className="flex justify-center h-1/2">
			<ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
				{keys.map((key, index) => {
					const last = index === keys.length - 1
					const isLoadingStep = loadingStepState === index
					const isStepActive =
						activeStepState.length - 1 >= index && !isLoadingStep
					return (
						<TimelineComponent
							key={key}
							label={t(`${key}.title`)}
							details={t(`${key}.details`)}
							last={last}
							isStepActive={isStepActive}
							isLoadingStep={isLoadingStep}
						/>
					)
				})}
			</ol>
		</div>
	)
}

export default Timeline
