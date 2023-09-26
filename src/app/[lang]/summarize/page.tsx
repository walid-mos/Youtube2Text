import { getTranslator } from 'next-intl/server'

import Title from '@/components/global/Title'

import StepDownload from './_components/StepDownload'
import StepTranscript from './_components/StepTranscript'
import StepSummarize from './_components/StepSummarize'

import type { LangProps } from '@/types/global'

type Props = {
	searchParams: {
		link: string
	}
} & LangProps

const SummarizePage: React.FC<Props> = async ({ params: { lang }, searchParams: { link } }) => {
	const t = await getTranslator(lang, 'summarize')

	return (
		<div className="w-full mt-8 md:mb-16 lg:mb-32">
			<Title label={t('title')} />
			<div className="mt-12 md:flex md:flex-col md:items-center ">
				<StepDownload link={link} />
				<StepTranscript />
				<StepSummarize />
			</div>
		</div>
	)
}

export default SummarizePage
