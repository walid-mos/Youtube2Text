import { notFound } from 'next/navigation'

import { getTranslator } from 'next-intl/server'

import Title from '@/components/global/Title'
import { getProcessStepByUUID } from '@/supabase/functions/processLink'

import type { LangProps } from '@/types/global'

type Props = {
	params: {
		uuid: string
	}
} & LangProps

const ResultPage: React.FC<Props> = async ({ params: { lang }, params: { uuid } }) => {
	const t = await getTranslator(lang, 'result')

	const processStep = await getProcessStepByUUID(uuid)
	if (!processStep || !processStep.summary) notFound()

	return (
		<section className="grid gap-6 auto-rows-[min-content_min-content_1fr] place-items-center">
			<Title label={t('title')} className="flex-shrink" />
			<div>{processStep.summary}</div>
		</section>
	)
}

export default ResultPage
