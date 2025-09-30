import { useState } from "react"
import Button from "../button"
import { tLocaleKeysMap } from "../../types/locale"
import { translate } from "../../locales/locales-fun"
import ModalWrapper from "../modal-wrapper"

type Props = {
  privacyDoc: string
  locale: string
  providedKeys?: tLocaleKeysMap
}

const PrivacyText = ({privacyDoc, locale, providedKeys}: Props) => {
  const [open, setOpen] = useState(false)

  const showPrivacyText = translate('appointment.privacyText', locale, providedKeys)

  const openFun = () => setOpen(true)
  const closeFun = () => setOpen(false)
  if(!open) {
    return (
      <Button caption={showPrivacyText} onClick={openFun} />
    )
  }

  return (
  <ModalWrapper show={open}
  closeFun={closeFun}
    title={showPrivacyText}>
      <div className="overflow-y-auto max-h-[30vh]">
  <pre className="whitespace-pre-wrap">
  {privacyDoc}
  </pre>
      </div>
  </ModalWrapper>
  )
}

export default PrivacyText
