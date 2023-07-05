import { US } from 'country-flag-icons/react/3x2'
import SVG from '../SVG'

import type { SVGProps } from '@/types/types'

const USFlag: React.FC<SVGProps> = ({ ...props }) => (
	<div role="status">
		<SVG {...props} fill="currentColor">
			<US />
		</SVG>
	</div>
)

export default USFlag
