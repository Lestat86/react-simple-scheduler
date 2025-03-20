import { tAppointment, tConfiguration, tDay, tTimeExclusion } from "../types/data-types"

// no weekends!
const dayExclusions: tDay[] = [0,6]

// 9 - 18
const startsAt9: tTimeExclusion = {
  days: [1, 2, 3, 4, 5],
  exclusionStart: {
    hours: 0,
    minutes: 0
  },
  exclusionEnd: {
    hours: 9,
    minutes: 0
  }
}

const endsAt18: tTimeExclusion = {
  days: [1, 2, 3, 4, 5],
  exclusionStart: {
    hours: 18,
    minutes: 0
  },
  exclusionEnd: {
    hours: 0,
    minutes: 0
  }
}

const timeExclusions = [
  startsAt9, endsAt18
]

export const exampleConfig: tConfiguration = {
  dayExclusions,
  timeExclusions
}

export const exampleAppointments: tAppointment[] = [
  {
    title: 'Event 1',
    description: 'Descr',
    dateStart: new Date('2025-02-12T15:00:00Z'),
    dateEnd: new Date('2025-02-12T17:00:00Z'),
    name: 'Test name',
    phone: '12345'
  },
  {
    title: 'Event 2',
    description: 'Descr',
    dateStart: new Date('2025-02-13T15:00:00Z'),
    dateEnd: new Date('2025-02-13T16:00:00Z'),
    name: 'Test name 2',
    phone: '12345'
  }
]
