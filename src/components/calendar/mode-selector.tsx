import Button from '../button'

type Props = {
  options: {
    label: string
    changeFun: () => void
  }[]
}

const ModeSelector = ({ options }: Props) => {
  return (
    <div className='flex gap-2'>
      {options.map(({ label, changeFun }) => (
        <Button variant='PRIMARY' caption={label} onClick={changeFun} key={label} />
      ))}
    </div>
  )
}

export default ModeSelector
