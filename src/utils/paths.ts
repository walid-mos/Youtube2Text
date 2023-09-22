import { usePathname } from 'next/navigation'

export const getPathname = () => {
	const pathname = usePathname()

	// delete locale
	const [, , ...truePathname] = pathname.split('/')

	return `/${truePathname.join('/')}`
}
