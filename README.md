# React tiny simple scheduler

React-tiny-simple-scheduler is, as it's name states, a tiny and simple scheduler written in react
\
The library is written keeping the overhead at its minimum, focusing on functionality and lightweight.

## Aim of the library

The aim of this library is to provide a scheduler that allows to book appointments, on a fixated schedule.
\
The user can provide bookable hours on a repeated level (e.g. weekly working hours), pointly exclusions (e.g. local holiday) and so on.

## How to use it

The library can be imported and used in any react project with (e.g)

> npm i react-tiny-simple-scheduler
> yarn add react-tiny-simple-scheduler

Here is the list of the props:

- `appointments`: This is the list of the appointments which will be shown in the scheduler;
- `addAppointmentFun`: The function that will be called upon a new appointment request. It takes a single param, of type `tAppointment`;
- `config`: The config for the scheduler. More on this in the "config" section;
- `appointmentReasons`: Optional prop, array of strings. If provided, when an appointment is made there willl be a
  dropwdown with the list provided, instead of a free text, for the appointment reason field;
- `limitPastDates`: Optional prop, boolean. If provided, it blocks the "past" (i.e. anything before the current time)
  from being booked;
- `locale`: Optional prop, string. If provided, the scheduler will be shown with the corresponding locale
  (given that the corresponding keys are provided or supported as well) instead of auto-localizing upon the user
  browser choice;
- `providedKeys`: Optional prop, of type `tLocaleKeysMap`. If provided, overrides the default localized keys.
  More on this in the "locale" section;
- `hideAppointments`: Optional prop, boolean. If provided it will hide appointments details, i.e. for a scheduler that has
  manager / normal user role distinctions.

## Scheduler config

The configuration for the scheduler contains two subfields, both optional - although, in the real world it is very unlinkely
to have them both empty.\
The subfields are:

- `timeExclusions`: an array of type `tTimeExclusion` (more on this later);
- `dayExclusions`: an array of type `tDay` (same).

### Day exclusions

This is the easiest one to explain - a `tDay` is basically a number from 0 to 6, specifing the matching js-like weekday.\
If provided, the scheduler will exclude all day-slots, of all weeks, of all months.\
e.g. setting

> dayExclusions: [0, 6]

excludes all weekends.

### Time exclusions

Any given element of the `timeExclusions` object has three subfields:

- `days`: an optional array of `tDay` - if provided, specifies ;
- `exclusionStart`: an optional array of `tTimeFormat`;
- `exclusionEnd`: an optional array of `tTimeFormat`;

A `tTimeFormat` object contains two subfields:

- `hours`, of type `tHours` (i.e. a number between 0-24);
- `minutes`, of type `tSeconds` (i.e. a number between 0-60)

So: the rationale between all this types is to be able to define "exclusion time interval", i.e. time when the scheduler has to block
all appointments.\
These time intervals can be repeated among various days (e.g. all mondays from 2 to 5 pm).\
With this kind of configuration, it should be possible to specificy all the opening / closing hours of pretty mnuch all cases.

## Data formats

The data formats are mostly described in the previous section; The only one left is the appointment, which is fairly easy:

```
tAppointment = {
  dateStart: Date
  dateEnd: Date
  title: string
  name: string
  phone: string
  email?: string
  description?: string
}

```

As stated previously, the `description` is either a free text or could be one from the user-provided list.

## Localization

The scheduler is already localized in italian, english, german, french and spanish.\
It is faily easy to add new locales or override the default values - in order to so, the user only need to pass the
`providedKeys` prop.\
This is an object on two level nesting, e.g.

```
providedKeys: {
 'textkey': {
    "it": "italian translation",
    "en": "english translation"
    ...
  }
}
```

The keys used are the following:

```
errors.missingTitle
errors.missingName
errors.missingPho
errors.fullyBooked
appointment.title
appointment.name
appointment.phone
appointment.email
appointment.book
appointment.description
appointment.timeFrom
appointment.timeTo
appointment.dateAndTime
controls.prev
controls.next
controls.today
general.month
general.week
general.appointment
```

Guessing what goes where is fairly simple, but a sure-way to do is to force a non-supported locale (with the `locale` prop):
doing so will display the key in place of it's translation.

## Styling

Default styling is provided in the library, and can be imported as

> import 'react-tiny-simple-scheduler/styles.css';

To override any styles, the user must simply write the related css and include it, _after_ the library css.\
Here is a list of the classes and their corresponding use:

`.button-primary`\
`.button-outlined`\
`.button-danger`\
Pretty self explanatory

`.month-view`\
The grid showing the month-days

`.week-view`\
The grid showinf the week elements

`.calendar-day`\
A day element in the month view\
`&.excluded`\
A subcase of calendar-day, a day which is excluded from booking via the config\
`&.past-excluded`\
A subcase of calendar-day, a day which is excluded from booking - but because the option `limitPastDates` is turned on.\
`&.booked`\
A subcase of calendar-day, a day that has at least one appointment booked.\

`.hour-slot`\
A hour-slot element of any weekday\
`&.excluded`\
A subcase of hour-slot, a slot which is excluded from booking via the config\
`&.past-excluded`\
A subcase of hour-slot, a slot which is excluded from booking - but because the option `limitPastDates` is turned on.\
`&.booked`\
A subcase of hour-slot, a slot that has at least one appointment booked.\

`.day-component`\
The slot (or day) component style
`&.week`\
A subcase of day-component, when the visualization is in week mode.

## Typescript

The library is fully typed. Its types could be used via

> import { tAppointment } from 'react-tiny-simple-scheduler/types'

## Future works

As the library grows, the next step will be:

- Possibility to define custom interval duration via the config (atm it is 1h, not changeable);
- "Native" mobile optimization - right now it can be done with custom css;
- The possibility to force a specific view mode via a prop (e.g. month or week view);
- Add daily view
- The possibility to add exclusions based on specific dates (e.g. 12/12/2025, from 3 to 4pm)
