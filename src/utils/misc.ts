import { format } from "date-fns"
import { tAppointment, tDay, tTimeExclusion, tTimeFormat } from "../types/data-types"

export const notNullishCheck = (value: unknown): value is NonNullable<unknown> => {
  if (value === null || value === undefined || value === '') {
    return false
  }

  return true
}

export const findMatchingAppointment = (appointments: tAppointment[],
  currentDate: Date,
  currentValue: tTimeFormat) => {
  return appointments.find((current) => {
    const appointementStart = current.dateStart
    const appointementEnd = current.dateEnd

    const parsedDate = new Date(currentDate)
    parsedDate.setHours(currentValue.hours, currentValue.minutes)

    return parsedDate >= appointementStart && parsedDate < appointementEnd
  })
}

export const slotIsBooked = (appointments: tAppointment[],
  currentDate: Date,
  currentValue: tTimeFormat) => {
  const matchingAppointment = findMatchingAppointment(
    appointments,
    currentDate,
    currentValue
  )

  return matchingAppointment !== undefined
}

export const isTimeExcluded = (
  currentDay: tDay,
  currentValue: tTimeFormat,
  timeExclusions?: tTimeExclusion[]
) => {
  if (notNullishCheck(timeExclusions)) {
    const isExcluded = timeExclusions?.some((current) => {
      const { exclusionStart, exclusionEnd, days } = current

      if (!days?.includes(currentDay)) {
        return false
      }

      const parsedEnd = exclusionEnd.hours > 0 ? exclusionEnd.hours : 24
      const startIncluded = currentValue.hours > exclusionStart.hours
      const endIncluded = currentValue.hours < parsedEnd

      return startIncluded && endIncluded
    })

    return isExcluded
  }

  return false
}

export const dayHasAppointments = (appointments: tAppointment[], currentDate: Date) => {
  const formattedCurrent = format(currentDate, 'dd/MM/yyyy')

  const found = appointments.some((current) => {
    const formattedStart = format(current.dateStart, 'dd/MM/yyyy')
    const formattedEnd = format(current.dateEnd, 'dd/MM/yyyy')

    const startIncluded = formattedStart === formattedCurrent
    const endIncluded = formattedEnd === formattedCurrent

    return startIncluded || endIncluded
  })

  return found
}
