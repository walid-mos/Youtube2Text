import { pick as pickRadash } from 'radash'
import { useLocale, useMessages, NextIntlClientProvider } from 'next-intl'

type Props = {
	children: React.ReactNode
	pick: string[]
}

const NextIntlProvider: React.FC<Props> = ({ children, pick }) => {
	const locale = useLocale()
	const messages = useMessages()
	if (!messages) throw new Error('NextIntl: Messages not found')

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={
				// Only provide the minimum of messages
				pickRadash(messages, pick)
			}
		>
			{children}
		</NextIntlClientProvider>
	)
}

export default NextIntlProvider
