import Link from 'next/link'

const Footer = () => (
	<div className="flex flex-col gap-1 px-12 pt-8 mx-12 text-xs text-center text-zinc-700 dark:text-zinc-300 max-w-7xl lg:px-8">
		<p>
			Built by {' '}
			<Link href="https://github.com/walid-mos" className="font-semibold duration-150 hover:text-zinc-400">
				walid-mos
			</Link>
		</p>
		<p>
			YSumAI is deployed on{' '}
			<Link target="_blank" href="https://vercel.com" className="underline duration-150 hover:text-zinc-400">
				Vercel{' '}
			</Link>
			and uses{' '}
			<Link target="_blank" href="https://supabase.com" className="underline duration-150 hover:text-zinc-400">
				Supabase {' '}
			</Link>
			for storing encrypted data.
		</p>
		<p>
			The AI technology is powered by {' '}
			<Link target="_blank" href="https://openai.com/" className="underline duration-150 hover:text-zinc-400">
				OpenAI
			</Link>
			.
		</p>
	</div>
)

export default Footer
