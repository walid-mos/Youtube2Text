'use client'

import { Provider as Jotai } from 'jotai'
import { NextUIProvider } from '@nextui-org/react'

type Props = {
	children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => (
	<Jotai>
		<NextUIProvider>{children}</NextUIProvider>
	</Jotai>
)

export default Providers
