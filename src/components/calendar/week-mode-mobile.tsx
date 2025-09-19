import { useRef, useEffect } from 'react'
import { format, getDate, startOfDay } from 'date-fns'
import { it, enUS, de, fr, es } from 'date-fns/locale'
import { tAppointment, tConfiguration, tHours, tTimeFormat, tDay } from '../../exported-types'
import HourSlot from './hours-slot'

const localeMap = {
  'it': it,
  'en': enUS,
  'de': de,
  'fr': fr,
  'es': es
}

type Props = {
  appointments: tAppointment[]
  days: Date[]
  hoursSlots: tHours[]
  config: tConfiguration
  limitPastDates?: boolean
  selectSlot: (current: tTimeFormat, selectedDate: Date) => void
  dayClickFun?: (current: Date) => void
  currentDate?: Date
  locale?: string
}

const WeekModeMobile = ({
  appointments,
  days,
  hoursSlots,
  config,
  limitPastDates,
  selectSlot,
  dayClickFun,
  currentDate,
  locale
}: Props) => {
  let reorderedDays = days
  if (currentDate) {
    const currentDayIndex = days.findIndex(day => 
      day.toDateString() === currentDate.toDateString()
    )
    if (currentDayIndex > 0) {
      reorderedDays = [
        ...days.slice(currentDayIndex),
        ...days.slice(0, currentDayIndex)
      ]
    }
  }

  const headerRef = useRef<HTMLDivElement>(null)
  const slotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headerEl = headerRef.current
    const slotsEl = slotsRef.current
    
    if (!headerEl || !slotsEl) return

    const syncScroll = (source: HTMLElement, target: HTMLElement) => {
      target.scrollLeft = source.scrollLeft
    }

    const handleHeaderScroll = () => syncScroll(headerEl, slotsEl)
    const handleSlotsScroll = () => syncScroll(slotsEl, headerEl)

    headerEl.addEventListener('scroll', handleHeaderScroll)
    slotsEl.addEventListener('scroll', handleSlotsScroll)

    return () => {
      headerEl.removeEventListener('scroll', handleHeaderScroll)
      slotsEl.removeEventListener('scroll', handleSlotsScroll)
    }
  }, [])

  return (
    <div className="slots-container-mobile">
      <div 
        ref={headerRef}
        className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto header-scroll-hidden"
      >
        {
          reorderedDays.map((dayDate, idx) => {
            const dateLocale = localeMap[locale as keyof typeof localeMap] || localeMap['en']
            const dayName = format(dayDate, 'iii', { locale: dateLocale })
            const dayNumber = getDate(dayDate)
            
            const todayStart = startOfDay(new Date())
            const currentValueDayStart = startOfDay(dayDate)
            const isExcluded = config.dayExclusions?.includes(dayDate.getDay() as tDay)
            const pastExcluded = limitPastDates ? currentValueDayStart < todayStart : false
            const canClick = !isExcluded && !pastExcluded && dayClickFun
            
            const handleDayClick = () => {
              if (canClick) {
                dayClickFun!(dayDate)
              }
            }
            
            return (
              <div 
                key={`header_${idx}`}
                className={`min-w-[30%] flex-shrink-0 mx-[1.67%] text-center p-2 ${canClick ? 'cursor-pointer hover:bg-gray-100' : 'cursor-default'}`}
                onClick={handleDayClick}
              >
                <div className="text-xs font-medium text-gray-600 uppercase">{dayName}</div>
                <div className="text-sm font-bold">{dayNumber}</div>
              </div>
            )
          })
        }
      </div>
      
      <div ref={slotsRef} className="flex overflow-x-auto">
        {
          reorderedDays.map((dayDate, idx) => {
            return (
              <div className="week-day-mobile" key={`slots_${idx}`}>
                <div className="flex flex-col gap-1 min-h-0">
                  {
                    hoursSlots.map((currentHour) => {
                      const currentValue: tTimeFormat = {
                        hours: currentHour as tHours,
                        minutes: 0
                      }

                      return (
                        <HourSlot key={`${dayDate}_${currentHour}`}
                          currentDate={dayDate}
                          currentValue={currentValue}
                          selectFun={selectSlot}
                          configuration={config}
                          appointments={appointments}
                          limitPastDates={limitPastDates}
                          hideAppointments={false}
                          isMobile={true}
                        />
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default WeekModeMobile