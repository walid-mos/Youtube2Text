import { FR } from 'country-flag-icons/react/3x2'
import SVG from '../SVG'

import type { SVGProps } from '@/types/types'

const FRFlag: React.FC<SVGProps> = ({ ...props }) => (
	<div role="status">
		<SVG {...props} fill="currentColor">
			<FR />
		</SVG>
	</div>
)

export default FRFlag
