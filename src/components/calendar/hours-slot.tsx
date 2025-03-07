
import React from 'react'
import { tAppointment, tConfiguration, tDay, tTimeFormat } from '../../types/data-types'
import { slotIsBooked } from '../../utils/misc'

type Props = {
  currentDate: Date
  currentValue: tTimeFormat
  selectFun: (current: tTimeFormat, selectedDate: Date) => void
  configuration: tConfiguration
  appointments: tAppointment[]
  limitPastDates?: boolean
}

const HourSlot = ({
  currentDate,
  currentValue,
  selectFun,
  configuration,
  appointments,
  limitPastDates
}: Props) => {


  const currentDay = currentDate.getDay() as tDay

  const dayExcluded = configuration.dayExclusions?.includes(currentDay)
  const timeExcluded = configuration.timeExclusions?.some((current) => {
    const { exclusionStart, exclusionEnd, days } = current

    if (!days?.includes(currentDay)) {
      return false
    }

    const parsedEnd = exclusionEnd.hours > 0 ? exclusionEnd.hours : 24
    const startIncluded = currentValue.hours > exclusionStart.hours
    const endIncluded = currentValue.hours < parsedEnd

    return startIncluded && endIncluded
  })

  const hasAppointment = slotIsBooked(appointments, currentDate, currentValue)

  const parsedDate = new Date(currentDate)
  parsedDate.setHours(currentValue.hours, currentValue.minutes)

  const pastExcluded = limitPastDates ? parsedDate < new Date() : false
  const isExcluded = dayExcluded || timeExcluded

  const pastExcludedClass = pastExcluded ? ' past-excluded' : ''
  const excludedClass = isExcluded ? ' excluded' : ''
  const bookedClass = hasAppointment ? ' booked' : ''

  const className = `hour-slot${excludedClass}${bookedClass}${pastExcludedClass}`

  const onClick = () => {
    if (isExcluded || pastExcluded) {
      return
    }

    selectFun(currentValue, currentDate)
  }

  return (
    <div className='p-4 w-20 h-20 border border-gray-200 flex items-center justify-center shrink-0 relative'>
      <div className={className} onClick={onClick} />
      <span className='font-semibold text-sm'>
        {currentValue.hours} - {currentValue.hours + 1}
      </span>
    </div>
  )
}

export default HourSlot
