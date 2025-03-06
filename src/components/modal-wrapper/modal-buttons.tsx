import React from 'react'
import Button from '../button'
import { BUTTON_VARIANTS } from '../../constants/ui'
import { notNullishCheck } from '../../utils/misc'

type Props = {
  closeFun: () => void
  confirmButtonLabel?: string
  confirmFun?: () => void
  closeButtonLabel?: string
}

const ModalButtons = ({ closeFun,
  confirmButtonLabel,
  confirmFun,
  closeButtonLabel }: Props) => {
  const hasConfirmButton = notNullishCheck(confirmButtonLabel)
  const hasCloseButton = notNullishCheck(closeButtonLabel)

  const showButtons = hasConfirmButton || hasCloseButton

  if (!showButtons) {
    return null
  }

  return (
    <div className="flex justify-center items-center gap-4 px-2 py-1">
      {hasConfirmButton && (
        <Button variant={BUTTON_VARIANTS.PRIMARY}
          caption={confirmButtonLabel}
          onClick={confirmFun!} />
      )}
      {hasCloseButton && (
        <Button variant={BUTTON_VARIANTS.OUTLINED}
          caption={closeButtonLabel}
          onClick={closeFun} />
      )}
    </div>
  )
}

export default ModalButtons
