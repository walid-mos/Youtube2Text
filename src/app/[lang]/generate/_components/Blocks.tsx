import { LoadingAnimatedIcon, StepCheckIcon } from '@/components/icons'

type BlockProps = {
	children?: React.ReactNode
	className?: string
}

const Block: React.FC<BlockProps> = ({ children, className }) => (
	<span
		className={`absolute flex items-center justify-center w-12 h-12 rounded-full -left-6 ${className}`}
	>
		{children}
	</span>
)

export const ActiveBlock = () => (
	<Block className="bg-green-200 bg-gradient-to-tr from-stone-700 to-red-500 dark:from-slate-300 dark:to-red-500">
		<StepCheckIcon size="l" className="text-white dark:text-white " />
	</Block>
)

export const InactiveBlock = () => <Block className="bg-gray-100" />

export const LoadingBlock = () => (
	<Block className="bg-white">
		<LoadingAnimatedIcon
			size="2xl"
			className="rounded-full text-gray-700/20 dark:text-gray-400/30 fill-white/80 bg-gradient-to-tr from-stone-700 to-red-500 dark:from-slate-200 dark:to-red-500"
		/>
	</Block>
)
