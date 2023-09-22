import { LOCALES_TYPE } from '@/utils/constants'

type Messages = typeof import('@/locales/en-US.json')
// eslint-disable-next-line eol-last, @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}

type LangProps = {
	params: {
		lang: LOCALES_TYPE
	}
}
