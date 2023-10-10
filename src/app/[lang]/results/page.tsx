import { getTranslator } from 'next-intl/server'

import Title from '@/components/global/Title'
// import NextIntlProvider from '@/components/global/NextIntlProvider'

import { getProcessStep } from '../summarize/controllers'

import type { LangProps } from '@/types/global'

type Props = {
	searchParams: {
		uuid: string
	}
} & LangProps

const ResultPage: React.FC<Props> = async ({ params: { lang }, searchParams: { uuid } }) => {
	const t = await getTranslator(lang, 'result')

	const processStep = await getProcessStep(uuid)

	return (
		<section className="grid gap-6 auto-rows-[min-content_min-content_1fr] place-items-center">
			<Title label={t('title')} className="flex-shrink" />
			<div>{processStep.summary}</div>
		</section>
	)
}

export default ResultPage
