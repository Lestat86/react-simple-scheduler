import { format } from "date-fns"
import { tAppointment, tTimeFormat } from "../types/data-types"

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
