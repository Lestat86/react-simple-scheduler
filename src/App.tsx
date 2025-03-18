import { useState } from 'react'
import CalendarContainer from './components/calendar-container'
import { tAppointment } from './types/data-types'
import { exampleAppointments, exampleConfig } from './utils/mocks'

import './styles.css'

function App() {
  const [appointments, setAppointments] = useState<tAppointment[]>(exampleAppointments)

  const addAppointmentFun = (appointment: tAppointment) => {
    console.log('New apppointment', appointment)

    const updated = [...appointments, appointment]

    setAppointments(updated)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <span className="text-xl">pippo</span>
      <CalendarContainer
        appointments={appointments}
        addAppointmentFun={addAppointmentFun}
        config={exampleConfig}
        limitPastDates
      />
    </div>
  )
}

export default App
