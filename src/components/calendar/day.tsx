import { getDate } from 'date-fns'
import React from 'react'
import { tAppointment, tConfiguration, tDay } from '../../types/data-types'
import { dayHasAppointments } from '../../utils/misc'

type Props = {
  isWeek?: boolean
  currentValue: Date
  dayClickFun: (current: Date) => void
  configuration: tConfiguration
  appointments: tAppointment[]
}

const DayComponent = ({ isWeek,
  currentValue,
  dayClickFun,
  configuration,
  appointments
}: Props) => {

  const isExcluded = configuration.dayExclusions?.includes(currentValue.getDay() as tDay)

  const hasAppointment = dayHasAppointments(appointments, currentValue)

  const excludedClass = isExcluded ? ' excluded' : ''
  const bookedClass = hasAppointment ? ' booked' : ''

  const classNameInner = `calendar-day${excludedClass}${bookedClass}`
  const classNameOuter = isWeek ? 'day-component week' : 'day-component'

  const onClick = () => {
    if (isExcluded) {
      return
    }

    dayClickFun(currentValue)
  }

  return (
    <div className={classNameOuter}>
      <div className={classNameInner} onClick={onClick} />
      <span className='font-bold text-xl'>
        {getDate(currentValue)}
      </span>
    </div>
  )
}

export default DayComponent
