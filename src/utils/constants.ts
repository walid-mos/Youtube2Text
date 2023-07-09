export const ID_LENGTH = 16
export const ENCRYPTION_KEY_LENGTH = 128
export const LATEST_KEY_VERSION = 2

export const GITHUB_PROFILE_URL = 'https://github.com/walid-mos'
export const GITHUB_REPO_URL = 'https://github.com/walid-mos/youtube2text'

export const LOCALE_DEFAULT = 'en-US'
export const LOCALES = {
	defaultLocale: LOCALE_DEFAULT,
	langs: [LOCALE_DEFAULT, 'fr'],
} as const
export type LOCALES_TYPE = (typeof LOCALES)['langs'][number]
