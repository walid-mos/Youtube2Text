import { type StepsPromiseType } from '../controllers'
import Status from './Status'

type Props = {
	transcriptVideoPromise: StepsPromiseType
}

const StepTranscript: React.FC<Props> = ({ transcriptVideoPromise }) => <Status promise={transcriptVideoPromise} />

export default StepTranscript
