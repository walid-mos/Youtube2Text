import Link from 'next/link'

import { cn } from '@/utils/classnames'

const Logo = () => (
	<Link
		href="/"
		className={cn(
			'text-3xl font-semibold duration-300',
			'text-transparent bg-gradient-to-tr bg-clip-text from-red-400 to-red-700',
			'hover:text-zinc-700',
			'dark:from-red-200 dark:to-red-500 dark:hover:text-zinc-50',
		)}
	>
		YSumAI
	</Link>
)

export default Logo
