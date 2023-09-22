import { getTranslator } from 'next-intl/server'

import ErrorMessage from '@/components/global/error'
import Title from '@/components/global/Title'

import TextArea from './_components/TextArea.client'
import SubmitButton from './_components/SubmitButton'

import type { LangProps } from '@/types/global'

const SummarizePage: React.FC<LangProps> = async ({ params: { lang } }) => {
	const t = await getTranslator(lang, 'summarize')

	return (
		<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
			<ErrorMessage />

			<Title label={t('title')} />

			<div className="max-w-4xl mx-auto">
				<TextArea />
				<SubmitButton label={t('submit')} />

				<div className="mt-8">
					<ul className="space-y-2 text-xs sm:text-center text-zinc-600 dark:text-zinc-400">
						<li>
							<p>{t('form.paragraph-1')}</p>
						</li>
						<li>
							<p>{t('form.paragraph-2')}</p>
						</li>
						<li>
							<p>{t('form.paragraph-3')}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SummarizePage
