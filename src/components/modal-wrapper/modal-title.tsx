import { notNullishCheck } from '../../utils/misc'

type Props = {
  title?: string
}

const ModalTitle = ({ title }: Props) => {
  if (notNullishCheck(title)) {
    return (
      <div className="py-1">
        <span className="font-semibold text-2xl">
          {title}
        </span>
      </div>
    )
  }

  return null
}

export default ModalTitle
