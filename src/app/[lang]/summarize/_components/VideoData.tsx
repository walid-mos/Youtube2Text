import Image from 'next/image'

import { getLinkYoutubeInfos } from '../controllers'

type Props = {
	link: string
}

const VideoData: React.FC<Props> = async ({ link }) => {
	const youtubeData = await getLinkYoutubeInfos(link)

	return (
		<>
			<div className="hidden sm:block">
				<Image
					src={youtubeData.thumbnail.url}
					width={youtubeData.thumbnail.width}
					height={youtubeData.thumbnail.height}
					alt={youtubeData.title}
				/>
			</div>
			<div className="text-lg text-foreground/90">{youtubeData.title}</div>
			<div className="font-bold text-small text-foreground/80">{youtubeData.videoLength}</div>
		</>
	)
}

export default VideoData
