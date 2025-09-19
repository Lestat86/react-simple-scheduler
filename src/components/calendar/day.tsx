import { getDate, startOfDay, format } from 'date-fns'
import { it, enUS, de, fr, es } from 'date-fns/locale'
import { tAppointment, tConfiguration, tDay } from '../../types/data-types'
import { dayHasAppointments } from '../../utils/misc'

const localeMap = {
  'it': it,
  'en': enUS,
  'de': de,
  'fr': fr,
  'es': es
}

type Props = {
  isWeek?: boolean
  currentValue: Date
  dayClickFun: (current: Date) => void
  configuration: tConfiguration
  appointments: tAppointment[]
  limitPastDates?: boolean
  vertical?: boolean
  isMobile?: boolean
  localeToUse: string
}

const DayComponent = ({ isWeek,
  currentValue,
  dayClickFun,
  configuration,
  appointments,
  limitPastDates,
  vertical,
  isMobile,
  localeToUse
}: Props) => {
  const todayStart = startOfDay(new Date())
  const currentValueDayStart = startOfDay(currentValue)

  const isExcluded = configuration.dayExclusions?.includes(currentValue.getDay() as tDay)

  const pastExcluded = limitPastDates ? currentValueDayStart < todayStart : false

  const hasAppointment = dayHasAppointments(appointments, currentValue)

  const pastExcludedClass = pastExcluded ? ' past-excluded' : ''
  const excludedClass = isExcluded ? ' excluded' : ''
  const bookedClass = hasAppointment ? ' booked' : ''

  const verticalClass = vertical ? ' vertical' : ''

  let classNameInner = ''
  if (isMobile && isWeek) {
    classNameInner = `calendar-day${excludedClass}${bookedClass}${pastExcludedClass}`
  } else {
    classNameInner = `calendar-day${excludedClass}${bookedClass}${pastExcludedClass}`
  }
  
  let classNameOuter = ''
  if (isMobile && isWeek) {
    classNameOuter = 'week-day-mobile'
  } else if (isMobile && !isWeek) {
    classNameOuter = 'month-day-mobile'
  } else if (isWeek) {
    classNameOuter = `day-component week${verticalClass}`
  } else {
    classNameOuter = 'day-component'
  }

  const onClick = () => {
    if (isExcluded || pastExcluded) {
      return
    }

    dayClickFun(currentValue)
  }

  if (isMobile && !isWeek) {
    // Mobile month view - vertical list format
    const dateLocale = localeMap[localeToUse as keyof typeof localeMap] || localeMap['en']
    const dayName = format(currentValue, 'EEEE', { locale: dateLocale })
    const dayNumber = getDate(currentValue)
    
    let statusIndicatorClass = 'w-6 h-6 rounded-full border-2 '
    if (isExcluded) {
      statusIndicatorClass += 'bg-red-200 border-red-400'
    } else if (hasAppointment) {
      statusIndicatorClass += 'bg-blue-200 border-blue-400'
    } else if (pastExcluded) {
      statusIndicatorClass += 'bg-gray-200 border-gray-400'
    } else {
      statusIndicatorClass += 'bg-green-100 border-green-400'
    }
    
    return (
      <div className={classNameOuter} onClick={onClick}>
        <div className="month-day-info">
          <span className="month-day-name">{dayName}</span>
          <span className="month-day-number">{dayNumber}</span>
        </div>
        <div className={statusIndicatorClass} />
      </div>
    )
  }

  if (isMobile && isWeek) {
    return (
      <div className={classNameOuter}>
        <div className="p-2 w-full h-16 border border-gray-200 flex items-center justify-center relative">
          <div className={classNameInner} onClick={onClick} />
          <span className='font-bold text-sm'>
            {getDate(currentValue)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={classNameOuter}>
      <div className={classNameInner} onClick={onClick} />
      <span className='font-bold text-xl'>
        {getDate(currentValue)}
      </span>
    </div>
  )
}

export default DayComponent
