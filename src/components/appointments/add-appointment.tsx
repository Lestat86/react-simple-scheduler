import { useState } from 'react'
import { tAppointment, tAppointmentPreset, tConfiguration, tDay, tHours, tTimeFormat } from '../../types/data-types'
import Button from '../button'
import { BUTTON_VARIANTS } from '../../constants/ui'
import TimePicker from './time-picker'
import { findMatchingAppointment, isTimeExcluded, notNullishCheck, slotHasAvailableTime, findNextAvailableTime, getMinimumSlotDuration } from '../../utils/misc'
import InputWithError from '../input-with-error'
import { tAppoinmentErrors } from '../../types/misc'
import AppointmentDescription from './appointment-description'
import { translate } from '../../locales/locales-fun'
import { tLocaleKeysMap } from '../../types/locale'
import PrivacyText from './privacy-text'
import { DEFAULT_SLOT_DURATION } from '../../constants/misc'

type Props = {
  startHour?: tHours
  addAppointmentFun: (appointment: tAppointment) => void
  selectedDate: Date
  hoursSlot: tHours[]
  appointments: tAppointment[]
  appointmentReasons?: string[]
  config: tConfiguration
  limitPastDates?: boolean
  locale: string
  providedKeys?: tLocaleKeysMap
  isMobile?: boolean
  closeFun?: () => void
  showReminderCheck?: boolean
  privacyDoc?: string
  showEmail?: boolean
  appointmentDurations?: number[]
  appointmentPresets?: tAppointmentPreset[]
  selectedAppointment?: tAppointment // Specific appointment to view/edit
  forceNewAppointment?: boolean // Force new appointment creation, don't search for existing
}

const AddAppointment = ({
  startHour,
  addAppointmentFun,
  selectedDate,
  hoursSlot,
  appointments,
  appointmentReasons,
  config,
  limitPastDates,
  locale,
  providedKeys,
  isMobile,
  closeFun,
  showReminderCheck,
  privacyDoc,
  showEmail,
  appointmentDurations,
  appointmentPresets,
  selectedAppointment,
  forceNewAppointment
}: Props) => {
  const canSelectTime = startHour === undefined

  let defaultTitle = ''
  let defaultDescription = ''
  let defaultName = ''
  let defaultPhone = ''
  let defaultEmail = ''
  let hasAppointment = false
  let existingAppointmentDuration = DEFAULT_SLOT_DURATION

  // Use selectedAppointment if provided
  // Only auto-search for appointment when we can't select time (week mode with fixed slot)
  // AND we're not forcing a new appointment creation
  const appointmentToView = selectedAppointment || 
    (!canSelectTime && !forceNewAppointment ? findMatchingAppointment(appointments, selectedDate, {
      hours: startHour,
      minutes: 0
    }) : undefined)

  if (appointmentToView) {
    hasAppointment = true
    defaultTitle = appointmentToView.title ?? ''
    defaultDescription = appointmentToView.description ?? ''
    defaultName = appointmentToView.name ?? ''
    defaultPhone = appointmentToView.phone ?? ''
    defaultEmail = appointmentToView.email ?? ''
    
    // Calculate existing appointment duration in minutes
    const durationMs = appointmentToView.dateEnd.getTime() - 
      appointmentToView.dateStart.getTime()
    existingAppointmentDuration = Math.round(durationMs / 60000)
  }

  // Calculate smart start time for new appointments
  let smartStartTime: Date | undefined
  if (!hasAppointment && startHour !== undefined) {
    const minDuration = getMinimumSlotDuration(appointmentDurations, appointmentPresets)
    const currentTimeFormat: tTimeFormat = {
      hours: startHour,
      minutes: 0
    }
    smartStartTime = findNextAvailableTime(
      appointments, 
      selectedDate, 
      currentTimeFormat, 
      minDuration
    )
  }


  const availableSlots = canSelectTime ? hoursSlot.filter((current) => {
    const currentTimeFormat: tTimeFormat = {
      hours: current,
      minutes: 0
    }

    const now = new Date()

    const isPastDay = selectedDate < now

    if (limitPastDates && isPastDay) {
      const parsedDate = new Date(selectedDate)

      parsedDate.setHours(current, 0)

      const isBefore = parsedDate < now

      if (isBefore) {
        return false
      }
    }

    const currentDay = selectedDate.getDay() as tDay

    const isExcluded = isTimeExcluded(currentDay, currentTimeFormat, config.timeExclusions)

    if (isExcluded) {
      return false
    }

    return slotHasAvailableTime(
      appointments, 
      selectedDate, 
      currentTimeFormat, 
      appointmentDurations, 
      appointmentPresets
    )
  }) : hoursSlot

  const defaultHour = startHour ?? availableSlots[0]
  const [selectedHour, setSelectedHour] = useState<tHours>(defaultHour)
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState(defaultDescription)
  const [name, setName] = useState(defaultName)
  const [phone, setPhone] = useState(defaultPhone)
  const [email, setEmail] = useState(defaultEmail)
  const [sendReminder, setSendReminder] = useState(false)
  // Set initial duration based on available options or existing appointment
  const getInitialDuration = () => {
    // If viewing an existing appointment, use its duration
    if (hasAppointment) {
      return existingAppointmentDuration
    }
    
    if (appointmentPresets && appointmentPresets.length > 0) {
      return appointmentPresets[0].duration
    }

    if (appointmentDurations && appointmentDurations.length > 0) {
      return appointmentDurations[0]
    }

    return DEFAULT_SLOT_DURATION
  }
  
  const [selectedDuration, setSelectedDuration] = useState<number>(getInitialDuration())

  const [errors, setErrors] = useState<tAppoinmentErrors>({})

  const fullyBookedLabel = translate('errors.fullyBooked', locale, providedKeys)

  if (availableSlots.length == 0) {
    // full day has been booked
    return (
      <div className='flex flex-col items-start justify-center gap-4 mt-4 p-2'>
        <span className='text-xl'>
          {fullyBookedLabel}
        </span>
      </div>
    )
  }

  const onClick = () => {
    let hasErrors = false
    const _errors: tAppoinmentErrors = {}

    if (title.length === 0) {
      _errors.title = translate('errors.missingTitle', locale, providedKeys)

      hasErrors = true
    }

    if (name.length === 0) {
      _errors.name = translate('errors.missingName', locale, providedKeys)

      hasErrors = true
    }

    if (phone.length === 0) {
      _errors.phone = translate('errors.missingPhone', locale, providedKeys)

      hasErrors = true
    }

    if (hasErrors) {
      setErrors(_errors)

      return
    }

    // Use smart start time if available, otherwise use the selected hour
    const startDate = smartStartTime ? new Date(smartStartTime) : new Date(selectedDate)
    if (!smartStartTime) {
      startDate.setHours(selectedHour, 0)
    }
    
    const endDate = new Date(startDate)
    // selectedDuration is in minutes
    endDate.setTime(startDate.getTime() + selectedDuration * 60000)

    // Check for appointment conflicts with custom duration
    const hasConflict = appointments.some((appointment) => {
      const existingStart = appointment.dateStart.getTime()
      const existingEnd = appointment.dateEnd.getTime()
      const newStart = startDate.getTime()
      const newEnd = endDate.getTime()

      // Check if new appointment overlaps with existing appointment
      return (newStart < existingEnd && newEnd > existingStart)
    })

    if (hasConflict) {
      _errors.title = translate('errors.appointmentConflict', locale, providedKeys)
      hasErrors = true
    }

    if (hasErrors) {
      setErrors(_errors)
      return
    }
    const newAppointment: tAppointment = {
      title,
      name,
      phone,
      email,
      description,
      dateStart: startDate,
      dateEnd: endDate
    }

    addAppointmentFun(newAppointment)
  }

  const titleLabel = translate('appointment.title', locale, providedKeys)
  const nameLabel = translate('appointment.name', locale, providedKeys)
  const phoneLabel = translate('appointment.phone', locale, providedKeys)
  const emailLabel = translate('appointment.email', locale, providedKeys)
  const dateAndTimeLabel = translate('appointment.dateAndTime', locale, providedKeys)
  const bookLabel = translate('appointment.book', locale, providedKeys)
  const cancelLabel = translate('appointment.cancel', locale, providedKeys)
  const sendConfirmationLabel = translate('appointment.sendConfirmation', locale, providedKeys)
  const durationLabel = translate('appointment.duration', locale, providedKeys)

  const formClass = isMobile ? 'appointment-form-mobile' : 'flex gap-4'

  const hasDurations = appointmentDurations && appointmentDurations.length > 0
  const hasPresets = appointmentPresets && appointmentPresets.length > 0
  const showDurationSelector = hasDurations || hasPresets

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value, 10)
    setSelectedDuration(duration)
  }

  const handlePresetChange = (value: string) => {
    const preset = appointmentPresets?.find(p => p.name === value)

    if (preset) {
      setSelectedDuration(preset.duration)
    }
  }

  const onChange = () => {
    const updated = !sendReminder

    setSendReminder(updated)
  }

  const showPrivacyDoc = notNullishCheck(privacyDoc) && !hasAppointment
  const showReminderToggle = showReminderCheck && !hasAppointment

  return (
    <div className='flex flex-col items-start justify-center gap-4 mt-4'>
      <div className={formClass}>
        <div className="flex flex-col gap-4">
          <InputWithError<string> value={title}
            onChangeCB={setTitle}
            label={titleLabel}
            disabled={hasAppointment}
            errorMessage={errors.title}
          />
          <AppointmentDescription
            appointmentReasons={appointmentReasons}
            currentDescription={description}
            setDescription={setDescription}
            disabled={hasAppointment} />
        </div>
        <div className="flex flex-col gap-4">
          <InputWithError<string> value={name}
            onChangeCB={setName}
            label={nameLabel}
            disabled={hasAppointment}
            errorMessage={errors.name}
          />
          <InputWithError<string> value={phone}
            onChangeCB={setPhone}
            label={phoneLabel}
            disabled={hasAppointment}
            errorMessage={errors.phone}
          />
          {
            showEmail && 
          <InputWithError<string> value={email}
            onChangeCB={setEmail}
            label={emailLabel}
            disabled={hasAppointment}
          />
          }
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className='font-semibold'>{dateAndTimeLabel}</span>
        <TimePicker selectedHour={selectedHour}
          selectedDate={selectedDate}
          setStartHour={setSelectedHour}
          canSelectTime={canSelectTime}
          hoursSlot={availableSlots}
          locale={locale}
          providedKeys={providedKeys}
          duration={selectedDuration}
          smartStartTime={smartStartTime}
        />
      </div>
      {showDurationSelector && (
        <div className="flex flex-col gap-2 w-full">
          <span className='font-semibold'>{durationLabel}</span>
          <select
            value={hasPresets
              ? appointmentPresets?.find(p => p.duration === selectedDuration)?.name || ''
              : selectedDuration.toString()}
            onChange={(e) => hasPresets
              ? handlePresetChange(e.target.value)
              : handleDurationChange(e.target.value)}
            className="p-2 border border-scheduler-neutral-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-scheduler-primary-500"
            disabled={hasAppointment}
          >
            {hasPresets ? (
              appointmentPresets?.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name}
                </option>
              ))
            ) : (
              appointmentDurations?.map((duration) => (
                <option key={duration} value={duration.toString()}>
                  {duration} {translate('general.minutes', locale, providedKeys)}
                </option>
              ))
            )}
          </select>
        </div>
      )}
      {showReminderToggle && 
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input type="checkbox" 
              checked={sendReminder} 
              onChange={onChange} 
              className="sr-only peer" />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-maincolor dark:peer-focus:ring-maincolor rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-maincolor dark:peer-checked:bg-maincolor"></div>        
          <span className="ms-3 font-medium">
            {sendConfirmationLabel}
          </span>
      </label>
      }
      {  
        showPrivacyDoc &&  
          <PrivacyText 
            privacyDoc={privacyDoc} 
            locale={locale}
            providedKeys={providedKeys}
          />
      }
      {!hasAppointment &&
        <div className="flex justify-end w-full gap-2">
          {closeFun && (
            <Button variant={BUTTON_VARIANTS.OUTLINED}
              caption={cancelLabel}
              onClick={closeFun} />
          )}
          <Button variant={BUTTON_VARIANTS.PRIMARY}
            caption={bookLabel}
            onClick={onClick} />
        </div>
      }
    </div>
  )
}

export default AddAppointment
