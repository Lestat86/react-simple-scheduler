import { useState } from 'react'
import { tAppointment, tHours, tTimeFormat } from '../../types/data-types'
import Button from '../button'
import { BUTTON_VARIANTS } from '../../constants/ui'
import TimePicker from './time-picker'
import { findMatchingAppointment, slotIsBooked } from '../../utils/misc'
import InputWithError from '../input-with-error'
import { tAppoinmentErrors } from '../../types/misc'
import AppointmentDescription from './appointment-description'
import { translate } from '../../locales/locales-fun'
import { tLocaleKeysMap } from '../../types/locale'

type Props = {
  startHour?: tHours
  addAppointmentFun: (appointment: tAppointment) => void
  selectedDate: Date
  hoursSlot: tHours[]
  appointments: tAppointment[]
  appointmentReasons?: string[]
  limitPastDates?: boolean
  locale: string
  providedKeys?: tLocaleKeysMap
}

const AddAppointment = ({
  startHour,
  addAppointmentFun,
  selectedDate,
  hoursSlot,
  appointments,
  appointmentReasons,
  limitPastDates,
  locale,
  providedKeys
}: Props) => {
  const canSelectTime = startHour === undefined

  let defaultTitle = ''
  let defaultDescription = ''
  let defaultName = ''
  let defaultPhone = ''
  let defaultEmail = ''
  let hasAppointment = false

  if (!canSelectTime) {
    const currentTimeFormat: tTimeFormat = {
      hours: startHour,
      minutes: 0
    }

    const matchingAppointment = findMatchingAppointment(appointments,
      selectedDate,
      currentTimeFormat)

    if (matchingAppointment !== undefined) {
      hasAppointment = true
      defaultTitle = matchingAppointment.title ?? ''
      defaultDescription = matchingAppointment.description ?? ''
      defaultName = matchingAppointment.name ?? ''
      defaultPhone = matchingAppointment.phone ?? ''
      defaultEmail = matchingAppointment.email ?? ''
    }
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

    return !slotIsBooked(appointments, selectedDate, currentTimeFormat)
  }) : hoursSlot

  const defaultHour = startHour ?? availableSlots[0]
  const [selectedHour, setSelectedHour] = useState<tHours>(defaultHour)
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState(defaultDescription)
  const [name, setName] = useState(defaultName)
  const [phone, setPhone] = useState(defaultPhone)
  const [email, setEmail] = useState(defaultEmail)


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

    const endHour = selectedHour + 1
    const startDate = new Date(selectedDate)
    const endDate = new Date(selectedDate)

    startDate.setHours(selectedHour, 0)
    endDate.setHours(endHour, 0)
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

  return (
    <div className='flex flex-col items-start justify-center gap-4 mt-4'>
      <div className="flex gap-4">
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
          <InputWithError<string> value={email}
            onChangeCB={setEmail}
            label={emailLabel}
            disabled={hasAppointment}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className='font-semibold'>{dateAndTimeLabel}</span>
        <TimePicker selectedHour={selectedHour}
          selectedDate={selectedDate}
          setStartHour={setSelectedHour}
          canSelectTime={canSelectTime}
          hoursSlot={availableSlots}
          locale={locale}
          providedKeys={providedKeys}
        />
      </div>
      {!hasAppointment &&
        <div className="flex justify-end w-full">
          <Button variant={BUTTON_VARIANTS.PRIMARY}
            caption={bookLabel}
            onClick={onClick} />
        </div>}
    </div>
  )
}

export default AddAppointment
