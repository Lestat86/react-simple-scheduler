import { format } from 'date-fns'
import { it, enUS, de, fr, es } from 'date-fns/locale'
import { getEnclosingWeekDays } from '../../utils/dates'

const localeMap = {
  'it': it,
  'en': enUS,
  'de': de,
  'fr': fr,
  'es': es
}

type Props = {
  vertical?: boolean
  locale?: string
}

const CalendarHeader = ({ vertical, locale }: Props) => {
  const verticalClass = vertical ? ' vertical' : ''
  const className = `calendar-header${verticalClass}`
  
  const dateLocale = localeMap[locale as keyof typeof localeMap] || localeMap['en']
  const days = getEnclosingWeekDays(new Date()).map((current) => format(current, 'iii', { locale: dateLocale }))

  return (
    <div className={className}>
      {days.map((current) => (
        <span key={current} className='font-semibold capitalize'>
          {current}
        </span>
      ))}
    </div>
  )
}

export default CalendarHeader
