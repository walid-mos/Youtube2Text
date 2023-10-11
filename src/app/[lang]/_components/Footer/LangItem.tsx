'use client'

import Link from 'next/link'

import { useSwitchLanguage } from '@/utils/paths'
import { Button } from '@/components/ui/Button'
import { LOCALES_NAMES, type LOCALES_TYPE } from '@/utils/constants'
import { cn } from '@/utils/classnames'

type LangItemProps = {
	itemLocale: LOCALES_TYPE
}

const LangItem: React.FC<LangItemProps> = ({ itemLocale }) => {
	const [href, oldLang] = useSwitchLanguage(itemLocale)
	const isActualLanguage = oldLang === itemLocale

	return (
		<Button
			variant="link"
			className={cn(
				'transition-all duration-200',
				isActualLanguage
					? 'text-orange-500 disabled:opacity-70 disabled:underline disabled:underline-offset-[7px] font-bold'
					: undefined,
			)}
			disabled={isActualLanguage}
		>
			<Link href={href}>{LOCALES_NAMES.get(itemLocale)}</Link>
		</Button>
	)
}

export default LangItem
