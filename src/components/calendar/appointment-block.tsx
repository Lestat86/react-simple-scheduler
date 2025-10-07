import { tAppointment, tTimeFormat } from '../../types/data-types'
import { calculateCrossSlotHeight } from '../../utils/misc'

type Props = {
  appointment: tAppointment
  currentDate: Date
  currentValue: tTimeFormat
  onClick: (appointment: tAppointment) => void
  isMobile?: boolean
}

const AppointmentBlock = ({
  appointment,
  currentDate,
  currentValue,
  onClick,
  isMobile
}: Props) => {
  // Calculate the position and size within the hour slot
  const slotStart = new Date(currentDate)
  slotStart.setHours(currentValue.hours, 0, 0, 0)
  
  // Calculate the appointment's start position within the first slot
  const appointmentStart = Math.max(appointment.dateStart.getTime(), slotStart.getTime())
  const slotDuration = 60 * 60 * 1000 // 1 hour in ms
  
  // Calculate percentage positions for vertical layout (height-based)
  const startOffset = ((appointmentStart - slotStart.getTime()) / slotDuration) * 100
  
  // For cross-slot appointments, calculate total height spanning multiple slots
  const { height } = calculateCrossSlotHeight(appointment)
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent slot click
    onClick(appointment)
  }
  
  const appointmentTitle = appointment.title || 'Appuntamento'
  
  if (isMobile) {
    return (
      <div
        className="appointment-block-mobile"
        style={{
          top: `${startOffset}%`,
          height: `${height}%`,
        }}
        onClick={handleClick}
        title={appointmentTitle}
      >
        <div className="appointment-block-content-mobile">
          <span className="appointment-title-mobile">{appointmentTitle}</span>
        </div>
      </div>
    )
  }
  
  return (
    <div
      className="appointment-block"
      style={{
        top: `${startOffset}%`,
        height: `${height}%`,
      }}
      onClick={handleClick}
      title={appointmentTitle}
    >
      <div className="appointment-block-content">
        <span className="appointment-title">{appointmentTitle}</span>
      </div>
    </div>
  )
}

export default AppointmentBlock