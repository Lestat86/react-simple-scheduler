import { format } from "date-fns"
import { it } from "date-fns/locale"
import { getWeekDays } from "../utils/get-week-days"

export const BUTTON_VARIANTS = {
  PRIMARY: 'PRIMARY',
  OUTLINED: 'OUTLINED',
  DANGER: 'DANGER',
} as const

export const DAYS = getWeekDays(new Date()).map((current) => format(current, 'iii', { locale: it }))
