import { Card, CardBody } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'

type Props = {
	children: React.ReactNode
}

const StepCard: React.FC<Props> = ({ children }) => (
	<Card className="w-full max-w-xl bg-background/60 dark:bg-default-100/50" shadow="sm">
		<CardBody>
			{children}

			<Progress className="mt-5 mb-2" size="sm" isIndeterminate aria-label="Loading..." />
		</CardBody>
	</Card>
)

export default StepCard
