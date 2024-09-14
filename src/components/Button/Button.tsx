import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="text-white font-bold bg-[#7B00FF] rounded-lg p-3"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
