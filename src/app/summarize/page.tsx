import ErrorMessage from '@/components/global/error'
import Title from '@/components/layout/Title'

import Form from './_components/Form'

const SummarizePage = async () => (
	<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
		<ErrorMessage />

		<Title label="Summarize your videos" />

		<Form />
	</div>
)

export default SummarizePage
