export const CALENDAR_MODES = {
  MONTH: 'MONTH',
  WEEK: 'WEEK'
} as const

export const VIEW_MODES = {
  MONTH: 'MONTH',
  WEEK: 'WEEK',
  BOTH: 'BOTH'
} as const

export type tCalendarModes = keyof typeof CALENDAR_MODES

export type tViewModes = keyof typeof VIEW_MODES

export type tAppoinmentErrors = {
  title?: string
  name?: string
  phone?: string
}
