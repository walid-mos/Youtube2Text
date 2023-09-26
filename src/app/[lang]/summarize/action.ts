'use server'

export const downloadVideo = async (uuid: string) => {
	await new Promise(resolve => {
		console.log(uuid)
		setTimeout(resolve, 4000)
	})
	console.log('here')
	return true
}

export type DownloadVideoType = ReturnType<typeof downloadVideo>
