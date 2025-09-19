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
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">{timeFromLabel}</span>
          <span className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-medium">
            {selectedHour}:00
          </span>
          <span className="text-gray-600">{timeToLabel}</span>
          <span className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-medium">
            {selectedHour + 1}:00
          </span>
        </div>
      </div>
    )
  }

  const onHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartHour(Number(e.target.value) as tHours)
  }


  const selectClasses = `
    px-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    hover:border-gray-300
    cursor-pointer text-sm font-medium min-h-[44px]
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="font-medium">{formattedDate}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">{timeFromLabel}</span>
        <select 
          name="startingHour" 
          id="startingHour" 
          onChange={onHourChange}
          className={selectClasses}
          value={selectedHour}
        >
          {hoursSlot.map((hour) => (
            <option value={hour} key={hour}>{hour}:00</option>
          ))}
        </select>
        <span className="text-gray-600">{timeToLabel} {selectedHour + 1}:00</span>
      </div>
    </div>
  )
}

export default TimePicker
