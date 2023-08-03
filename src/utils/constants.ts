export const ID_LENGTH = 16
export const ENCRYPTION_KEY_LENGTH = 128
export const LATEST_KEY_VERSION = 2

export const GITHUB_PROFILE_URL = 'https://github.com/walid-mos'
export const GITHUB_REPO_URL = 'https://github.com/walid-mos/youtube2text'

export const LOCALES = ['en-US', 'fr'] as const
export const LOCALE_DEFAULT = LOCALES[0]
export type LOCALES_TYPE = typeof LOCALES[number]
