import Link from 'next/link'


const Home = () => (
	<>
		<div className="flex flex-col items-center justify-center max-w-3xl px-8 mx-auto">
			<div>
				<h1 className="py-4 text-5xl font-bold tracking-tight text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-800/70 dark:from-zinc-600/50 to-zinc-400 dark:to-zinc-200 sm:text-7xl">
					Stop wasting time watching videos. <br />
					<span className="text-red-600">Read them instead.</span>
				</h1>
				<p className="mt-6 leading-5 text-zinc-600 dark:text-zinc-400 sm:text-center">
					Our AI-powered tool automatically generates a summary of any YouTube video. <br />
					Just paste the link and get a summary in seconds.
				</p>
				<div className="flex flex-col justify-center gap-4 mx-auto mt-8 sm:flex-row sm:max-w-lg ">
					<Link
						href="/links"
						className="sm:w-2/3 sm:text-center inline-block transition-all space-x-2
                            rounded px-4 py-1.5 md:py-2 text-base font-semibold leading-7
                            text-zinc-50 bg-zinc-700 dark:text-zinc-700 dark:bg-zinc-50
                            hover:text-zinc-100 hover:ring-red-700/80 hover:bg-red-600 dark:hover:text-zinc-100 dark:hover:ring-red-900/80 dark:hover:bg-red-600/90
                            ring-2 ring-transparent duration-150 hover:drop-shadow-cta"
					>
						<span>Start summarize</span>
						<span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
			<div className="hidden sm:mt-12 sm:flex sm:justify-center">
				<Link
					href="https://github.com/walid-mos/youtube2text"
					className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 duration-150
                        text-zinc-700 dark:text-zinc-400  ring-zinc-600/10
                        hover:ring-zinc-600/30 dark:ring-zinc-100/10 dark:hover:ring-zinc-100/30"
				>
					YSumAI is Open Source on {' '}
					<span className="font-semibold text-zinc-500 dark:text-zinc-200">
						GitHub <span aria-hidden="true">&rarr;</span>
					</span>
				</Link>
			</div>
		</div>
		{/* <h2 className="py-4 text-3xl font-bold text-center text-zinc-300 ">Used and trusted by a growing community</h2> */}
		{/* <Stats /> */}
	</>
)

export default Home
