import { useTranslations } from 'next-intl'

import TextArea from './TextArea'
import SubmitButton from './SubmitButton'

export interface Inputs extends HTMLButtonElement {
	text: string
}

const Form = () => {
	const t = useTranslations('summarize')
	return (
		<div className="max-w-4xl mx-auto">
			<TextArea />
			<SubmitButton label={t('submit')} />

			<div className="mt-8">
				<ul className="space-y-2 text-xs sm:text-center text-zinc-600 dark:text-zinc-400">
					<li>
						<p>{t('form.paragraph-1')}</p>
					</li>
					<li>
						<p>{t('form.paragraph-2')}</p>
					</li>
					<li>
						<p>{t('form.paragraph-3')}</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Form
