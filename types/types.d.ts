// Summarize
export type LinksType = string[]

// Generate
const Steps = [boolean, boolean, boolean]
export type StepType = typeof Steps[number][]

// Components
export type SVGProps = {
	size?: 's' | 'm' | 'l' | 'xl' | '2xl'
	className?: string
}
