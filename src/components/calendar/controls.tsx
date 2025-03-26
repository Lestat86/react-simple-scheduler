import { translate } from '../../locales/locales-fun'
import { tLocaleKeysMap } from '../../types/locale'
import Button from '../button'

type Props = {
  nextFun: () => void
  prevFun: () => void
  todayFun: () => void
  currentValue: string
  locale: string
  providedKeys?: tLocaleKeysMap
}

const CalendarControls = ({
  nextFun,
  prevFun,
  todayFun,
  currentValue,
  locale,
  providedKeys,
}: Props) => {
  const prevLabel = translate('controls.prev', locale, providedKeys)
  const nextLabel = translate('controls.next', locale, providedKeys)
  const todayLabel = translate('controls.today', locale, providedKeys)

  return (
    <div className='flex gap-3 border-gray-200 items-center justify-between'>
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
