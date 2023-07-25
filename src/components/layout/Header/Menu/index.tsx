import { GITHUB_REPO_URL, type LOCALES_TYPE } from '@/utils/constants'

import { useTranslations } from 'next-intl'
import LanguageSwitcher from '../Language/LanguageSwitcher'
import MenuLink from './Links'
import MobileBars from './MobileButton'
import MenuSkelleton from './Container'

type Props = {
	lang: LOCALES_TYPE
}

const navigation = [
	{
		name: 'home',
		href: '/',
		external: false,
	},
	{
		name: 'summarize',
		href: '/summarize',
		external: false,
	},
	{
		name: 'github',
		href: GITHUB_REPO_URL,
		external: true,
	},
] as const

const Menu: React.FC<Props> = ({ lang }) => {
	const t = useTranslations('layout.menu')
	return (
		<>
			{/* Mobile navigation */}
			<MobileBars />

			{/* Desktop navigation */}
			<MenuSkelleton>
				<ul className="gap-4 border-b-2 grow md:flex md:justify-between md:border-b-0">
					{navigation.map(({ href, name, external }) => (
						<li key={name}>
							<MenuLink
								{...{
									href, name: t(name), external,
								}}
							/>
						</li>
					))}
					<LanguageSwitcher lang={lang} />
				</ul>
			</MenuSkelleton>
		</>
	)
}

export default Menu
