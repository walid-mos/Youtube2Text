import { FR } from 'country-flag-icons/react/3x2'

import type { SVGProps } from '@/types/types'

import SVG from '../SVG'

const FRFlag: React.FC<SVGProps> = ({ ...props }) => (
	<div role="status">
		<SVG {...props} fill="currentColor">
			<FR />
		</SVG>
	</div>
)

export default FRFlag
