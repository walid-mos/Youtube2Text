import Image from 'next/image'

import StepCard from './StepCard'
import { getLinkYoutubeInfos } from '../controllers'

type Props = {
	link: string
}

const StepDownload: React.FC<Props> = async ({ link }) => {
	const data = await getLinkYoutubeInfos(link)

	return (
		<StepCard>
			<div className="grid gap-6 m-2 text-center sm:text-left sm:grid-cols-3 place-items-center">
				<div className="hidden sm:block">
					<Image
						src={data.thumbnail.url}
						width={data.thumbnail.width}
						height={data.thumbnail.height}
						alt={data.title}
					/>
				</div>
				<div className="flex flex-col justify-between h-full sm:col-span-2">
					<div className="text-lg text-foreground/90">{data.title}</div>
					<div className="font-bold text-small text-foreground/80">{data.videoLength}</div>
				</div>
			</div>
		</StepCard>
	)
}

export default StepDownload
