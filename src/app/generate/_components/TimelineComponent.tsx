import { StepCheck } from '@/components/svg'

type Props = {
	label: string
	details: string
	step: string
	stepState: string[]
	last?: boolean
	isLoading?: boolean
}

const TimelineComponent: React.FC<Props> = ({
	label, details, step, last, stepState,
}) => {
	const isStepActive = stepState.includes(step)
	return (
		<li className={`${!last && 'mb-10'} ml-20`}>
			{/* <span className={`absolute flex items-center justify-center w-12 h-12 ${isStepActive ? 'bg-green-200 dark:ring-gray-900 dark:bg-green-900' : 'bg-white'} rounded-full -left-6`}>
				<LoadingAnimated />
			</span> */}

			<span className={`absolute flex items-center justify-center w-12 h-12 ${isStepActive ? 'bg-green-200 dark:ring-gray-900 dark:bg-green-900' : 'bg-gray-100'} rounded-full -left-6`}>
				<StepCheck className={isStepActive ? 'text-green-500 dark:text-green-400' : 'text-stone-400'} />
			</span>

			<h3 className="font-medium leading-tight">{ label }</h3>
			<p className="text-sm">{ details }</p>
		</li>
	)
}

export default TimelineComponent
