import Image from 'next/image'

import { getLinkYoutubeInfos } from '../controllers'

type Props = {
	link: string
}

const VideoData: React.FC<Props> = async ({ link }) => {
	const youtubeData = await getLinkYoutubeInfos(link)

	return (
		<div className="flex items-center justify-between w-full mt-10">
			<div className="hidden sm:block">
				<Image
					src={youtubeData.thumbnail.url}
					width={youtubeData.thumbnail.width}
					height={youtubeData.thumbnail.height}
					alt={youtubeData.title}
				/>
			</div>
			<div className="flex flex-col justify-between h-full text-right">
				<div className="text-xl text-foreground/90">{youtubeData.title}</div>
				<div className="text-small text-foreground/80">{youtubeData.videoLength}</div>
			</div>
		</div>
	)
}

export default VideoData
