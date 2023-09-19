/* eslint-disable arrow-body-style */
const isFulfilled = <T>(p: PromiseSettledResult<T>): p is PromiseFulfilledResult<T> => p.status === 'fulfilled'

const isRejected = <T>(p: PromiseSettledResult<T>): p is PromiseRejectedResult => p.status === 'rejected'

const transcriptLink = (link: string) => {
	return `${link} transcript`
}

const summarizeVideo = (transcript: string) => {
	return `${transcript} summary`
}

export const handleGenerate = async (links: string[]) => {
	const promises = await Promise.allSettled(
		links.map(link => {
			const transcript = transcriptLink(link)
			const summary = summarizeVideo(transcript)

			return summary
		}),
	)

	const errors = promises.filter(isRejected)

	if (errors.length) throw new Error('Something went wrong')

	return promises.filter(isFulfilled).map(p => p.value)
}
