'use client'

import TextArea from './TextArea'
import SubmitButton from './SubmitButton'

export interface Inputs extends HTMLButtonElement {
	text: string
}

const Form = () => (
	<div className="max-w-4xl mx-auto">
		<TextArea />
		<SubmitButton />

		<div className="mt-8">
			<ul className="space-y-2 text-xs sm:text-center text-zinc-600 dark:text-zinc-400">
				<li>
					<p>
						For now you can only summarize one YouTube video at a
						time. Just paste the link to the video and click on
						Summarize.
					</p>
				</li>
				<li>
					<p>
						Then wait for the magic to happen. It may take a few
						minutes depending on the length of the video.
					</p>
				</li>
				<li>
					<p>
						We are working on a way to summarize multiple videos at
						once. Stay tuned!
					</p>
				</li>
			</ul>
		</div>
	</div>
)

export default Form
