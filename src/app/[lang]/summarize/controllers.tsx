import { cookies } from 'next/headers'

// import fs from 'fs'
import ytdl from 'ytdl-core'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { supabaseOptionsLinksSchema } from '@/supabase/shemasOptions'

import type { Database } from '@/types/database.types'

export const getProcessStep = async (uuid: string) => {
	const supabase = createServerComponentClient<Database>({ cookies }, supabaseOptionsLinksSchema)
	const { data, error } = await supabase
		.from('process_step')
		.select(`*, queries!inner(*)`)
		.eq('queries.uuid', uuid)
		.limit(1)
		.single()

	if (error) throw new Error(`An error occured while fetching Process Step table : ${error.message}`)
	if (!data.queries || !data) throw new Error('An error occured while fetching the data.')

	return { ...data, queries: data.queries }
}

export type ProcessStepType = Awaited<ReturnType<typeof getProcessStep>>

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const downloadVideo = async (link: string, uuid: string): Promise<boolean> =>
	new Promise(resolve => {
		setTimeout(resolve, 4000)
	})
// new Promise((resolve, reject) => {
// 	const audioStream = fs.createWriteStream(`/tmp/${uuid}.mp3`)
// 	ytdl(link, {
// 		filter: 'audioonly',
// 	}).pipe(audioStream)
// 	audioStream.on('finish', () => resolve(true))
// 	audioStream.on('error', reject)
// })

export type DownloadVideoType = ReturnType<typeof downloadVideo>

export async function* stepsGenerator(processStep: ProcessStepType) {
	yield await downloadVideo(processStep.queries.link, processStep.queries.uuid)
	yield await downloadVideo(processStep.queries.link, processStep.queries.uuid)
	yield await downloadVideo(processStep.queries.link, processStep.queries.uuid)
}

export type StepsGeneratorType = ReturnType<typeof stepsGenerator>
export type StepsPromiseType = Promise<IteratorResult<boolean, void>>
