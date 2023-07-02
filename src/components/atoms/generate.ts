import { atom } from 'jotai'

import type { StepType } from '@/types/types'

export const StepAtom = atom<StepType>(['download'])
