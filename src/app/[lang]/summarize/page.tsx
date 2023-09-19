import { getTranslator } from 'next-intl/server'

import ErrorMessage from '@/components/global/error'
import Title from '@/components/global/Title'

import Form from './_components/Form'

import type { LangProps } from '@/types/global'

const SummarizePage: React.FC<LangProps> = async ({ params: { lang } }) => {
	const t = await getTranslator(lang, 'summarize')

	return (
		<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
			<ErrorMessage />

			<Title label={t('title')} />

			<Form />
		</div>
	)
}

export default SummarizePage
