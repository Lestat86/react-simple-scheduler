
import React from 'react'
import { tAppointment, tConfiguration, tDay, tTimeFormat } from '../../types/data-types'
import { slotIsBooked } from '../../utils/misc'

type Props = {
  isEditor?: boolean
  currentDate: Date
  currentValue: tTimeFormat
  selectFun: (current: tTimeFormat, selectedDate: Date) => void
  configuration: tConfiguration
  appointments: tAppointment[]
}

const HourSlot = ({
  isEditor,
  currentDate,
  currentValue,
  selectFun,
  configuration,
  appointments
}: Props) => {
  console.log('isEditor', isEditor)


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

  const isExcluded = dayExcluded || timeExcluded

  const excludedClass = isExcluded ? ' excluded' : ''
  const bookedClass = hasAppointment ? ' booked' : ''
  const className = `hour-slot${excludedClass}${bookedClass}`

  const onClick = () => {
    if (isExcluded) {
      return
    }

    selectFun(currentValue, currentDate)
  }

  // this will eventually contain the appointment, or an X, or some placeholder
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
