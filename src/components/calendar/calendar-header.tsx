import { DAYS } from '../../constants/ui'

type Props = {
  vertical?: boolean
}

const CalendarHeader = ({ vertical }: Props) => {
  const verticalClass = vertical ? ' vertical' : ''
  const className = `calendar-header${verticalClass}`

  return (
    <div className={className}>
      {DAYS.map((current) => (
        <span key={current} className='font-semibold capitalize'>
          {current}
        </span>
      ))}
    </div>
  )
}

export default CalendarHeader
