
import React from 'react'
import { tAppointment, tConfiguration, tDay, tTimeFormat } from '../../types/data-types'

type Props = {
  isEditor?: boolean
  currentDate: Date
  currentValue: tTimeFormat
  selectFun: (current: tTimeFormat) => void
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

  const onClick = () => {
    selectFun(currentValue)
  }


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

  const hasAppointment = appointments.some((current) => {
    const appointementStart = current.dateStart
    const appointementEnd = current.dateEnd

    const parsedDate = new Date(currentDate)
    parsedDate.setHours(currentValue.hours, currentValue.minutes)

    return parsedDate >= appointementStart && parsedDate < appointementEnd
  })

  const isExcluded = dayExcluded || timeExcluded

  const excludedClass = isExcluded ? ' excluded' : ''
  const bookedClass = hasAppointment ? ' booked' : ''
  const className = `hour-slot${excludedClass}${bookedClass}`


  // this will eventually contain the appointment, or an X, or some placeholder
  return (
    <div className='p-4 w-20 h-20 border border-gray-200 flex items-center justify-center shrink-0 relative'>
      <div className={className} onClick={onClick} />
      <span className='font-semibold text-sm'>{currentValue.hours} - {currentValue.hours + 1} </span>
    </div>
  )
}

export default HourSlot
