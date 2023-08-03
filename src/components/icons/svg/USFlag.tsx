import { US } from 'country-flag-icons/react/3x2'

import type { SVGProps } from '@/types/types'

import SVG from '../SVG'

const USFlag: React.FC<SVGProps> = ({ ...props }) => (
	<div role="status">
		<SVG {...props} fill="currentColor">
			<US />
		</SVG>
	</div>
)

export default USFlag
