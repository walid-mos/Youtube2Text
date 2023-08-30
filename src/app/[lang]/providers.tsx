'use client'

import { Provider as Jotai } from 'jotai'

type Props = {
	children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => <Jotai>{children}</Jotai>

export default Providers
