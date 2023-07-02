type Props = {
	label: string
	details: string
	step: string
	stepState: string[]
	last?: boolean
}

const TimelineComponent: React.FC<Props> = ({
	label, details, step, last, stepState,
}) => {
	const isStepActive = stepState.includes(step)
	return (
		<li className={`${!last && 'mb-10'} ml-20`}>
			<span className={`absolute flex items-center justify-center w-12 h-12 ${isStepActive ? 'bg-green-200 dark:ring-gray-900 dark:bg-green-900' : 'bg-white'} rounded-full -left-6`}>
				<svg aria-hidden="true" className={`w-6 h-6 ${isStepActive ? 'text-green-500 dark:text-green-400' : 'text-stone-400'} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
			</span>
			<h3 className="font-medium leading-tight">{ label }</h3>
			<p className="text-sm">{ details }</p>
		</li>
	)
}

export default TimelineComponent
