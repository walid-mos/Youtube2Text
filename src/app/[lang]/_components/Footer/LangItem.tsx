'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { switchLanguage } from '@/utils/paths'
import { Button } from '@/components/ui/Button'
import { LOCALES_NAMES, type LOCALES_TYPE } from '@/utils/constants'
import { cn } from '@/utils/classnames'

type LangItemProps = {
	lang: LOCALES_TYPE
}

const LangItem: React.FC<LangItemProps> = ({ lang }) => {
	const pathname = usePathname()
	if (!pathname) throw new Error("Couldn't find the path of the page.")
	const [href, oldLang] = switchLanguage(pathname, lang)
	const isActualLanguage = oldLang === lang

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
			<Link href={href}>{LOCALES_NAMES.get(lang)}</Link>
		</Button>
	)
}

export default LangItem
