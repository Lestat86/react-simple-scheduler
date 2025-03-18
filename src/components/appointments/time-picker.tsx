import React from 'react'
import { tHours } from '../../types/data-types'
import { format } from 'date-fns'
import { translate } from '../../locales/locales-fun'
import { tLocaleKeysMap } from '../../types/locale'

type Props = {
  selectedHour: tHours
  selectedDate: Date
  canSelectTime?: boolean
  setStartHour: (hour: tHours) => void
  hoursSlot: tHours[]
  locale: string
  providedKeys?: tLocaleKeysMap
}

const TimePicker = ({ selectedHour,
  selectedDate,
  canSelectTime,
  setStartHour,
  hoursSlot,
  locale,
  providedKeys }: Props) => {
  const formattedDate = format(selectedDate, 'dd/MM/yyyy')

  const timeFromLabel = translate('appointment.timeFrom', locale, providedKeys)
  const timeToLabel = translate('appointment.timeFrom', locale, providedKeys)

  if (!canSelectTime) {
    return (
      <span>{formattedDate} {timeFromLabel}  {selectedHour} {timeToLabel} {selectedHour + 1}</span>
    )
  }

  const onHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartHour(Number(e.target.value) as tHours)
  }


  return (
    <div className="flex gap-1">
      <span>{formattedDate} dalle ore</span>
      <select name="startingHour" id="startingHour" onChange={onHourChange}>
        {hoursSlot.map((hour) => (
          <option value={hour} key={hour}>{hour}</option>
        ))}
      </select>
      <span>{timeToLabel} {selectedHour + 1}</span>
    </div>
  )
}

export default TimePicker
