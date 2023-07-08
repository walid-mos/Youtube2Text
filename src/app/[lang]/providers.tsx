'use client'

import { Provider as Jotai } from 'jotai'

const Providers = ({ children }: React.PropsWithChildren) => (
	<Jotai>
		{children}
	</Jotai>
)

export default Providers
