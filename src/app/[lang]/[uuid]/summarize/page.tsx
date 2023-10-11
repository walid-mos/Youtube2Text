import { notFound } from 'next/navigation'

import { getTranslator } from 'next-intl/server'

import Title from '@/components/global/Title'
import NextIntlProvider from '@/components/global/NextIntlProvider'
import { getProcessStepByUUID } from '@/supabase/functions/processLink'

import { stepsGenerator } from './controller'
import VideoData from './_components/VideoData'
import Step from './_components/Step'
import Submit from './_components/Submit'

import type { LangProps } from '@/types/global'

type Props = {
	params: {
		uuid: string
	}
} & LangProps

export const dynamic = 'force-dynamic'

const SummarizePage: React.FC<Props> = async ({ params: { lang }, params: { uuid } }) => {
	const t = await getTranslator(lang, 'summarize')

	const steps = [
		{
			label: t('steps.download.title'),
			description: t('steps.download.details'),
			id: 1,
		},
		{
			label: t('steps.transcribe.title'),
			description: t('steps.transcribe.details'),
			id: 2,
		},
		{
			label: t('steps.summarize.title'),
			description: t('steps.summarize.details'),
			id: 3,
		},
	] as const

	const processStep = await getProcessStepByUUID(uuid)
	if (!processStep) notFound()

	const generator = stepsGenerator(processStep)

	return (
		<section className="grid gap-6 auto-rows-[min-content_min-content_1fr] place-items-center">
			<Title label={t('title')} className="flex-shrink" />
			<VideoData link={processStep.queries.link} />
			<div className="grid w-full grid-cols-3 gap-x-6">
				<NextIntlProvider pick={['summarize']}>
					{steps.map(({ label, description, id }) => (
						<Step key={label} promise={generator.next()} label={label} description={description} id={id} />
					))}
				</NextIntlProvider>
			</div>
			<Submit uuid={uuid} promise={generator.return()} />
		</section>
	)
}

export default SummarizePage
