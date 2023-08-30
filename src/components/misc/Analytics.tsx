'use client'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

const track = ['/', '/share', '/deploy', '/unseal']

const Analytics = () => (
	<VercelAnalytics
		beforeSend={event => {
			const url = new URL(event.url)
			if (!track.includes(url.pathname)) {
				url.pathname = '/__redacted'
				return {
					...event,
					url: url.href,
				}
			}
			return event
		}}
	/>
)

export default Analytics
