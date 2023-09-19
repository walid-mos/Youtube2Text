import { useTranslations } from 'next-intl'

import ErrorMessage from '@/components/global/error'
import Title from '@/components/global/Title'

import Form from './_components/Form'

// TODO : when next-intl will support SSG, move this to root layout
// export const generateStaticParams = async () => []

const SummarizePage = () => {
	const t = useTranslations('summarize')

	return (
		<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
			<ErrorMessage />

			<Title label={t('title')} />

			<Form />
		</div>
	)
}

export default SummarizePage
