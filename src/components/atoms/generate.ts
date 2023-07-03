import { atom } from 'jotai'

import type { StepType } from '@/types/types'

export const StepAtom = atom<StepType>(['download'])
export const StepLoadingAtom = atom(
	(get) => {
		const step = get(StepAtom)
		return step[step.length - 1]
	},
)
