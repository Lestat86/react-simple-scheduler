
type tNumericRange<N extends number, Result extends number[] = []> =
  Result['length'] extends N ? Result[number] : tNumericRange<N, [...Result, Result['length']]>

export type tHours = tNumericRange<25>
export type tMinutes = tNumericRange<60>

export type tDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type tTimeFormat = {
  hours: tHours
  minutes: tMinutes
}

export type tTimeExclusion = {
  // if omitted, it will be valid for every day
  days?: tDay[]
  exclusionStart: tTimeFormat
  exclusionEnd: tTimeFormat
}

export type tConfiguration = {
  timeExclusions?: tTimeExclusion[]
  dayExclusions?: tDay[]
}

export type tAppointment = {
  dateStart: Date
  dateEnd: Date
  title: string
  name: string
  phone: string
  email?: string
  description?: string
  sendReminder?: boolean
}

export type tAppointmentPreset = {
  name: string
  duration: number
  editorLock?: boolean
}
