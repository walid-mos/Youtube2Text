/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import OpenAI from 'openai'
import ytdl from 'ytdl-core'
import fs from 'fs'
import { nanoid } from 'nanoid'

import { isFulfilled, isRejected } from '@/utils/promises'

import type { Transcription } from 'openai/resources/audio/transcriptions'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const downloadVideo = async (link: string, uuid: string) => {
	return new Promise((resolve, reject) => {
		const audioStream = fs.createWriteStream(`/tmp/${uuid}.mp3`)
		ytdl(link, {
			filter: 'audioonly',
		}).pipe(audioStream)
		audioStream.on('finish', () => resolve(true))
		audioStream.on('error', reject)
	})
}

const transcriptLink = async (uuid: string) => {
	const transcript = await openai.audio.transcriptions.create({
		file: fs.createReadStream(`/tmp/${uuid}.mp3`),
		model: 'whisper-1',
	})

	return transcript.text
}

const summarizeVideo = (transcript: any) => {
	return `${transcript} summary`
}

export const handleGenerate = async (links: string[]) => {
	const promises = await Promise.allSettled(
		links.map(async link => {
			const uuid = nanoid()
			await downloadVideo(link, uuid)
			const transcript = await transcriptLink(uuid)
			return summarizeVideo(transcript)
		}),
	)

	if (promises.filter(isRejected).length) throw new Error('Something went wrong')

	return promises.filter(isFulfilled).map(p => p.value)
}
