import Image from 'next/image'

import { Card, CardBody } from '@nextui-org/card'

import { getLinkYoutubeInfos } from '../controllers'
import { downloadVideo } from '../action'
import Status from './Status'

type Props = {
	link: string
}

const LinkData: React.FC<Props> = async ({ link }) => {
	const data = await getLinkYoutubeInfos(link)
	return (
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
	)
}

const StepDownload: React.FC<Props> = ({ link }) => {
	const result = downloadVideo(link)

	return (
		<Card className="w-full max-w-xl bg-background/60 dark:bg-default-100/50" shadow="sm">
			<CardBody>
				<LinkData link={link} />
				<Status promise={result} />
			</CardBody>
		</Card>
	)
}

export default StepDownload
