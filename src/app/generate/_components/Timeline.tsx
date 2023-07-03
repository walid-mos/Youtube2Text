'use client'

import { useAtomValue } from 'jotai'
import { StepAtom, StepLoadingAtom } from '@/components/atoms/generate'

import TimelineComponent from './TimelineComponent'

const TimelineInfos = [
	{
		id: 1,
		step: 'download',
		label: 'Préparation des données',
		details: 'Step details here',
	},
	{
		id: 2,
		step: 'ai',
		label: 'Generation du résumé',
		details: 'Step details here',
	},
	{
		id: 3,
		step: 'complete',
		label: 'Terminé !',
		details: 'Step details here',
	},
]

const Timeline = () => {
	const stepState = useAtomValue(StepAtom)
	const loadingStepState = useAtomValue(StepLoadingAtom)

	return (
		<div className="flex justify-center h-1/2">
			<ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
				{TimelineInfos.map(({ id, ...infos }, index) => {
					const last = index === TimelineInfos.length - 1
					const isLoadingStep = loadingStepState === infos.step
					return (
						<TimelineComponent key={id} {...infos} last={last} stepState={stepState} isLoading={isLoadingStep} />
					)
				})}
			</ol>
		</div>
	)
}

export default Timeline
