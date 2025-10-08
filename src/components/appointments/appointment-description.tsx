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

    const selectClasses = `
      w-full px-5 py-4 mt-1 text-scheduler-neutral-900 bg-white border border-scheduler-neutral-200 rounded-lg
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-scheduler-primary-500 focus:border-transparent
      hover:border-scheduler-neutral-300
      disabled:bg-scheduler-neutral-50 disabled:text-scheduler-neutral-500 disabled:cursor-not-allowed
      cursor-pointer min-h-[52px]
    `.trim().replace(/\s+/g, ' ')

    return (
      <div className="flex flex-col">
        <label className='font-medium text-scheduler-neutral-700 text-sm mb-1'>Motivo</label>
        <select
          name="appointmentReasons"
          id="appointmentReasons"
          onChange={onDescriptionChange}
          className={selectClasses}
          disabled={disabled}
          value={currentDescription}
        >
          <option value="">Seleziona un motivo...</option>
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
