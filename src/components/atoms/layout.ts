import { atom } from 'jotai'

export const isMenuOpenAtom = atom(false)
export const isLanguageMenuOpenAtom = atom(false)
export const languagesMenuIndexAtom = atom(-1)
export const isLoadedLanguageMenuAtom = atom(
	(get) => get(languagesMenuIndexAtom) >= 0,
)
