import { createPortal } from 'react-dom'
import Modal from './modal-wrapper/modal'
import React from 'react'

type Props = {
  show: boolean
  children: React.ReactNode
  closeFun: () => void
  title?: string
  confirmButtonLabel?: string
  confirmFun?: () => void
  closeButtonLabel?: string
}

const ModalWrapper = ({ show,
  children,
  closeFun,
  title,
  confirmButtonLabel,
  confirmFun,
  closeButtonLabel }:Props) => {
  if (!show) {
    return null
  }

  return createPortal((
    <Modal closeFun={closeFun}
      title={title}
      confirmFun={confirmFun}
      confirmButtonLabel={confirmButtonLabel}
      closeButtonLabel={closeButtonLabel}
    >
      {children}
    </Modal>
  ), document.body)
}

export default ModalWrapper
