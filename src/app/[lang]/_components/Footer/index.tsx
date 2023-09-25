import Link from 'next/link'

import { Fragment } from 'react'

import { getTranslator } from 'next-intl/server'

import { GITHUB_PROFILE_URL, LOCALES, type LOCALES_TYPE } from '@/utils/constants'
import { Separator } from '@/components/ui/Separator'

import LangItem from './LangItem'

type Props = {
	lang: LOCALES_TYPE
}

type ExternalLinkProps = {
	href: string
	children: React.ReactNode
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
	<Link target="_blank" href={href} className="underline duration-150 hover:text-zinc-400">
		{children}
	</Link>
)

const Footer: React.FC<Props> = async ({ lang }) => {
	const t = await getTranslator(lang, 'layout.footer')

	return (
		<div className="gap-1 pt-8 text-xs text-center md:px-12 md:mx-12 text-zinc-700 dark:text-zinc-300 lg:px-8">
			<p>
				{t('built')} <ExternalLink href={GITHUB_PROFILE_URL}>walid-mos</ExternalLink>
			</p>
			<p>
				{t('deployed.1')} <ExternalLink href="https://vercel.com">Vercel</ExternalLink> {t('deployed.2')}{' '}
				<ExternalLink href="https://supabase.com">Supabase</ExternalLink> {t('deployed.3')}.
			</p>
			<p>
				{t('powered')} <ExternalLink href="https://openai.com/">OpenAI</ExternalLink>.
			</p>
			<div className="flex items-center justify-center h-5 my-3">
				{LOCALES.map((locale, index) => (
					<Fragment key={locale}>
						<LangItem lang={locale} />
						{index < LOCALES.length - 1 && <Separator orientation="vertical" />}
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default Footer
