import { cookies } from 'next/headers'

import OpenAI from 'openai'
import fs from 'fs'
import ytdl from 'ytdl-core'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { supabaseOptionsLinksSchema } from '@/supabase/shemasOptions'

import type { Database } from '@/types/database.types'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

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
export const downloadVideo = async (link: string, uuid: string) =>
	new Promise((resolve, reject) => {
		const audioStream = fs.createWriteStream(`/tmp/${uuid}.mp3`)
		ytdl(link, {
			filter: 'audioonly',
		}).pipe(audioStream)
		audioStream.on('finish', () => resolve(true))
		audioStream.on('error', reject)
	})

const transcriptLink = async (processStepId: number, uuid: string) =>
	new Promise(resolve => {
		const supabase = createServerComponentClient<Database>({ cookies }, supabaseOptionsLinksSchema)
		supabase
			.from('process_step')
			.select(`transcript, queries!inner(*)`)
			.eq('queries.uuid', uuid)
			.limit(1)
			.single()
			.then(({ data }) => {
				if (data?.transcript) return resolve(true)

				return openai.audio.transcriptions
					.create({
						file: fs.createReadStream(`/tmp/${uuid}.mp3`),
						model: 'whisper-1',
					})
					.then(transcript => {
						supabase
							.from('process_step')
							.update({
								transcript: transcript.text,
							})
							.eq('id', processStepId)
							.then(() => {
								resolve(true)
							})
					})
			})
	})

const summarizeVideo = (uuid: string) =>
	new Promise(resolve => {
		const supabase = createServerComponentClient<Database>({ cookies }, supabaseOptionsLinksSchema)
		supabase
			.from('process_step')
			.select(`transcript, queries!inner(*)`)
			.eq('queries.uuid', uuid)
			.limit(1)
			.single()
			.then(({ data }) => {
				// TODO: Handle better error
				if (!data) throw new Error('Error')
				console.log('summary', `${data.transcript} summary`)
				resolve(`${data.transcript} summary`)
			})
	})

// export const testPromise = async (): Promise<boolean> =>
// 	new Promise(resolve => {
// 		setTimeout(resolve, 4000)
// 	})

export async function* stepsGenerator(processStep: ProcessStepType) {
	const { link, uuid } = processStep.queries
	yield await downloadVideo(link, uuid)
	yield await transcriptLink(processStep.id, uuid)
	yield await summarizeVideo(uuid)
}

export type StepsPromiseType = Promise<IteratorResult<unknown, void>>
