import { ChevronDownIcon } from '@heroicons/react/24/solid'

import type { SVGProps } from '@/types/types'

import SVG from '../SVG'

const ChevronDown: React.FC<SVGProps> = ({ ...props }) => (
	<div role="status">
		<SVG {...props} fill="currentColor">
			<ChevronDownIcon />
		</SVG>
	</div>
)

export default ChevronDown
