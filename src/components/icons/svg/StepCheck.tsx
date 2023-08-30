import { CheckIcon } from '@heroicons/react/24/solid'

import SVG from '../SVG'

import type { SVGProps } from '@/types/types'

const StepCheck: React.FC<SVGProps> = ({ ...props }) => (
	<SVG {...props} fill="currentColor">
		<CheckIcon />
	</SVG>
)

export default StepCheck
