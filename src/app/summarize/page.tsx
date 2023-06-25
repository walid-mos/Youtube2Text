import ErrorMessage from '@/components/global/error'
import Form from './Form'

const SummarizePage = async () => (
	<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
		<ErrorMessage />

		<h1 className="py-4 mx-16 text-3xl font-bold text-center text-transparent md:text-4xl lg:text-5xl bg-gradient-to-t bg-clip-text from-red-600 to-red-300 dark:from-zinc-100/60 dark:to-white">
			Summarize your videos
		</h1>

		<Form />
	</div>
)

export default SummarizePage
