type Props = {
	label: string
}

const Title: React.FC<Props> = ({ label }) => (
	<h1 className="py-4 mx-16 text-3xl font-bold text-center text-transparent md:text-4xl lg:text-5xl bg-gradient-to-t bg-clip-text from-red-600 to-red-300 dark:from-zinc-100/60 dark:to-white">
		{label}
	</h1>
)

export default Title
