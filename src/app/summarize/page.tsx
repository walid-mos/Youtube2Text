import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import ErrorMessage from '@/components/global/error'
import TextArea from './TextArea'
import SubmitButton from './SubmitButton'

const SummarizePage = async () => {
	const supabase = createServerComponentClient({ cookies })
	await supabase.auth.getSession()

	return (
		<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
			<ErrorMessage />

			<h1 className="py-4 mx-16 text-3xl font-bold text-center text-transparent md:text-4xl lg:text-5xl bg-gradient-to-t bg-clip-text from-red-600 to-red-300 dark:from-zinc-100/60 dark:to-white">
				Summarize your videos
			</h1>
			<form className="max-w-4xl mx-auto">
				<TextArea />
				<SubmitButton />

				<div className="mt-8">
					<ul className="space-y-2 text-xs sm:text-center text-zinc-600 dark:text-zinc-400">
						<li>
							<p>
								For now you can only summarize one YouTube video at a time. Just paste the link to the video and click on Summarize.
							</p>
						</li>
						<li>
							<p>
								Then wait for the magic to happen. It may take a few minutes depending on the length of the video.
							</p>
						</li>
						<li>
							<p>
								We are working on a way to summarize multiple videos at once. Stay tuned!
							</p>
						</li>
					</ul>
				</div>
			</form>

		</div>
	)
}

export default SummarizePage
