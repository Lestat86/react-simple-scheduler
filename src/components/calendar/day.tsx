import { getDate } from 'date-fns'
import React from 'react'

type Props = {
  isEditor?: boolean
  currentValue: Date
}

const DayComponent = ({ isEditor, currentValue }: Props) => {
  console.log('isEditor', isEditor)

  return (
    <div className='p-4 w-20 h-20 border border-gray-200 flex items-center justify-center'>
      <span className='font-bold text-xl'>
        {getDate(currentValue)}
      </span>
    </div>
  )
}

export default DayComponent
