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
