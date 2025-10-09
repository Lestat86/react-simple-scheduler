import { format } from "date-fns"
import { tAppointment, tAppointmentPreset, tDay, tTimeExclusion, tTimeFormat } from "../types/data-types"
import { DEFAULT_SLOT_DURATION } from "../constants/misc"

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

// Get minimum slot duration from configuration
export const getMinimumSlotDuration = (
  appointmentDurations?: number[],
  appointmentPresets?: tAppointmentPreset[]
): number => {
  let minDuration = DEFAULT_SLOT_DURATION

  if (appointmentDurations && appointmentDurations.length > 0) {
    minDuration = Math.min(...appointmentDurations)
  }

  if (appointmentPresets && appointmentPresets.length > 0) {
    const presetDurations = appointmentPresets.map(preset => preset.duration)
    const minPresetDuration = Math.min(...presetDurations)
    
    minDuration = Math.min(minDuration, minPresetDuration)
  }

  return minDuration
}

// Check if there's enough free time in a slot for the minimum duration
export const slotHasAvailableTime = (
  appointments: tAppointment[],
  currentDate: Date,
  currentValue: tTimeFormat,
  appointmentDurations?: number[],
  appointmentPresets?: tAppointmentPreset[]
): boolean => {
  const minDuration = getMinimumSlotDuration(appointmentDurations, appointmentPresets)
  
  // Create time bounds for the current hour slot (e.g., 10:00 to 11:00)
  const slotStart = new Date(currentDate)
  slotStart.setHours(currentValue.hours, 0, 0, 0)
  
  const slotEnd = new Date(currentDate)
  slotEnd.setHours(currentValue.hours + 1, 0, 0, 0)
  
  // Get all appointments that overlap with this hour slot
  const overlappingAppointments = appointments.filter((appointment) => {
    const appointmentStart = appointment.dateStart.getTime()
    const appointmentEnd = appointment.dateEnd.getTime()
    const slotStartTime = slotStart.getTime()
    const slotEndTime = slotEnd.getTime()
    
    // Check if appointment overlaps with the slot
    return appointmentStart < slotEndTime && appointmentEnd > slotStartTime
  })
  
  // If no appointments in this slot, it's available
  if (overlappingAppointments.length === 0) {
    return true
  }
  
  // Sort appointments by start time
  overlappingAppointments.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime())
  
  // Check for gaps between appointments and at the beginning/end
  let lastEndTime = slotStart.getTime()
  
  for (const appointment of overlappingAppointments) {
    const appointmentStartTime = Math.max(appointment.dateStart.getTime(), slotStart.getTime())
    
    // Check gap before this appointment
    const gapDuration = appointmentStartTime - lastEndTime
    if (gapDuration >= minDuration * 60000) { // minDuration is in minutes
      return true
    }
    
    lastEndTime = Math.max(lastEndTime, appointment.dateEnd.getTime())
  }
  
  // Check gap after the last appointment
  const finalGap = slotEnd.getTime() - lastEndTime
  if (finalGap >= minDuration * 60000) {
    return true
  }
  
  return false
}

// Get all appointments that overlap with a specific hour slot
export const getAppointmentsInSlot = (
  appointments: tAppointment[],
  currentDate: Date,
  currentValue: tTimeFormat
): tAppointment[] => {
  // Create time bounds for the current hour slot (e.g., 10:00 to 11:00)
  const slotStart = new Date(currentDate)
  slotStart.setHours(currentValue.hours, 0, 0, 0)
  
  const slotEnd = new Date(currentDate)
  slotEnd.setHours(currentValue.hours + 1, 0, 0, 0)
  
  // Get all appointments that overlap with this hour slot
  return appointments.filter((appointment) => {
    const appointmentStart = appointment.dateStart.getTime()
    const appointmentEnd = appointment.dateEnd.getTime()
    const slotStartTime = slotStart.getTime()
    const slotEndTime = slotEnd.getTime()
    
    // Check if appointment overlaps with the slot
    return appointmentStart < slotEndTime && appointmentEnd > slotStartTime
  })
}

// Check if an appointment should be rendered in the current slot (for cross-slot appointments)
export const shouldRenderAppointmentInSlot = (
  appointment: tAppointment,
  currentDate: Date,
  currentValue: tTimeFormat
): boolean => {
  // Create time bounds for the current hour slot
  const slotStart = new Date(currentDate)
  slotStart.setHours(currentValue.hours, 0, 0, 0)
  
  const appointmentStartHour = appointment.dateStart.getHours()
  const appointmentStartDate = new Date(appointment.dateStart)
  appointmentStartDate.setHours(appointmentStartHour, 0, 0, 0)
  
  // Only render in the slot where the appointment starts
  return slotStart.getTime() === appointmentStartDate.getTime() &&
         currentDate.toDateString() === appointment.dateStart.toDateString()
}

// Calculate the total height span for cross-slot appointments
export const calculateCrossSlotHeight = (
  appointment: tAppointment
): { height: number; slotSpan: number } => {
  // Get appointment duration in milliseconds
  const appointmentDuration = appointment.dateEnd.getTime() - appointment.dateStart.getTime()
  
  // One hour in milliseconds
  const oneHour = 60 * 60 * 1000
  
  // Calculate how many slots this appointment spans
  const slotSpan = Math.ceil(appointmentDuration / oneHour)
  
  // Calculate the total height as percentage (each slot is 100%)
  const height = (appointmentDuration / oneHour) * 100
  
  return { height, slotSpan }
}

// Find the next available start time within a slot
export const findNextAvailableTime = (
  appointments: tAppointment[],
  currentDate: Date,
  currentValue: tTimeFormat,
  minDuration: number = 30 // minimum duration in minutes for the new appointment
): Date => {
  // Create time bounds for the current hour slot
  const slotStart = new Date(currentDate)
  slotStart.setHours(currentValue.hours, 0, 0, 0)
  
  const slotEnd = new Date(currentDate)
  slotEnd.setHours(currentValue.hours + 1, 0, 0, 0)
  
  // Get all appointments that overlap with this hour slot, sorted by start time
  const overlappingAppointments = getAppointmentsInSlot(appointments, currentDate, currentValue)
    .sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime())
  
  // If no appointments, start at the beginning of the slot
  if (overlappingAppointments.length === 0) {
    return slotStart
  }
  
  // Check if there's enough space at the beginning
  const firstAppointmentStart = overlappingAppointments[0].dateStart.getTime()
  const gapAtStart = firstAppointmentStart - slotStart.getTime()
  if (gapAtStart >= minDuration * 60000) {
    return slotStart
  }
  
  // Check gaps between appointments
  for (let i = 0; i < overlappingAppointments.length - 1; i++) {
    const currentEnd = overlappingAppointments[i].dateEnd.getTime()
    const nextStart = overlappingAppointments[i + 1].dateStart.getTime()
    
    if (nextStart - currentEnd >= minDuration * 60000) {
      return new Date(currentEnd)
    }
  }
  
  // Check if there's enough space at the end
  const lastAppointmentEnd = overlappingAppointments[
    overlappingAppointments.length - 1
  ].dateEnd.getTime()
  const gapAtEnd = slotEnd.getTime() - lastAppointmentEnd
  if (gapAtEnd >= minDuration * 60000) {
    return new Date(lastAppointmentEnd)
  }
  
  // If no space available, return the start of the slot as fallback
  return slotStart
}

// Get available minutes for a specific hour considering appointments and duration
export const getAvailableMinutes = (
  appointments: tAppointment[],
  currentDate: Date,
  selectedHour: number,
  duration: number // duration in minutes
): number[] => {
  const availableMinutes: number[] = []

  // Check every 5-minute interval
  for (let minute = 0; minute < 60; minute += 5) {
    const startTime = new Date(currentDate)
    startTime.setHours(selectedHour, minute, 0, 0)

    const endTime = new Date(startTime)
    endTime.setTime(startTime.getTime() + duration * 60000)

    // Check if this time range conflicts with any existing appointment
    const hasConflict = appointments.some((appointment) => {
      const existingStart = appointment.dateStart.getTime()
      const existingEnd = appointment.dateEnd.getTime()
      const newStart = startTime.getTime()
      const newEnd = endTime.getTime()

      // Check if new appointment overlaps with existing appointment
      return (newStart < existingEnd && newEnd > existingStart)
    })

    if (!hasConflict) {
      availableMinutes.push(minute)
    }
  }

  return availableMinutes
}
