import { type StepsPromiseType } from '../controllers'
import Status from './Status'

type Props = {
	downloadVideoPromise: StepsPromiseType
}

const StepDownload: React.FC<Props> = async ({ downloadVideoPromise }) => <Status promise={downloadVideoPromise} />

export default StepDownload
