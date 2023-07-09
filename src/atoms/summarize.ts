import { atom } from 'jotai'

export const textAtom = atom('')
export const linesAtom = atom(
	(get) => get(textAtom).split('\n'),
)

export const isTextAtom = atom(
	(get) => get(linesAtom).length > 0,
)

export const loadingAtom = atom(false)
export const errorMessageAtom = atom('')
