import { cn } from '@/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className, disabled, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        'text-white font-bold bg-[#7B00FF] rounded-lg p-3 transition-all',
        'hover:bg-[#5C00BE]',
        disabled &&
          'text-[#979797] bg-[#EAEAEA] hover:bg-[#EAEAEA] hover:cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
