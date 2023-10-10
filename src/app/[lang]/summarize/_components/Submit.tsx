'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'

import { StepPromiseType } from '../controllers'

type Props = {
	promise: StepPromiseType
}

const Submit: React.FC<Props> = ({ promise }) => {
	const [isFinished, setIsFinished] = useState<boolean>(false)
	useEffect(() => {
		promise.then(() => {
			setIsFinished(true)
		})
	})

	return (
		<Button size="lg" disabled={!isFinished}>
			SUBMIT
		</Button>
	)
}

export default Submit
