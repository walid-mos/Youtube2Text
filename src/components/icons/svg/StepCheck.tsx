import { CheckIcon } from '@heroicons/react/24/solid'

import type { SVGProps } from '@/types/types'

import SVG from '../SVG'

const StepCheck: React.FC<SVGProps> = ({ ...props }) => (
	<SVG {...props} fill="currentColor">
		<CheckIcon />
	</SVG>
)

export default StepCheck
