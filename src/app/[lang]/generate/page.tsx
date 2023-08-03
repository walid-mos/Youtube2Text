import Title from '@/components/layout/Title'
import type { LinksType } from '@/types/types'

import Timeline from './_components/Timeline'

type Props = {
	searchParams: {
		links: string
	}
}

const Generate: React.FC<Props> = ({ searchParams }) => {
	const links = JSON.parse(searchParams.links) as LinksType
	links.map((link) => link)
	return (
		<div className="container w-full mx-auto md:mb-16 lg:mb-32">
			<Title label="Generating..." className="mb-6 md:mb-12" />
			<Timeline />
		</div>
	)
}

export default Generate
