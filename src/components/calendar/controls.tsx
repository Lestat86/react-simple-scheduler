import React from 'react'
import Button from '../button'

type Props = {
  nextFun: () => void
  prevFun: () => void
  currentValue: string
}

const CalendarControls = ({ nextFun, prevFun, currentValue }: Props) => {
  return (
    <div className='flex gap-3 border-gray-200'>
      <Button variant='PRIMARY' caption='prev' onClick={prevFun} />
      <span className='font-semibold'>{currentValue}</span>
      <Button variant='PRIMARY' caption='next' onClick={nextFun} />
    </div>
  )
}

export default CalendarControls
