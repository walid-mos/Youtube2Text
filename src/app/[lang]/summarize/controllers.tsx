import OpenAI from 'openai'
import fs from 'fs'
import ytdl from 'ytdl-core'

import { ProcessStepType, getProcessStepByUUID, setProcessStepData } from '@/supabase/functions/processLink'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const getProcessStep = async (uuid: string) => {
	const processStep = await getProcessStepByUUID(uuid)

	// TODO: Handle better error
	if (!processStep) throw new Error('Could not find Process Step')

	return processStep
}

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

const transcriptLink = async (processStepId: number, uuid: string) => {
	const data = await getProcessStepByUUID(uuid)

	if (data?.transcript) return data.transcript

	const transcript = (
		await openai.audio.transcriptions.create({
			file: fs.createReadStream(`/tmp/${uuid}.mp3`),
			model: 'whisper-1',
		})
	).text

	await setProcessStepData(processStepId, { transcript })

	return transcript
}

const summarizeVideo = async (transcript: string, processStepId: number, uuid: string) => {
	const data = await getProcessStepByUUID(uuid)

	if (data?.summary) return data.summary

	const summary = { text: 'test' }

	await setProcessStepData(processStepId, { summary: summary.text })

	return `${transcript} summary`
}

export async function* stepsGenerator(processStep: ProcessStepType) {
	const { link, uuid } = processStep.queries
	await downloadVideo(link, uuid)
	yield 1

	const transcript = await transcriptLink(processStep.id, uuid)
	yield 2

	await summarizeVideo(transcript, processStep.id, uuid)
	yield 3
}

export type StepPromiseType = ReturnType<ReturnType<typeof stepsGenerator>['next']>
