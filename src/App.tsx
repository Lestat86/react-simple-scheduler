import { useState } from 'react'
import CalendarContainer from './components/calendar-container'
import { tAppointment } from './types/data-types'
import { exampleAppointments, exampleConfig } from './utils/mocks'

import './styles.css'
import Button from './components/button'

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
      />
    </div>
  )
}

export default App
