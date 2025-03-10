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
import HourSlot from './calendar/hours-slot'
import { tAppointment, tConfiguration, tHours, tTimeFormat } from '../types/data-types'
import AddAppointment from './appointments/add-appointment'
import ModalWrapper from './modal-wrapper'

type Props = {
  appointments: tAppointment[]
  addAppointmentFun: (appointment: tAppointment) => void
  config: tConfiguration
  appointmentReasons?: string[]
  limitPastDates?: boolean
}

const CalendarContainer = ({
  appointments,
  addAppointmentFun,
  config,
  appointmentReasons,
  limitPastDates
}: Props) => {
  const now = new Date()
  const [currentDate, setCurrentDate] = useState(now)
  const [currentSlot, setCurrentSlot] = useState<tHours | undefined>()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
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

  const goToTodayFun = () => {
    setCurrentDate(now)
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

  const selectSlot = (current: tTimeFormat, selectedDate: Date) => {
    setCurrentSlot(current.hours)
    setSelectedDate(selectedDate)
  }

  const resetSelectedSlot = () => {
    setCurrentSlot(undefined)
    setSelectedDate(undefined)
  }

  const selectDay = (selectedDate: Date) => {
    setSelectedDate(selectedDate)
  }

  const internalAddAppointmentFun = (appointment: tAppointment) => {
    addAppointmentFun(appointment)

    resetSelectedSlot()
  }

  const exclusionsSet = new Set<number>()

  config.timeExclusions?.forEach((current) => {
    const { exclusionStart, exclusionEnd } = current

    exclusionsSet.add(exclusionStart.hours)
    exclusionsSet.add(exclusionEnd.hours)
  })

  const sortedExclusions = [...exclusionsSet].sort().filter((current) => current !== 0)

  const minExclusion = sortedExclusions[sortedExclusions.length - 1]
  const maxExclusion = sortedExclusions[0]

  const hoursSlots: tHours[] = ([...Array(24).keys()] as tHours[])
    .filter((current) => current >= minExclusion && current <= maxExclusion)

  const isWeekMode = calendarMode === CALENDAR_MODES.WEEK
  const slotSelected = currentSlot !== undefined
  const daySelected = selectedDate !== undefined

  const showAppointmentModal = isWeekMode ? slotSelected : daySelected

  return (
    <div className='flex flex-col p-4 gap-2 h-[90vh]'>
      <ModalWrapper show={showAppointmentModal}
        closeFun={resetSelectedSlot}
        title="Appuntamento">
        <AddAppointment
          startHour={currentSlot}
          addAppointmentFun={internalAddAppointmentFun}
          selectedDate={selectedDate!}
          hoursSlot={hoursSlots}
          appointments={appointments}
          appointmentReasons={appointmentReasons}
          limitPastDates={limitPastDates}
        />
      </ModalWrapper>
      <ModeSelector options={modeOptions} />
      <CalendarControls prevFun={prevFun}
        nextFun={nextFun}
        todayFun={goToTodayFun}
        currentValue={monthName}
      />
      <CalendarHeader />
      <div className={className}>
        <PlaceHolderDayComponent placeHolderDays={startPlaceHoldersDays} />
        {
          days.map((current, idx) => (
            <DayComponent
              key={`day_${idx}`}
              isWeek={isWeekMode}
              currentValue={current}
              dayClickFun={selectDay}
              configuration={config}
              appointments={appointments}
              limitPastDates={limitPastDates}
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
                        selectFun={selectSlot}
                        configuration={config}
                        appointments={appointments}
                        limitPastDates={limitPastDates}
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
