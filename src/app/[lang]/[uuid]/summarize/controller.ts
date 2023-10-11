import OpenAI from 'openai'
import fs from 'fs'
import ytdl from 'ytdl-core'
import { createTranslator } from 'next-intl'

import { ProcessStepType, getProcessStepByUUID, setProcessStepData } from '@/supabase/functions/processLink'
import { LOCALES_TYPE } from '@/utils/constants'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

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
	new Promise((resolve, reject) => {
		if (fs.existsSync(`/tmp/${uuid}.mp3`)) resolve(true)

		const audioStream = fs.createWriteStream(`/tmp/${uuid}.mp3`)
		ytdl(link, {
			filter: 'audioonly',
		}).pipe(audioStream)
		audioStream.on('finish', () => resolve(true))
		audioStream.on('error', reject)
	})

const transcriptLink = async (processStepId: number, uuid: string): Promise<string> => {
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

const summarizeVideo = async (
	transcript: string,
	processStepId: number,
	uuid: string,
	locale: LOCALES_TYPE,
): Promise<string> => {
	const data = await getProcessStepByUUID(uuid)

	if (data?.summary) return data.summary

	const t = createTranslator({ locale, messages: await import(`@/locales/${locale}.json`) })

	const completion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-16k',
		messages: [
			{
				role: 'system',
				content:
					'You are an assistant working for a CEO of a powerful company, you can speak fluently english and french, your main mission is to summarize transcripts of videos, to be understandable for a large audience, with the maximum information you can have.',
			},
			{ role: 'assistant', content: data?.transcript || transcript },
			{ role: 'user', content: t('summarize.ai_prompt') },
		],
	})

	const summary = completion.choices[0].message.content

	if (!summary) throw new Error('No summary created')

	await setProcessStepData(processStepId, { summary })

	return summary
}

const minimalTime = <T>(fn: () => Promise<T>, time?: number): Promise<T> =>
	new Promise(resolve => {
		setTimeout(async () => {
			const value = await fn()
			resolve(value)
		}, time ?? 2000)
	})

export async function* stepsGenerator(processStep: ProcessStepType, locale: LOCALES_TYPE) {
	const { link, uuid } = processStep.queries
	await minimalTime(() => downloadVideo(link, uuid))
	yield 1

	const transcript = await minimalTime(() => transcriptLink(processStep.id, uuid))
	yield 2

	await minimalTime(() => summarizeVideo(transcript, processStep.id, uuid, locale))
	yield 3
}

export type StepPromiseType = ReturnType<ReturnType<typeof stepsGenerator>['next']>
