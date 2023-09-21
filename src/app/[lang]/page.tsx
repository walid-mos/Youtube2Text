import Link from 'next/link'

import { Input } from '@nextui-org/input'
import { getTranslator } from 'next-intl/server'

import { GITHUB_REPO_URL } from '@/utils/constants'
import { cn } from '@/utils/classnames'
import { Button } from '@/components/global/Button'
import { NextIcon } from '@/components/icons'

import { onLinkSubmit } from './action'

import type { LangProps } from '@/types/global'

const Home: React.FC<LangProps> = async ({ params: { lang } }) => {
	const t = await getTranslator(lang, 'home')

	return (
		<section className="flex flex-col items-center gap-y-10 sm:px-4">
			<h1
				className={cn(
					'text-transparent bg-gradient-to-t bg-clip-text from-zinc-800/70 to-zinc-400',
					'dark:from-zinc-600/50 dark:to-zinc-200',
					'text-3xl font-bold tracking-tight text-center',
					'sm:text-4xl md:text-6xl',
				)}
			>
				{t('title.1')} <br />
				<span className="text-red-600">{t('title.2')}</span>
			</h1>

			<form action={onLinkSubmit} className="flex flex-col items-center w-full max-w-2xl gap-y-10">
				<Input
					name="link"
					className="mt-12"
					classNames={{ input: cn('placeholder:text-center') }}
					variant="underlined"
					placeholder={t('link')}
					autoFocus
				/>

				<Button type="submit" className="w-full">
					{t('button_summarize')} <NextIcon />
				</Button>
			</form>
			<div className="mt-6">
				<p className="text-sm leading-5 text-center sm:text-base text-zinc-600 dark:text-zinc-400">
					{t('description.1')}. <br />
					{t('description.2')}.
				</p>

				<div className="hidden sm:mt-4 sm:flex sm:justify-center">
					<Button variant="outline">
						<Link href={GITHUB_REPO_URL}>
							{t('github_link.text')}{' '}
							<span className="font-semibold text-zinc-700 dark:text-zinc-200">
								{t('github_link.name')} <span aria-hidden="true">&rarr;</span>
							</span>
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}

export default Home
