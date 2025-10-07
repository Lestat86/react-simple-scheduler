import { tAppointment, tAppointmentPreset, tConfiguration, tDay, tTimeFormat } from '../../types/data-types'
import { isTimeExcluded, slotIsBooked, slotHasAvailableTime, getAppointmentsInSlot, shouldRenderAppointmentInSlot } from '../../utils/misc'
import AppointmentBlock from './appointment-block'

type Props = {
  currentDate: Date
  currentValue: tTimeFormat
  selectFun: (current: tTimeFormat, selectedDate: Date) => void
  configuration: tConfiguration
  appointments: tAppointment[]
  limitPastDates?: boolean
  hideAppointments?: boolean
  isMobile?: boolean
  appointmentDurations?: number[]
  appointmentPresets?: tAppointmentPreset[]
  onAppointmentClick?: (appointment: tAppointment) => void
}

const HourSlot = ({
  currentDate,
  currentValue,
  selectFun,
  configuration,
  appointments,
  limitPastDates,
  hideAppointments,
  isMobile,
  appointmentDurations,
  appointmentPresets,
  onAppointmentClick
}: Props) => {


  const currentDay = currentDate.getDay() as tDay

  const dayExcluded = configuration.dayExclusions?.includes(currentDay)
  const timeExcluded = isTimeExcluded(currentDay, currentValue, configuration.timeExclusions)

  const hasAppointment = slotIsBooked(appointments, currentDate, currentValue)
  const hasAvailableTime = slotHasAvailableTime(
    appointments, 
    currentDate, 
    currentValue, 
    appointmentDurations, 
    appointmentPresets
  )
  
  // Get all appointments in this slot for individual rendering
  const appointmentsInSlot = getAppointmentsInSlot(appointments, currentDate, currentValue)
  
  // Filter appointments to only render those that should be displayed in this slot
  // (to avoid duplicating cross-slot appointments)
  const appointmentsToRender = appointmentsInSlot.filter(appointment => 
    shouldRenderAppointmentInSlot(appointment, currentDate, currentValue)
  )

  const parsedDate = new Date(currentDate)
  parsedDate.setHours(currentValue.hours, currentValue.minutes)

  const pastExcluded = limitPastDates ? parsedDate < new Date() : false
  const isExcluded = dayExcluded || timeExcluded

  const pastExcludedClass = pastExcluded ? ' past-excluded' : ''
  const excludedClass = isExcluded ? ' excluded' : ''
  // Use partial booking class if has appointments but still has available time
  const bookedClass = hasAppointment && !hasAvailableTime ? ' booked' : ''
  const partialBookedClass = hasAppointment && hasAvailableTime ? ' partial-booked' : ''

  const className = `hour-slot${excludedClass}${bookedClass}${partialBookedClass}${pastExcludedClass}`

  const onClick = () => {
    if (isExcluded || pastExcluded) {
      return
    }

    // Block if no available time (fully booked)
    if (!hasAvailableTime) {
      return
    }

    // Block if hideAppointments is true and there are appointments but no available time
    if (hasAppointment && hideAppointments && !hasAvailableTime) {
      return
    }

    selectFun(currentValue, currentDate)
  }

  const handleAppointmentClick = (appointment: tAppointment) => {
    if (onAppointmentClick) {
      onAppointmentClick(appointment)
    }
  }

  if (isMobile) {
    return (
      <div className='p-2 w-full h-16 border border-gray-200 flex items-center justify-center shrink-0 relative mb-1'>
        <div className={className} onClick={onClick} />
        <span className='font-semibold text-xs'>
          {currentValue.hours}:00 - {currentValue.hours + 1}:00
        </span>
        {!hideAppointments && appointmentsToRender.map((appointment, index) => (
          <AppointmentBlock
            key={`${appointment.dateStart.getTime()}_${index}`}
            appointment={appointment}
            currentDate={currentDate}
            currentValue={currentValue}
            onClick={handleAppointmentClick}
            isMobile={true}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='p-4 w-20 h-20 border border-gray-200 flex items-center justify-center shrink-0 relative'>
      <div className={className} onClick={onClick} />
      <span className='font-semibold text-sm'>
        {currentValue.hours} - {currentValue.hours + 1}
      </span>
      {!hideAppointments && appointmentsToRender.map((appointment, index) => (
        <AppointmentBlock
          key={`${appointment.dateStart.getTime()}_${index}`}
          appointment={appointment}
          currentDate={currentDate}
          currentValue={currentValue}
          onClick={handleAppointmentClick}
          isMobile={false}
        />
      ))}
    </div>
  )
}

export default HourSlot
