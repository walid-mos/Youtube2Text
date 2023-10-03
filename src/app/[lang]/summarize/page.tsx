import { getTranslator } from 'next-intl/server'

import Title from '@/components/global/Title'

import StepDownload from './_components/StepDownload'
import StepTranscript from './_components/StepTranscript'
import StepSummarize from './_components/StepSummarize'
import { getProcessStep, stepsGenerator } from './controllers'
import VideoData from './_components/VideoData'

import type { LangProps } from '@/types/global'

type Props = {
	searchParams: {
		uuid: string
	}
} & LangProps

const SummarizePage: React.FC<Props> = async ({ params: { lang }, searchParams: { uuid } }) => {
	const t = await getTranslator(lang, 'summarize')

	const processStep = await getProcessStep(uuid)
	const steps = stepsGenerator(processStep)

	return (
		<section>
			<Title label={t('title')} className="flex-shrink" />
			<VideoData link={processStep.queries.link} />
			<div className="grid grid-cols-3 gap-x-6">
				<StepDownload downloadVideoPromise={steps.next()} />
				<StepTranscript transcriptVideoPromise={steps.next()} />
				<StepSummarize summarizeVideoPromise={steps.next()} />
			</div>
		</section>
	)
}

export default SummarizePage
