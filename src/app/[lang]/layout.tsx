import { LOCALES } from '@/utils/constants'

export async function generateStaticParams() {
	return LOCALES.langs.map((code) => ({ lang: code }))
}

const Layout = ({ children } : {
	children: React.ReactNode
}) => (
	<>
		{ children }
	</>
)

export default Layout
