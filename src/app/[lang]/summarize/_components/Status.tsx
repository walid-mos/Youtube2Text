'use client'

import { useEffect, useState } from 'react'

import { Progress } from '@nextui-org/progress'

import type { DownloadVideoType } from '../action'

type Props = {
	promise: DownloadVideoType
}

const Status: React.FC<Props> = ({ promise }) => {
	const [isPending, setIsPending] = useState<boolean>(true)

	useEffect(() => {
		promise.then(() => setIsPending(false))
	}, [])

	return isPending ? <Progress size="sm" isIndeterminate aria-label="Loading..." /> : 'Loaded'
}

export default Status
