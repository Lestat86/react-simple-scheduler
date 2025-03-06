import React from 'react'
import { notNullishCheck } from '../../utils/misc'
import InputWithError from '../input-with-error'

type Props = {
  appointmentReasons?: string[]
  currentDescription: string
  setDescription: (value: string) => void
  disabled: boolean
}

const AppointmentDescription = ({
  appointmentReasons,
  currentDescription,
  setDescription,
  disabled
}: Props) => {
  const hasFixedReasons = notNullishCheck(appointmentReasons) && appointmentReasons.length > 0
  if (hasFixedReasons) {
    const onDescriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDescription(e.target.value)
    }

    return (
      <div className="flex flex-col">
        <span className='font-semibold'>Reason</span>
        <select name="appointmentReasons" id="appointmentReasons" onChange={onDescriptionChange}>
          {appointmentReasons!.map((current) => (
            <option value={current} key={current}>{current}</option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <InputWithError<string> value={currentDescription}
      onChangeCB={setDescription}
      label="Description"
      disabled={disabled}
    />
  )
}

export default AppointmentDescription 
