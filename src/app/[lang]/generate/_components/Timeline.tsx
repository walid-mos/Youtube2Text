'use client'

import { useAtomValue } from 'jotai'

import { StepAtom, StepLoadingAtom } from '@/atoms/generate'

import TimelineComponent from './TimelineStep'

const TimelineInfos = [
	{
		id: 1,
		label: 'Préparation des données',
		details: 'Step details here',
	},
	{
		id: 2,
		label: 'Generation du résumé',
		details: 'Step details here',
	},
	{
		id: 3,
		label: 'Terminé !',
		details: 'Step details here',
	},
]

const Timeline = () => {
	const activeStepState = useAtomValue(StepAtom)
	const loadingStepState = useAtomValue(StepLoadingAtom)

	return (
		<div className="flex justify-center h-1/2">
			<ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
				{TimelineInfos.map(({ id, ...infos }, index) => {
					const last = index === TimelineInfos.length - 1
					const isLoadingStep = loadingStepState === index
					const isStepActive =
						activeStepState.length - 1 >= index && !isLoadingStep
					return (
						<TimelineComponent
							key={id}
							{...infos}
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
