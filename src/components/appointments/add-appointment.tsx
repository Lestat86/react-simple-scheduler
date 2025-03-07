import React, { useState } from 'react'
import { tAppointment, tHours, tTimeFormat } from '../../types/data-types'
import Button from '../button'
import { BUTTON_VARIANTS } from '../../constants/ui'
import TimePicker from './time-picker'
import { findMatchingAppointment, slotIsBooked } from '../../utils/misc'
import InputWithError from '../input-with-error'
import { tAppoinmentErrors } from '../../types/misc'
import AppointmentDescription from './appointment-description'

type Props = {
  startHour?: tHours
  addAppointmentFun: (appointment: tAppointment) => void
  selectedDate: Date
  hoursSlot: tHours[]
  appointments: tAppointment[]
  appointmentReasons?: string[]
  limitPastDates?: boolean
}

const AddAppointment = ({
  startHour,
  addAppointmentFun,
  selectedDate,
  hoursSlot,
  appointments,
  appointmentReasons,
  limitPastDates
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

  const defaultHour = startHour ?? hoursSlot[0]
  const [selectedHour, setSelectedHour] = useState<tHours>(defaultHour)
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState(defaultDescription)
  const [name, setName] = useState(defaultName)
  const [phone, setPhone] = useState(defaultPhone)
  const [email, setEmail] = useState(defaultEmail)


  const [errors, setErrors] = useState<tAppoinmentErrors>({})

  const onClick = () => {
    let hasErrors = false
    const _errors: tAppoinmentErrors = {}

    if (title.length === 0) {
      _errors.title = 'Titolo obbligatorio'

      hasErrors = true
    }

    if (name.length === 0) {
      _errors.name = 'Nome obbligatorio'

      hasErrors = true
    }

    if (phone.length === 0) {
      _errors.phone = 'Phone obbligatorio'

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


  const availableSlots = canSelectTime ? hoursSlot.filter((current) => {
    const currentTimeFormat: tTimeFormat = {
      hours: current,
      minutes: 0
    }

    if (limitPastDates) {
      const parsedDate = new Date()

      parsedDate.setHours(current, 0)

      const isBefore = parsedDate < new Date()

      if (isBefore) {
        return false
      }
    }

    return !slotIsBooked(appointments, selectedDate, currentTimeFormat)
  }) : hoursSlot

  return (
    <div className='flex flex-col items-start justify-center gap-4 mt-4'>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <InputWithError<string> value={title}
            onChangeCB={setTitle}
            label="Title"
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
            label="Name"
            disabled={hasAppointment}
            errorMessage={errors.name}
          />
          <InputWithError<string> value={phone}
            onChangeCB={setPhone}
            label="Phone"
            disabled={hasAppointment}
            errorMessage={errors.phone}
          />
          <InputWithError<string> value={email}
            onChangeCB={setEmail}
            label="E-mail"
            disabled={hasAppointment}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className='font-semibold'>Data e ora</span>
        <TimePicker selectedHour={selectedHour}
          selectedDate={selectedDate}
          setStartHour={setSelectedHour}
          canSelectTime={canSelectTime}
          hoursSlot={availableSlots}
        />
      </div>
      {!hasAppointment &&
        <div className="flex justify-end w-full">
          <Button variant={BUTTON_VARIANTS.PRIMARY}
            caption='Prenota'
            onClick={onClick} />
        </div>}
    </div>
  )
}

export default AddAppointment
