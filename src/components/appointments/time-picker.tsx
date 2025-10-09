import React from 'react'
import { tHours, tMinutes } from '../../types/data-types'
import { format } from 'date-fns'
import { translate } from '../../locales/locales-fun'
import { tLocaleKeysMap } from '../../types/locale'
import { DEFAULT_SLOT_DURATION } from '../../constants/misc'

type Props = {
  selectedHour: tHours
  selectedMinute?: tMinutes
  selectedDate: Date
  canSelectTime?: boolean
  setStartHour: (hour: tHours) => void
  setStartMinute?: (minute: tMinutes) => void
  hoursSlot: tHours[]
  locale: string
  providedKeys?: tLocaleKeysMap
  duration?: number // duration in minutes
  smartStartTime?: Date // calculated optimal start time
  canSelectMinutes?: boolean // whether minute selection is enabled
  canSelectHour?: boolean // whether hour selection is enabled (default true)
  availableMinutes?: number[] // list of available minutes (for conflict validation)
  disabled?: boolean // whether the time picker is disabled (viewing existing appointment)
}

const TimePicker = ({ selectedHour,
  selectedMinute = 0,
  selectedDate,
  canSelectTime,
  setStartHour,
  setStartMinute,
  hoursSlot,
  locale,
  providedKeys,
  duration = DEFAULT_SLOT_DURATION,
  smartStartTime,
  canSelectMinutes = false,
  canSelectHour = true,
  availableMinutes = [],
  disabled = false }: Props) => {
  const formattedDate = format(selectedDate, 'dd/MM/yyyy')

  const timeFromLabel = translate('appointment.timeFrom', locale, providedKeys)
  const timeToLabel = translate('appointment.timeTo', locale, providedKeys)

  // Calculate end time based on duration
  const calculateEndTime = (
    startHour: tHours,
     startMinute: tMinutes, 
     durationMinutes: number, 
     smartTime?: Date
    ) => {
    const startTime = smartTime ? new Date(smartTime) : new Date()

    if (!smartTime) {
      startTime.setHours(startHour, startMinute, 0, 0)
    }

    const endTime = new Date(startTime.getTime() + durationMinutes * 60000)

    return format(endTime, 'HH:mm')
  }

  const endTime = calculateEndTime(selectedHour, selectedMinute, duration, smartStartTime)

  // Format smart start time if available
  const displayStartTime = smartStartTime
    ? format(smartStartTime, 'HH:mm')
    : `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`

  if (!canSelectTime) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-scheduler-neutral-50 rounded-lg border">
        <div className="flex items-center gap-2 text-sm text-scheduler-neutral-700">
          <svg className="w-4 h-4 text-scheduler-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-scheduler-neutral-600">{timeFromLabel}</span>
          <span className="px-3 py-2 bg-scheduler-primary-50 border border-scheduler-primary-200 rounded-lg text-scheduler-primary-800 font-medium">
            {displayStartTime}
          </span>
          <span className="text-scheduler-neutral-600">{timeToLabel}</span>
          <span className="px-3 py-2 bg-scheduler-primary-50 border border-scheduler-primary-200 rounded-lg text-scheduler-primary-800 font-medium">
            {endTime}
          </span>
        </div>
      </div>
    )
  }

  const onHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartHour(Number(e.target.value) as tHours)
  }

  const onMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setStartMinute) {
      setStartMinute(Number(e.target.value) as tMinutes)
    }
  }

  const selectClasses = `
    px-4 py-3 text-scheduler-neutral-900 bg-white border border-scheduler-neutral-200 rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-scheduler-primary-500 focus:border-transparent
    hover:border-scheduler-neutral-300
    cursor-pointer text-sm font-medium min-h-[44px]
  `.trim().replace(/\s+/g, ' ')

  // Generate minute options (0, 5, 10, 15, ... 55)
  // If availableMinutes is provided and not empty, use it; otherwise show all options
  let minuteOptions: tMinutes[]
  if (availableMinutes.length > 0) {
    minuteOptions = availableMinutes as tMinutes[]
  } else {
    minuteOptions = []
    for (let i = 0; i < 60; i += 5) {
      minuteOptions.push(i as tMinutes)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-scheduler-neutral-50 rounded-lg border">
      <div className="flex items-center gap-2 text-sm text-scheduler-neutral-700">
        <svg className="w-4 h-4 text-scheduler-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="font-medium">{formattedDate}</span>
      </div>
      <div className="flex items-center gap-2 text-sm flex-wrap">
        <span className="text-scheduler-neutral-600">{timeFromLabel}</span>
        <div className="flex items-center gap-1">
          {canSelectHour && !disabled ? (
            <select
              name="startingHour"
              id="startingHour"
              onChange={onHourChange}
              className={selectClasses}
              value={selectedHour}
            >
              {hoursSlot.map((hour) => (
                <option value={hour} key={hour}>{String(hour).padStart(2, '0')}</option>
              ))}
            </select>
          ) : (
            <span className="px-4 py-3 bg-scheduler-primary-50 border border-scheduler-primary-200 rounded-lg text-scheduler-primary-800 font-medium min-h-[44px] flex items-center">
              {String(selectedHour).padStart(2, '0')}
            </span>
          )}
          {canSelectMinutes && (
            <>
              <span className="text-scheduler-neutral-600 font-bold">:</span>
              {!disabled ? (
                <select
                  name="startingMinute"
                  id="startingMinute"
                  onChange={onMinuteChange}
                  className={selectClasses}
                  value={selectedMinute}
                >
                  {minuteOptions.map((minute) => (
                    <option value={minute} key={minute}>{String(minute).padStart(2, '0')}</option>
                  ))}
                </select>
              ) : (
                <span className="px-4 py-3 bg-scheduler-primary-50 border border-scheduler-primary-200 rounded-lg text-scheduler-primary-800 font-medium min-h-[44px] flex items-center">
                  {String(selectedMinute).padStart(2, '0')}
                </span>
              )}
            </>
          )}
        </div>
        <span className="text-scheduler-neutral-600">{timeToLabel} {endTime}</span>
      </div>
    </div>
  )
}

export default TimePicker
