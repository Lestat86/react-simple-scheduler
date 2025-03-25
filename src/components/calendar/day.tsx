import { getDate, startOfDay } from 'date-fns'
import { tAppointment, tConfiguration, tDay } from '../../types/data-types'
import { dayHasAppointments } from '../../utils/misc'

type Props = {
  isWeek?: boolean
  currentValue: Date
  dayClickFun: (current: Date) => void
  configuration: tConfiguration
  appointments: tAppointment[]
  limitPastDates?: boolean
  vertical?: boolean
}

const DayComponent = ({ isWeek,
  currentValue,
  dayClickFun,
  configuration,
  appointments,
  limitPastDates,
  vertical
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

  const classNameInner = `calendar-day${excludedClass}${bookedClass}${pastExcludedClass}`
  const classNameOuter = isWeek ? `day-component week${verticalClass}` : 'day-component'

  const onClick = () => {
    if (isExcluded || pastExcluded) {
      return
    }

    dayClickFun(currentValue)
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
