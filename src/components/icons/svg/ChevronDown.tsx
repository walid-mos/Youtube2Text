import { ChevronDownIcon } from '@heroicons/react/24/solid'

import SVG from '../SVG'

import type { SVGProps } from '@/types/types'

const ChevronDown: React.FC<SVGProps> = ({ ...props }) => (
	<div role="status">
		<SVG {...props} fill="currentColor">
			<ChevronDownIcon />
		</SVG>
	</div>
)

export default ChevronDown
