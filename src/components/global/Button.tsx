import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/classnames'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: cn(
					'text-zinc-50 bg-zinc-700',
					'dark:text-zinc-700 dark:bg-zinc-50',
					'hover:text-zinc-100 hover:ring-red-700/80 hover:bg-red-600 hover:drop-shadow-cta',
					'dark:hover:text-zinc-100 dark:hover:ring-red-900/80 dark:hover:bg-red-600/90',
				),
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: cn(
					'overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 duration-150 border border-input',
					'text-zinc-700 ring-zinc-600/10',
					'dark:text-zinc-400 dark:ring-zinc-100/10',
					'hover:ring-zinc-600/30 hover:bg-accent hover:text-accent-foreground',
					'dark:hover:ring-zinc-100/30',
				),

				// ' bg-background ',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
