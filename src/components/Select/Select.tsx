import { cn } from '@/utils'
import { forwardRef, HTMLProps } from 'react'

type SelectProps = {
  options: readonly string[]
  error?: string
} & HTMLProps<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, error, disabled, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col text-[#111111]">
        <label htmlFor={id} className="font-bold mb-2">
          {label}
        </label>
        <select
          id={id}
          className={cn(
            'p-4 appearance-none border border-[#D7D7D7] rounded-lg text-sm placeholder:text-[#7E7E7E]',
            'focus:border-[#7B00FF] outline-none',
            disabled && 'hover:cursor-not-allowed',
            className
          )}
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yLjE4MDg1IDUuNDQ3NDVDMi40OTc1NyA0Ljk3MjkxIDMuMTIxMSA0Ljg1NzUxIDMuNTczNTUgNS4xODk2OEw4LjAwMDA5IDguNDM5NTJMMTIuNDI2NiA1LjE4OTY4QzEyLjg3OTEgNC44NTc1MSAxMy41MDI2IDQuOTcyOTEgMTMuODE5MyA1LjQ0NzQ1QzE0LjEzNiA1LjkyMTk4IDE0LjAyNiA2LjU3NTk1IDEzLjU3MzUgNi45MDgxM0w4LjU5MTg5IDEwLjU2NTVDOC4yMzk3MSAxMC44MjQxIDcuNzYwNDYgMTAuODI0MSA3LjQwODI4IDEwLjU2NTVMMi40MjY2MiA2LjkwODEzQzEuOTc0MTcgNi41NzU5NSAxLjg2NDE0IDUuOTIxOTggMi4xODA4NSA1LjQ0NzQ1WiIgZmlsbD0iIzExMTExMSIvPgo8L3N2Zz4K')`,
            backgroundSize: '1.3rem',
            backgroundPosition: 'right 1rem center',
            backgroundRepeat: 'no-repeat',
          }}
          disabled={disabled}
          ref={ref}
          {...rest}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
      </div>
    )
  }
)

export default Select
