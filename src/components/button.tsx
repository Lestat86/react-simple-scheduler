import { BUTTON_VARIANTS } from '../constants/ui'
import { tButtonVariants } from '../types/ui'

type Props = {
  caption: string
  onClick: () => void
  variant?: tButtonVariants
}

const Button = ({ caption, onClick, variant = BUTTON_VARIANTS.PRIMARY }: Props) => {
  let className
  switch (variant) {
    case BUTTON_VARIANTS.PRIMARY:
      className = 'button-primary'
      break

    case BUTTON_VARIANTS.OUTLINED:
      className = 'button-outlined'
      break

    case BUTTON_VARIANTS.DANGER:
      className = 'button-danger'
      break

    // TODO: use the never type here to prevent bugs
    // no default
  }

  return (
    <button className={className} onClick={onClick}>
      {caption}
    </button>
  )
}

export default Button
