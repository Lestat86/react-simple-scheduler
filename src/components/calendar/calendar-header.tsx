import { DAYS } from '../../constants/ui'


const CalendarHeader = () => {
  return (
    <div className='flex justify-around'>
      {DAYS.map((current) => (
        <span key={current} className='font-semibold capitalize'>
          {current}
        </span>
      ))}
    </div>
  )
}

export default CalendarHeader
