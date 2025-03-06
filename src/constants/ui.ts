import { format } from "date-fns"
import { it } from "date-fns/locale"
import { getEnclosingWeekDays } from "../utils/dates"

export const BUTTON_VARIANTS = {
  PRIMARY: 'PRIMARY',
  OUTLINED: 'OUTLINED',
  DANGER: 'DANGER',
} as const

export const DAYS = getEnclosingWeekDays(new Date()).map((current) => format(current, 'iii', { locale: it }))
