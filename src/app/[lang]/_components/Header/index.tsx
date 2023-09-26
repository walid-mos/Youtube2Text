import Link from 'next/link'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'

import { Button } from '@/components/ui/Button'

import Logo from './Logo'

const Header = () => (
	<Navbar className="bg-inherit" shouldHideOnScroll>
		<NavbarBrand>
			<Logo />
		</NavbarBrand>
		<NavbarContent justify="end">
			<NavbarItem className="flex">
				<Button asChild color="primary" variant="default">
					<Link href="#">Sign Up / Login</Link>
				</Button>
			</NavbarItem>
		</NavbarContent>
	</Navbar>
)

export default Header
