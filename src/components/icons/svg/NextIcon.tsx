import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import SVG from '../SVG'

import type { SVGProps } from '@/types/types'

const NextIcon: React.FC<SVGProps> = ({ ...props }) => (
	<div role="status">
		<SVG {...props} fill="currentColor">
			<ArrowLongRightIcon />
		</SVG>
	</div>
)

export default NextIcon
