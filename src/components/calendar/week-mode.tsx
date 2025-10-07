import { tAppointment, tAppointmentPreset, tConfiguration, tHours, tTimeFormat } from '../../exported-types'
import HourSlot from './hours-slot'
import WeekModeMobile from './week-mode-mobile'

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
  isMobile?: boolean
  dayClickFun?: (current: Date) => void
  currentDate?: Date
  appointmentDurations?: number[]
  appointmentPresets?: tAppointmentPreset[]
  onAppointmentClick?: (appointment: tAppointment) => void
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
  isMobile,
  dayClickFun,
  currentDate,
  locale,
  appointmentDurations,
  appointmentPresets,
  onAppointmentClick
}: Props) => {
  if (!show) {
    return null
  }

  const verticalPart = vertical ? ' vertical' : ''
  const slotsClass = `container${verticalPart}`
  const containerClass = `slots${verticalPart}`

  if (isMobile) {
    return (
      <WeekModeMobile
        appointments={appointments}
        days={days}
        hoursSlots={hoursSlots}
        config={config}
        limitPastDates={limitPastDates}
        selectSlot={selectSlot}
        dayClickFun={dayClickFun}
        currentDate={currentDate}
        locale={locale}
        appointmentDurations={appointmentDurations}
        appointmentPresets={appointmentPresets}
        onAppointmentClick={onAppointmentClick}
      />
    )
  }

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
                      appointmentDurations={appointmentDurations}
                      appointmentPresets={appointmentPresets}
                      onAppointmentClick={onAppointmentClick}
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
