import ytdl from 'ytdl-core'

export const getLinkYoutubeInfos = async (link: string) => {
	const linkFetched = await ytdl.getBasicInfo(link)

	if (!linkFetched) throw new Error('An error happened fetching videos infos')

	const {
		videoDetails: { title, lengthSeconds, thumbnails },
	} = linkFetched

	const thumbnail = thumbnails.filter(t => t.width < 1000).sort((a, b) => b.width - a.width)[0]

	if (!thumbnail) throw new Error('An error happened fetching thumbnail for the video')

	const videoLengthArray = new Date(Number(lengthSeconds) * 1000).toISOString().slice(11, 19).split(':')
	if (videoLengthArray[0] === '00') videoLengthArray.shift()
	const videoLength = videoLengthArray.join(':')

	return { title, videoLength, thumbnail }
}
