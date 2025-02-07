import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek
} from "date-fns"


export const getEnclosingMonthDays = (current: Date) => {
  const monthStart = startOfMonth(current,)
  const monthEnd = endOfMonth(current)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  return days
}

export const getMonthStartPlaceHolderDays = (current: Date, weekStartsOn: number = 1) => {
  const monthStart = startOfMonth(current,)
  const monthFirstDay = monthStart.getDay()

  const dayToUse = monthFirstDay === 0 ? 7 : monthFirstDay
  const placeHoldersDays = dayToUse - weekStartsOn

  return placeHoldersDays
}

export const getMonthEndPlaceHolderDays = (current: Date) => {
  const monthEnd = endOfMonth(current,)
  const monthLastDay = monthEnd.getDay()

  const dayToUse = monthLastDay === 0 ? 7 : monthLastDay
  const placeHoldersDays = 7 - dayToUse

  console.log('monthends', 7, dayToUse)
  return placeHoldersDays
}

export const getEnclosingWeekDays = (current: Date) => {
  const weekStart = startOfWeek(current, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(current, { weekStartsOn: 1 })

  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

  return days
}

// TODO: this will evolve with allowed times, ecc ecc
export const getTimeSlots = (startTime: Date, endTime: Date) => {
  const slots = eachHourOfInterval({ start: startTime, end: endTime })

  return slots
}
