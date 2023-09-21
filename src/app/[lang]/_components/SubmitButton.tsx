'use client'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Spinner } from '@nextui-org/spinner'

import { Button as ButtonComponent } from '@/components/global/Button'
import { NextIcon } from '@/components/icons'

type Props = {
	label: string
	waitingLabel: string
}

const LoadingButton: React.FC<{ waitingLabel: string }> = ({ waitingLabel }) => (
	<ButtonComponent className="w-full" disabled>
		<Spinner
			classNames={{
				base: 'mr-2 z-40',
				circle1: 'border-b-orange-400',
				circle2: 'border-b-orange-800',
			}}
		/>
		{waitingLabel}
	</ButtonComponent>
)

const Button: React.FC<{ label: string }> = ({ label }) => (
	<ButtonComponent type="submit" className="w-full">
		{label} <NextIcon className="ml-2" />
	</ButtonComponent>
)

export const SubmitButton: React.FC<Props> = ({ label, waitingLabel }) => {
	const { pending } = useFormStatus()

	return pending ? <LoadingButton waitingLabel={waitingLabel} /> : <Button label={label} />
}
