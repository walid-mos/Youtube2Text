import { getTranslator } from 'next-intl/server'

import Title from '@/components/global/Title'
import NextIntlProvider from '@/components/global/NextIntlProvider'

import { getProcessStep, stepsGenerator } from './controllers'
import VideoData from './_components/VideoData'
import Step from './_components/Step'

import type { LangProps } from '@/types/global'

type Props = {
	searchParams: {
		uuid: string
	}
} & LangProps

const SummarizePage: React.FC<Props> = async ({ params: { lang }, searchParams: { uuid } }) => {
	const t = await getTranslator(lang, 'summarize')

	const steps = [
		{
			label: t('steps.download.title'),
			description: t('steps.download.details'),
			number: 1,
		},
		{
			label: t('steps.transcribe.title'),
			description: t('steps.transcribe.details'),
			number: 2,
		},
		{
			label: t('steps.summarize.title'),
			description: t('steps.summarize.details'),
			number: 3,
		},
	] as const

	const processStep = await getProcessStep(uuid)
	const generator = stepsGenerator(processStep)

	return (
		<section className="grid gap-6 auto-rows-[min-content_min-content_1fr] place-items-center">
			<Title label={t('title')} className="flex-shrink" />
			<VideoData link={processStep.queries.link} />
			<div className="grid w-full grid-cols-3 gap-x-6">
				<NextIntlProvider pick={['summarize']}>
					{steps.map(({ label, description, number }) => (
						<Step promise={generator.next()} label={label} description={description} number={number} />
					))}
				</NextIntlProvider>
			</div>
		</section>
	)
}

export default SummarizePage
