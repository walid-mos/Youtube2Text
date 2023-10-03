import { type StepsPromiseType } from '../controllers'
import Status from './Status'

type Props = {
	summarizeVideoPromise: StepsPromiseType
}

const StepSummarize: React.FC<Props> = async ({ summarizeVideoPromise }) => <Status promise={summarizeVideoPromise} />

export default StepSummarize
