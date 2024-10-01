import { forwardRef, HTMLProps, Ref } from 'react'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  type: string
  placeholder: string
  name: string
  id: string
  errors?: string
}

const Input = forwardRef(
  ({ label, errors, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="flex flex-col w-full gap-1">
        <label className="ms-1 my-1 font-medium text-sm text-black">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          className="px-3 py-2 text-black rounded-lg placeholder:capitalize placeholder:text-sm"
        />
        {errors && (
          <p className="text-red-500/80 text-sm font-medium ms-2 inline-block">
            {errors}
          </p>
        )}
      </div>
    )
  }
)

export default Input
