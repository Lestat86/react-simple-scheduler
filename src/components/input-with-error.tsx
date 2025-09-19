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

  const inputClasses = `
    w-full px-5 py-4 mt-1 text-gray-900 bg-white border rounded-lg
    transition-all duration-200 ease-in-out
    placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    hover:border-gray-300
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    min-h-[52px]
    ${hasError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'}
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className="flex flex-col">
      <label className='font-medium text-gray-700 text-sm mb-1'>{label}</label>
      <input 
        type='text'
        className={inputClasses}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={`Inserisci ${label.toLowerCase()}`}
      />
      {hasError && (
        <span className='text-xs text-red-600 mt-2 font-medium flex items-center'>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </span>
      )}
    </div>)
}

export default InputWithError
