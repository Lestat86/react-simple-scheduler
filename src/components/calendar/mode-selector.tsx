import Button from '../button'

type Props = {
  show: boolean
  options: {
    label: string
    changeFun: () => void
  }[]
}

const ModeSelector = ({ show, options }: Props) => {
  if(!show) {
    return null
  }

  return (
    <div className='flex gap-2 text-sm'>
      {options.map(({ label, changeFun }) => (
        <Button variant='PRIMARY' caption={label} onClick={changeFun} key={label} />
      ))}
    </div>
  )
}

export default ModeSelector
