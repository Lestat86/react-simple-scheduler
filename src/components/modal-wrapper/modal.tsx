import React from 'react'
import ModalTitle from './modal-title'
import ModalButtons from './modal-buttons'
import useMobile from '../../hooks/use-mobile'

function stopEvent(event: React.MouseEvent<HTMLElement>) {
  event.stopPropagation()
}

type Props = {
  children: React.ReactNode
  closeFun: () => void
  title?: string
  confirmButtonLabel?: string
  confirmFun?: () => void
  closeButtonLabel?: string
}

const Modal = ({ children,
  closeFun,
  title,
  confirmButtonLabel,
  confirmFun,
  closeButtonLabel }: Props) => {
  const isMobile = useMobile()
  
  const modalClass = isMobile 
    ? "bg-white p-4 z-40 w-[95vw] max-h-[85vh] overflow-y-auto mx-2 rounded-lg"
    : "bg-white p-4 z-40 max-w-[90vw] max-h-[90vh] overflow-hidden m-4"
  
  const containerClass = "absolute top-0 left-0 bottom-0 right-0 bg-gray-900/75 flex justify-center items-center z-30"

  return (
    <div className={containerClass} onClick={closeFun}>
      <div className={modalClass} onClick={stopEvent}>
        <ModalTitle title={title} />
        {children}
        <ModalButtons closeFun={closeFun}
          closeButtonLabel={closeButtonLabel}
          confirmButtonLabel={confirmButtonLabel}
          confirmFun={confirmFun} />
      </div>
    </div>
  )
}

export default Modal
