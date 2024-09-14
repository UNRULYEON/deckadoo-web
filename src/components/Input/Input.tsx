import { cn } from '@/utils'
import { forwardRef, HTMLProps } from 'react'

type InputProps = {
  label?: string
  id?: string
  error?: string
} & HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, disabled, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col text-[#111111]">
        {label && (
          <label htmlFor={id} className="font-bold mb-2">
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn(
            'p-4 border border-[#D7D7D7] rounded-lg text-sm placeholder:text-[#7E7E7E]',
            'focus:border-[#7B00FF] outline-none',
            disabled && 'hover:cursor-not-allowed',
            className
          )}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
        {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
      </div>
    )
  }
)

export default Input
