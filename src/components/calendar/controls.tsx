import { translate } from '../../locales/locales-fun'
import { tLocaleKeysMap } from '../../types/locale'
import Button from '../button'
import useMobile from '../../hooks/use-mobile'

type Props = {
  nextFun: () => void
  prevFun: () => void
  todayFun: () => void
  currentValue: string
  locale: string
  providedKeys?: tLocaleKeysMap
  modeSelector?: React.ReactNode
}

const CalendarControls = ({
  nextFun,
  prevFun,
  todayFun,
  currentValue,
  locale,
  providedKeys,
  modeSelector
}: Props) => {
  const isMobile = useMobile()
  const prevLabel = translate('controls.prev', locale, providedKeys)
  const nextLabel = translate('controls.next', locale, providedKeys)
  const todayLabel = translate('controls.today', locale, providedKeys)

  if (isMobile) {
    return (
      <div className='calendar-controls-mobile'>
        <div className='calendar-controls-date'>
          {currentValue}
        </div>
        {modeSelector && (
          <div className='calendar-controls-modes'>
            {modeSelector}
          </div>
        )}
        <div className='calendar-controls-navigation'>
          <Button variant='PRIMARY' caption={prevLabel} onClick={prevFun} />
          <Button variant='PRIMARY' caption={todayLabel} onClick={todayFun} />
          <Button variant='PRIMARY' caption={nextLabel} onClick={nextFun} />
        </div>
      </div>
    )
  }

  return (
    <div className='flex gap-3 border-scheduler-neutral-200 items-center justify-between'>
      <div className="flex gap-3 items-center text-sm">
        <Button variant='PRIMARY' caption={prevLabel} onClick={prevFun} />
        <Button variant='PRIMARY' caption={todayLabel} onClick={todayFun} />
        <Button variant='PRIMARY' caption={nextLabel} onClick={nextFun} />
      </div>
      <span className='font-semibold'>{currentValue}</span>
    </div>
  )
}

export default CalendarControls
