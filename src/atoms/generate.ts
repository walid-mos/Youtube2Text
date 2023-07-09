import { atom } from 'jotai'

import type { StepType } from '@/types/types'

export const StepAtom = atom<StepType>([true, true])
export const StepLoadingAtom = atom(
	(get) => get(StepAtom).length - 1,
)
