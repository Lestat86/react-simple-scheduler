import React from 'react'
import Button from '../button'

type Props = {
  nextFun: () => void
  prevFun: () => void
  todayFun: () => void
  currentValue: string
}

const CalendarControls = ({ nextFun, prevFun, todayFun, currentValue }: Props) => {
  return (
    <div className='flex gap-3 border-gray-200 items-center justify-between'>
      <div className="flex gap-3 items-center">
        <Button variant='PRIMARY' caption='prev' onClick={prevFun} />
        <Button variant='PRIMARY' caption='today' onClick={todayFun} />
        <Button variant='PRIMARY' caption='next' onClick={nextFun} />
      </div>
      <span className='font-semibold'>{currentValue}</span>
    </div>
  )
}

export default CalendarControls
