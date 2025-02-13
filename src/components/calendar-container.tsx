import React, { useEffect, useState } from 'react'
import { CALENDAR_MODES, tCalendarModes } from '../types/misc'
import {
  getEnclosingMonthDays,
  getEnclosingWeekDays,
  getMonthEndPlaceHolderDays,
  getMonthStartPlaceHolderDays
} from '../utils/dates'
import DayComponent from './calendar/day'
import CalendarControls from './calendar/controls'
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays
} from 'date-fns'
import { it } from 'date-fns/locale'
import ModeSelector from './calendar/mode-selector'
import PlaceHolderDayComponent from './calendar/placeholder-days'
import CalendarHeader from './calendar/calendar-header'
import { appointments, exampleConfig } from '../utils/mocks'
import HourSlot from './calendar/hours-slot'
import { tHours, tTimeFormat } from '../types/data-types'

type Props = {
  isEditor?: boolean
}

const CalendarContainer = ({ isEditor }: Props) => {
  console.log('isEditor', isEditor)
  const now = new Date()
  const [currentDate, setCurrentDate] = useState(now)
  const [calendarMode, setCalendarMode] = useState<tCalendarModes>(CALENDAR_MODES.WEEK)
  const [days, setDays] = useState<Date[]>([])
  const [startPlaceHoldersDays, setStartPlaceHoldersDays] = useState(0)
  const [endPlaceHoldersDays, setEndPlaceHoldersDays] = useState(0)

  useEffect(() => {
    let _days: Date[] = []
    let _startPlaceHoldersDays = 0
    let _endPlaceHoldersDays = 0
    switch (calendarMode) {
      case CALENDAR_MODES.WEEK:
        _days = getEnclosingWeekDays(currentDate)
        break

      case CALENDAR_MODES.MONTH:
        _days = getEnclosingMonthDays(currentDate)
        _startPlaceHoldersDays = getMonthStartPlaceHolderDays(currentDate)
        _endPlaceHoldersDays = getMonthEndPlaceHolderDays(currentDate)
        break

      // no default
    }

    setDays(_days)
    setStartPlaceHoldersDays(_startPlaceHoldersDays)
    setEndPlaceHoldersDays(_endPlaceHoldersDays)
  }, [calendarMode, currentDate])

  if (days.length === 0) {
    // TODO: handle this case better
    return null
  }

  const nextMonth = () => {
    const monthEnd = endOfMonth(currentDate)
    const firstNextDay = addDays(monthEnd, 1)

    setCurrentDate(firstNextDay)
  }

  const prevMonth = () => {
    const monthStart = startOfMonth(currentDate)
    const firstNextDay = subDays(monthStart, 1)

    setCurrentDate(firstNextDay)
  }

  const nextWeek = () => {
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
    const firstNextDay = addDays(weekEnd, 1)

    setCurrentDate(firstNextDay)
  }

  const prevWeek = () => {
    const weekStart = startOfWeek(currentDate)
    const firstNextDay = subDays(weekStart, 1)

    setCurrentDate(firstNextDay)
  }

  const prevFun = () => {
    switch (calendarMode) {
      case CALENDAR_MODES.WEEK:
        prevWeek()
        break

      case CALENDAR_MODES.MONTH:
        prevMonth()
        break

      // no default
    }
  }

  const nextFun = () => {
    switch (calendarMode) {
      case CALENDAR_MODES.WEEK:
        nextWeek()
        break

      case CALENDAR_MODES.MONTH:
        nextMonth()
        break

      // no default
    }
  }

  const setMonthMode = () => setCalendarMode(CALENDAR_MODES.MONTH)
  const setWeekMode = () => setCalendarMode(CALENDAR_MODES.WEEK)

  const monthName = format(currentDate, 'LLLL - yyyy', { locale: it })

  const modeOptions = [
    {
      label: "Mese",
      changeFun: setMonthMode
    },
    {
      label: "Settimana",
      changeFun: setWeekMode
    },
  ]

  let className = ''
  switch (calendarMode) {
    case CALENDAR_MODES.WEEK:
      className = 'week-view'
      break

    case CALENDAR_MODES.MONTH:
      className = 'month-view'
      break

    // no default
  }

  const exclusionsSet = new Set<number>()

  exampleConfig.timeExclusions?.forEach((current) => {
    const { exclusionStart, exclusionEnd } = current

    exclusionsSet.add(exclusionStart.hours)
    exclusionsSet.add(exclusionEnd.hours)
  })

  const sortedExclusions = [...exclusionsSet].sort().filter((current) => current !== 0)

  const min = sortedExclusions[sortedExclusions.length - 1]
  const max = sortedExclusions[0]


  const hoursSlots = [...Array(24).keys()].filter((current) => current >= min && current <= max)

  const isWeekMode = calendarMode === CALENDAR_MODES.WEEK

  return (
    <div className='flex flex-col p-4 gap-2 h-[90vh]'>
      <ModeSelector options={modeOptions} />
      <CalendarControls prevFun={prevFun} nextFun={nextFun} currentValue={monthName} />
      <CalendarHeader />
      <div className={className}>
        <PlaceHolderDayComponent placeHolderDays={startPlaceHoldersDays} />
        {
          days.map((current, idx) => (
            <DayComponent
              key={`day_${idx}`}
              isWeek={isWeekMode}
              currentValue={current}
              dayClickFun={console.log}
              configuration={exampleConfig}
            />
          ))
        }
        <PlaceHolderDayComponent placeHolderDays={endPlaceHoldersDays} />
      </div>
      {isWeekMode && <div className='flex gap-3 overflow-y-auto'>
        <div className="flex gap-2">
          {
            days.map((currentDate, idx) => (
              <div className="flex flex-col gap-1" key={`day_${idx}`}>
                {
                  hoursSlots.map((currentHour) => {
                    const currentValue: tTimeFormat = {
                      hours: currentHour as tHours,
                      minutes: 0
                    }

                    return (
                      <HourSlot key={`${currentDate}_${currentHour}`}
                        currentDate={currentDate}
                        currentValue={currentValue}
                        selectFun={console.log}
                        configuration={exampleConfig}
                        appointments={appointments}
                      />
                    )
                  })
                }
              </div>
            ))
          }
        </div>
      </div>}
    </div >
  )
}

export default CalendarContainer
