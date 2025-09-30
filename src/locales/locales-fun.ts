import { DEFAULT_LOCALE } from "../constants/misc"
import { tLocaleKeysMap } from "../types/locale"
import { notNullishCheck } from "../utils/misc"

const defaultKeys: tLocaleKeysMap = {
  "errors.missingTitle": {
    "it": "Titolo obbligatorio",
    "en": "Title required",
    "de": "Titel erforderlich",
    "fr": "Titre obligatoire",
    "es": "Título obligatorio"
  },
  "errors.missingName": {
    "it": "Nome obbligatorio",
    "en": "Name required",
    "de": "Name erforderlich",
    "fr": "Nom obligatoire",
    "es": "Nombre obligatorio"
  },
  "errors.missingPhone": {
    "it": "Telefono obbligatorio",
    "en": "Phone required",
    "de": "Telefon erforderlich",
    "fr": "Téléphone obligatoire",
    "es": "Teléfono obligatorio"
  },
  "errors.fullyBooked": {
    "it": "Attenzione: nessuno slot disponibile per il giorno selezionato.",
    "en": "Error: no slots available for the selected day.",
    "de": "Achtung: keine verfügbaren Slots für den ausgewählten Tag.",
    "fr": "Attention: aucun créneau disponible pour le jour sélectionné.",
    "es": "Atención: no hay espacios disponibles para el día seleccionado."
  },
  "appointment.title": {
    "it": "Titolo",
    "en": "Title",
    "de": "Titel",
    "fr": "Titre",
    "es": "Título"
  },
  "appointment.name": {
    "it": "Nome",
    "en": "Name",
    "de": "Name",
    "fr": "Nom",
    "es": "Nombre"
  },
  "appointment.phone": {
    "it": "Telefono",
    "en": "Phone",
    "de": "Telefon",
    "fr": "Téléphone",
    "es": "Teléfono"
  },
  "appointment.email": {
    "it": "E-mail",
    "en": "Email",
    "de": "E-Mail",
    "fr": "E-mail",
    "es": "Correo electrónico"
  },
  "appointment.book": {
    "it": "Prenota",
    "en": "Book",
    "de": "Buchen",
    "fr": "Réserver",
    "es": "Reservar"
  },
  "appointment.cancel": {
    "it": "Annulla",
    "en": "Cancel",
    "de": "Abbrechen",
    "fr": "Annuler",
    "es": "Cancelar"
  },
  "appointment.description": {
    "it": "Descrizione",
    "en": "Description",
    "de": "Beschreibung",
    "fr": "Description",
    "es": "Descripción"
  },
  "appointment.timeFrom": {
    "it": "dalle ore",
    "en": "from",
    "de": "von",
    "fr": "de",
    "es": "desde las"
  },
  "appointment.timeTo": {
    "it": "alle",
    "en": "to",
    "de": "bis",
    "fr": "à",
    "es": "hasta las"
  },
  "appointment.dateAndTime": {
    "it": "Data e ora",
    "en": "Date and time",
    "de": "Datum und Uhrzeit",
    "fr": "Date et heure",
    "es": "Fecha y hora"
  },
  "controls.prev": {
    "it": "Indietro",
    "en": "Back",
    "de": "Zurück",
    "fr": "Précédent",
    "es": "Atrás"
  },
  "controls.next": {
    "it": "Avanti",
    "en": "Next",
    "de": "Weiter",
    "fr": "Suivant",
    "es": "Siguiente"
  },
  "controls.today": {
    "it": "Oggi",
    "en": "Today",
    "de": "Heute",
    "fr": "Aujourd’hui",
    "es": "Hoy"
  },
  "general.month": {
    "it": "Mese",
    "en": "Month",
    "de": "Monat",
    "fr": "Mois",
    "es": "Mes"
  },
  "general.week": {
    "it": "Settimana",
    "en": "Week",
    "de": "Woche",
    "fr": "Semaine",
    "es": "Semana"
  },
  "general.appointment": {
    "it": "Appuntamento",
    "en": "Appointment",
    "de": "Termin",
    "fr": "Rendez-vous",
    "es": "Cita"
  },
"appointment.sendConfirmation": {
    "it": "Mandami un promemoria",
    "en": "Send me a reminder",
    "de": "",
    "fr": "",
    "es": ""
  },
  "appointment.privacyText":{
    "it": "Informativa privacy",
    "en": "Privacy terms",
    "de": "",
    "fr": "",
    "es": ""
  }
} as const

export const getUserLocale = () => {
  const userLocale = navigator.language

  if (!notNullishCheck(userLocale)) {
    return DEFAULT_LOCALE
  }

  const tokens = userLocale.split('-')

  return tokens[0]
}

export const translate = (key: string,
  locale: string,
  providedKeys?: tLocaleKeysMap
) => {
  const matchingDefault = defaultKeys[key]?.[locale]
  const matchingProvided = providedKeys?.[key]?.[locale]

  return matchingProvided ?? matchingDefault ?? key
}
