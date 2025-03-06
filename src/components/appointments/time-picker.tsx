import React from 'react'
import { tHours } from '../../types/data-types'
import { format } from 'date-fns'

type Props = {
  selectedHour: tHours
  selectedDate: Date
  canSelectTime?: boolean
  setStartHour: (hour: tHours) => void
  hoursSlot: tHours[]
}

const TimePicker = ({ selectedHour,
  selectedDate,
  canSelectTime,
  setStartHour,
  hoursSlot }: Props) => {
  const formattedDate = format(selectedDate, 'dd/MM/yyyy')

  if (!canSelectTime) {
    return (
      <span>{formattedDate} dalle ore {selectedHour} alle {selectedHour + 1}</span>
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
      <span>alle {selectedHour + 1}</span>
    </div>
  )
}

export default TimePicker
