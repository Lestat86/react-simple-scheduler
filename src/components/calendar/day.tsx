import { getDate } from 'date-fns'
import React from 'react'
import { tConfiguration, tDay } from '../../types/data-types'

type Props = {
  isEditor?: boolean
  isWeek?: boolean
  currentValue: Date
  dayClickFun: (current: Date) => void
  configuration: tConfiguration
}

const DayComponent = ({ isEditor, isWeek, currentValue, dayClickFun, configuration }: Props) => {
  console.log('isEditor', isEditor)

  const onClick = () => {
    dayClickFun(currentValue)
  }

  const isExcluded = configuration.dayExclusions?.includes(currentValue.getDay() as tDay)

  const classNameInner = isExcluded ? 'calendar-day excluded' : 'calendar-day'
  const classNameOuter = isWeek ? 'day-component week' : 'day-component'

  return (
    <div className={classNameOuter}>
      {!isWeek &&
        <div className={classNameInner} onClick={onClick} />
      }
      <span className='font-bold text-xl'>
        {getDate(currentValue)}
      </span>
    </div>
  )
}

export default DayComponent
