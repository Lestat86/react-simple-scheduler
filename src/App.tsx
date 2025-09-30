import { useState } from 'react'
import CalendarContainer from './components/calendar-container'
import { tAppointment } from './types/data-types'
import { exampleAppointments, exampleConfig } from './utils/mocks'

import './styles.css'
import Button from './components/button'
import { VIEW_MODES } from './types/misc'

const loremipsum =  `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque, risus id sagittis hendrerit, turpis diam scelerisque augue, in imperdiet dolor metus ac turpis. Duis lobortis justo quis nisi consequat, id malesuada enim vehicula. Cras fringilla blandit risus eu mattis. Sed vel quam vel mauris pharetra varius non in quam. Aenean laoreet sed eros in posuere. In rutrum mi ut neque dictum tristique. Pellentesque pharetra, mi sed dignissim ornare, mi libero tincidunt dui, a commodo risus libero eu enim. Donec massa nibh, ultrices quis odio ut, fringilla ultrices risus.

Morbi vel arcu vel augue scelerisque gravida. Curabitur eu tincidunt velit. Curabitur elementum et turpis id ornare. Donec id quam eget tellus congue blandit. Maecenas fringilla nulla vitae massa lacinia, ut finibus augue faucibus. Etiam laoreet est vitae leo feugiat, quis posuere leo viverra. Mauris convallis placerat tortor ac tempor. Phasellus arcu odio, accumsan et tempor eget, fringilla at magna. Nulla congue nec est a venenatis. Nunc auctor, turpis vel cursus faucibus, velit augue pellentesque elit, in finibus lorem felis non lorem. Quisque quam nulla, aliquam eget scelerisque ut, volutpat in nulla. Duis vehicula lectus sit amet ipsum blandit, non finibus tortor luctus. Maecenas ultricies lorem nec tempus maximus. Maecenas dictum mollis ante, at luctus erat ultrices vel. Ut massa neque, imperdiet sit amet feugiat at, commodo ac arcu.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In fermentum sodales lectus, quis iaculis metus cursus ac. Donec tincidunt, lorem at pharetra eleifend, ante orci elementum tellus, a accumsan urna metus sed dui. Nam dui risus, convallis eget pellentesque eget, elementum et est. Curabitur euismod lectus eget tortor maximus, nec luctus neque tempus. Nulla vel pellentesque risus. Nullam lacinia lectus sit amet risus finibus, ac egestas sapien fringilla. Nam urna massa, dapibus sit amet diam vel, vehicula convallis lectus.

Fusce eleifend sem felis, pharetra tincidunt dolor auctor non. In sit amet leo non mauris congue semper. Mauris justo odio, ornare quis nunc eget, tempor ornare orci. Sed sodales sed justo et ultrices. Integer a urna ac odio suscipit pretium. Etiam sagittis iaculis felis. Mauris ipsum est, convallis vel congue nec, cursus aliquam lacus. Sed eget hendrerit felis, nec laoreet odio. Ut aliquam ex in ante mollis, a feugiat libero molestie. Vivamus varius, lectus sed rhoncus cursus, risus turpis fringilla massa, eu sodales turpis risus ac magna.

Morbi vehicula lectus non ornare imperdiet. Proin tincidunt mauris diam, sed tempus libero cursus nec. Etiam consectetur est libero, in scelerisque quam ornare id. Integer dui sem, consectetur ut accumsan vitae, pellentesque pretium dolor. Aenean vel nibh posuere, congue turpis nec, gravida lorem. Duis facilisis justo quis tortor tincidunt, a placerat velit mattis. Integer non neque cursus, scelerisque enim ut, imperdiet mauris.
`
function App() {
  const [vertical, setVertical] = useState(false)
  const [appointments, setAppointments] = useState<tAppointment[]>(exampleAppointments)

  const addAppointmentFun = (appointment: tAppointment) => {
    console.log('New apppointment', appointment)

    const updated = [...appointments, appointment]

    setAppointments(updated)
  }

  const toggleVertical = () => setVertical(!vertical)
  const selectedDirection = vertical ? 'Horizontal' : 'Vertical'

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="flex gap-3">
        <span className="text-xl">pippo</span>
        <Button onClick={toggleVertical} caption={selectedDirection} />
      </div>
      <CalendarContainer
        appointments={appointments}
        addAppointmentFun={addAppointmentFun}
        config={exampleConfig}
        limitPastDates
        vertical={vertical}
        showReminderCheck={true}
        privacyDoc={loremipsum}
        showEmail={true}
        viewModes={VIEW_MODES.BOTH}
      />
    </div>
  )
}

export default App
