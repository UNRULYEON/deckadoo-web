import { forwardRef, HTMLProps } from 'react'

type InputProps = {
  label?: string
  id?: string
  error?: string
} & HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col ">
        {label && (
          <label htmlFor={id} className="font-bold mb-2">
            {label}
          </label>
        )}
        <input
          id={id}
          className="p-4 border border-[#D7D7D7] rounded-lg text-sm"
          ref={ref}
          {...rest}
        />
        {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
      </div>
    )
  }
)

export default Input
