import Title from '@/components/layout/Title'

import type { LinksType } from '@/types/types'

type Props = {
	searchParams: {
		links: string
	}
}

const Generate: React.FC<Props> = ({ searchParams }) => {
	const links = JSON.parse(searchParams.links) as LinksType
	return (
		<div className="container w-full mx-auto mt-8 md:mb-16 lg:mb-32">
			<Title label="Generating..." />
			<div className="text-white">
				{links.map((link, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<div key={index}>
						<div>{link}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Generate
