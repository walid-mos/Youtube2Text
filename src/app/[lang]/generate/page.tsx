import {
	NextIntlClientProvider,
	useLocale,
	useMessages,
	useTranslations,
} from 'next-intl'
import { pick } from 'radash'

import Title from '@/components/layout/Title'

import Timeline from './_components/Timeline'

import type { LinksType } from '@/types/types'

type Props = {
	searchParams: {
		links: string
	}
}

const Generate: React.FC<Props> = ({ searchParams }) => {
	const t = useTranslations('generate')
	const locale = useLocale()
	const messages = useMessages() as IntlMessages
	if (!messages) throw new Error('messages is undefined')

	const links = JSON.parse(searchParams.links) as LinksType
	links.map(link => link)
	return (
		<div className="container w-full mx-auto md:mb-16 lg:mb-32">
			<Title label={t('title')} className="mb-6 md:mb-12" />
			<NextIntlClientProvider
				locale={locale}
				messages={
					// Only provide the minimum of messages
					pick(messages, ['generate'])
				}
			>
				<Timeline />
			</NextIntlClientProvider>
		</div>
	)
}

export default Generate
