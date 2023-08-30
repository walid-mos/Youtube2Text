import { ActiveBlock, InactiveBlock, LoadingBlock } from './Blocks'

type Props = {
	label: string
	details: string
	last?: boolean
	isStepActive: boolean
	isLoadingStep: boolean
}

const TimelineComponent: React.FC<Props> = ({
	label,
	details,
	isStepActive,
	last,
	isLoadingStep,
}) => {
	let titleClassname = 'text-gray-800/40 dark:text-gray-200/30'

	if (isStepActive) titleClassname = 'text-gray-900 dark:text-gray-200'
	if (isLoadingStep)
		titleClassname = 'text-gray-800 dark:text-gray-300 animate-pulse'

	return (
		<li className={`${!last && 'mb-14 md:mb-20'} ml-20`}>
			{isStepActive && <ActiveBlock />}
			{!isStepActive && <InactiveBlock />}
			{isLoadingStep && <LoadingBlock />}

			<div className={titleClassname}>
				<h3 className="font-medium leading-tight">{label}</h3>
				<p className="text-sm">{details}</p>
			</div>
		</li>
	)
}

export default TimelineComponent
