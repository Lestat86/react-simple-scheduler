import { tAppointment, tConfiguration, tHours, tTimeFormat } from '../../exported-types'
import HourSlot from './hours-slot'

type Props = {
  show: boolean
  appointments: tAppointment[]
  days: Date[]
  hoursSlots: tHours[]
  config: tConfiguration
  limitPastDates?: boolean
  locale?: string
  hideAppointments?: boolean
  vertical?: boolean
  selectSlot: (current: tTimeFormat, selectedDate: Date) => void
}

const WeekMode = ({
  show,
  appointments,
  days,
  hoursSlots,
  config,
  limitPastDates,
  hideAppointments,
  vertical,
  selectSlot,
}: Props) => {
  if (!show) {
    return null
  }

  const verticalPart = vertical ? ' vertical' : ''
  const slotsClass = `container${verticalPart}`
  const containerClass = `slots${verticalPart}`

  return (
    <div className="slots-container">
      <div className={slotsClass}>
        {
          days.map((currentDate, idx) => (
            <div className={containerClass} key={`day_${idx}`}>
              {
                hoursSlots.map((currentHour) => {
                  const currentValue: tTimeFormat = {
                    hours: currentHour as tHours,
                    minutes: 0
                  }

                  return (
                    <HourSlot key={`${currentDate}_${currentHour}`}
                      currentDate={currentDate}
                      currentValue={currentValue}
                      selectFun={selectSlot}
                      configuration={config}
                      appointments={appointments}
                      limitPastDates={limitPastDates}
                      hideAppointments={hideAppointments}
                    />
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </div>)
}

export default WeekMode
