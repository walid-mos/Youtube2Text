import Link from 'next/link'

import Menu from './Menu'

import type { LOCALES_TYPE } from '@/utils/constants'

type Props = {
	lang: LOCALES_TYPE
}

const Header: React.FC<Props> = ({ lang }) => (
	<nav className="flex flex-wrap items-center justify-between gap-2 pt-2 md:flex-row md:pt-0">
		<Link
			href="/"
			className="text-2xl font-semibold text-transparent duration-300 bg-gradient-to-tr bg-clip-text from-red-400 to-red-700 hover:text-zinc-700 dark:from-red-200 dark:to-red-500 dark:hover:text-zinc-50"
		>
			YSumAI
		</Link>

		<Menu lang={lang} />
	</nav>
)

export default Header
