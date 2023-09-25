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
		<div className="w-full mx-auto mt-8 md:mb-16 lg:mb-32">
			<Title label={t('title')} />
			<div className="mt-12 md:flex md:flex-col md:items-center ">
				<StepDownload link={link} />
				<StepTranscript />
				<StepSummarize />
			</div>
		</div>
	)
}

// return (
// 	<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
// 		<ErrorMessage />

// 		<Title label={t('title')} />

// 		<div className="max-w-4xl mx-auto">
// 			<TextArea />
// 			<SubmitButton label={t('submit')} />

// 			<div className="mt-8">
// 				<ul className="space-y-2 text-xs sm:text-center text-zinc-600 dark:text-zinc-400">
// 					<li>
// 						<p>{t('form.paragraph-1')}</p>
// 					</li>
// 					<li>
// 						<p>{t('form.paragraph-2')}</p>
// 					</li>
// 					<li>
// 						<p>{t('form.paragraph-3')}</p>
// 					</li>
// 				</ul>
// 			</div>
// 		</div>
// 	</div>
// )

export default SummarizePage
