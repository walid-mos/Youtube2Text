import { NextIntlClientProvider, useMessages } from 'next-intl'
import { pick } from 'radash'
import { getTranslator } from 'next-intl/server'

import Title from '@/components/global/Title'

import Timeline from './_components/Timeline'

import type { LangProps } from '@/types/global'
import type { LinksType } from '@/types/types'

type Props = {
	searchParams: {
		links: string
	}
} & LangProps

type ProviderProps = {
	lang: LangProps['params']['lang']
	children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ lang, children }) => {
	const messages = useMessages()
	if (!messages) throw new Error('messages is undefined')

	return (
		<NextIntlClientProvider
			locale={lang}
			messages={
				// Only provide the minimum of messages
				pick(messages, ['generate'])
			}
		>
			{children}
		</NextIntlClientProvider>
	)
}

const Generate: React.FC<Props> = async ({ searchParams, params: { lang } }) => {
	const t = await getTranslator(lang, 'generate')

	const links = JSON.parse(searchParams.links) as LinksType
	links.map(link => link)
	return (
		<div className="container w-full mx-auto md:mb-16 lg:mb-32">
			<Title label={t('title')} className="mb-6 md:mb-12" />
			<Provider lang={lang}>
				<Timeline />
				{results.map(result => (
					<div
						key={result}
						className="flex flex-col items-center justify-center w-full gap-4 mt-8 md:gap-8 md:mt-12"
					>
						{result}
					</div>
				))}
			</Provider>
		</div>
	)
}

export default Generate
