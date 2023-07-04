import type { SVGProps } from '@/types/types'

interface Props extends SVGProps {
	children: React.ReactNode
	fill: 'none' | 'currentColor' | 'currentFill'
	viewBox?: string
	internalClassName?: string
}

const Sizes = new Map([
	['s', 'w-4 h-4'],
	['m', 'w-6 h-6'],
	['l', 'w-8 h-8'],
	['xl', 'w-10 h-10'],
	['2xl', 'w-12 h-12'],
])

const SVG: React.FC<Props> = ({
	children, className, size, internalClassName, fill, viewBox,
}) => {
	const sizeClass = Sizes.get(size || 'm')

	return (
		<svg
			aria-hidden="true"
			className={`${sizeClass} ${className || ''} ${internalClassName || ''}`}
			viewBox={viewBox || '0 0 24 24'}
			fill={fill}
			xmlns="http://www.w3.org/2000/svg"
		>
			{children}
		</svg>
	)
}

export default SVG
