import React from 'react'
import { notNullishCheck } from '../utils/misc'

type Props<T> = {
  value: T
  onChangeCB: (value: T) => void
  label: string
  disabled: boolean
  errorMessage?: string
}

const InputWithError = <T extends string | number,>({ value,
  onChangeCB,
  label,
  disabled,
  errorMessage
}: Props<T>) => {
  const hasError = notNullishCheck(errorMessage)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue: T = e.target.value as T
    onChangeCB(parsedValue)
  }

  return (
    <div className="flex flex-col">
      <span className='font-semibold'>{label}</span>
      <input type='text'
        className='border border-gray-100'
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {hasError && (
        <span className='text-xs text-red-500 mt-1'>
          {errorMessage}
        </span>
      )}
    </div>)
}

export default InputWithError
