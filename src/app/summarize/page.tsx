'use client'

import { useState, Fragment } from 'react'
import ErrorMessage from '@/components/global/error'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const SummarizePage = () => {
	const [text, setText] = useState('')

	const [loading] = useState(false)
	const [error] = useState('')

	return (
		<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
			{error ? <ErrorMessage message={error} /> : null}

			<h1 className="py-4 mx-16 text-3xl font-bold text-center text-transparent md:text-4xl lg:text-5xl bg-gradient-to-t bg-clip-text from-red-600 to-red-300 dark:from-zinc-100/60 dark:to-white">
				Summarize your videos
			</h1>
			<form
				className="max-w-4xl mx-auto"
			>
				<pre className="px-4 py-3 mt-8 font-mono text-left bg-transparent border rounded border-zinc-600 dark:border-zinc-400 focus:ring-0 sm:text-sm md:text-md text-zinc-700 dark:text-zinc-100">
					<div className="flex items-start px-1 text-sm">
						<div aria-hidden="true" className="pr-4 font-mono border-r select-none border-zinc-300/5 text-zinc-700">
							{Array.from({
								length: text.split('\n').length,
							}).map((_, index) => (
								// eslint-disable-next-line react/no-array-index-key
								<Fragment key={index}>
									{(index + 1).toString().padStart(2, '0')}
									<br />
								</Fragment>
							))}
						</div>

						<textarea
							id="text"
							name="text"
							value={text}
							minLength={1}
							onChange={(e) => setText(e.target.value)}
							rows={Math.max(5, text.split('\n').length)}
							placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
							className="w-full p-0 text-base bg-transparent border-0 appearance-none resize-none hover:resize text-zinc-700 dark:text-zinc-100 placeholder-zinc-600/60 dark:placeholder-zinc-400/70 focus:ring-0 focus-visible:outline-none"
						/>
					</div>
				</pre>

				<button
					type="submit"
					disabled={loading || text.length <= 0}
					className={`mt-6 w-full h-12 inline-flex justify-center items-center transition-all rounded-md px-4 py-1.5 md:py-2 text-base font-semibold leading-7 ring-1 ring-transparent duration-500   ${
						text.length <= 0
							? 'bg-zinc-100/80 text-zinc-500/80 cursor-not-allowed'
							: 'text-white bg-gradient-to-b from-red-400/80 via-red-500/90 to-red-600 hover:from-red-500 hover:to-red-700 hover:bg-gradient-to-t focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80'

					} ${loading ? 'animate-pulse' : ''}`}
				>
					<span>{loading ? <Cog6ToothIcon className="w-5 h-5 animate-spin" /> : 'Summarize'}</span>
				</button>
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
