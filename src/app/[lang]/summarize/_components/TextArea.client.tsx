'use client'

import { Fragment } from 'react'

import { useAtom, useAtomValue } from 'jotai'

import { linesAtom, textAtom } from '@/atoms/summarize'

const TextArea = () => {
	const [text, setText] = useAtom(textAtom)
	const lines = useAtomValue(linesAtom)

	return (
		<pre className="px-4 py-3 mt-8 font-mono text-left bg-transparent border rounded border-zinc-600 dark:border-zinc-400 focus:ring-0 sm:text-sm md:text-md text-zinc-700 dark:text-zinc-100">
			<div className="flex items-start px-1 text-sm sm:text-base">
				<div
					aria-hidden="true"
					className="pr-4 font-mono border-r select-none border-zinc-300/5 text-zinc-700"
				>
					{lines.map((_, index) => (
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
					onChange={e => setText(e.target.value)}
					rows={Math.max(5, text.split('\n').length)}
					placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
					wrap="off"
					className="w-full p-0 overflow-hidden bg-transparent border-0 appearance-none resize-none hover:resize-y text-zinc-700 dark:text-zinc-100 placeholder-zinc-600/60 dark:placeholder-zinc-400/70 focus:ring-0 focus-visible:outline-none"
				/>
			</div>
		</pre>
	)
}

export default TextArea
