export const numberFormat = (number) => {
  const formatNumber = new Intl.NumberFormat('id-ID')
  return formatNumber.format(number)
}

export const formatDate = (date, locale) => {
  const d = new Date(date)
  const dtf = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
  const format = dtf.formatToParts(d)
  const dateFormat = []
  if (format.length > 5) {
    dateFormat.push(
      `${format[4].value}${format[5].value}`,
      `${format[2].value}${format[3].value}`,
    )
  } else {
    format.forEach((item) => {
      if (item.type === 'day') {
        dateFormat.push(item.value)
      } else if (item.type === 'month') {
        dateFormat.push(item.value)
      }
    })
  }
  return dateFormat.join(' ')
  // return date;
}

export const countryCode = {
  ar: 'Arabic',
  bg: 'Bulgarian',
  ca: 'Catalan',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  enGb: 'English (United Kingdom)',
  enUS: 'English (United States)',
  eo: 'Esperanto',
  es: 'Spanish',
  et: 'Estonian',
  faIR: 'Persian',
  fi: 'Finnish',
  fil: 'Filipino',
  fr: 'French',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  ja: 'Japanese',
  ka: 'Georgian',
  ko: 'Korean',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mk: 'Macedonian',
  nb: 'Norwegian Bokmål',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sl: 'Slovenian',
  sr: 'Serbian',
  sv: 'Swedish',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  vi: 'Vietnamese',
  zhCN: 'Chinese Simplified',
  zhTW: 'Chinese Traditional',
}

export function getCurrDayAndMonth(locale) {
  var today = locale.format('LL')
  return today
    .replace(locale.format('YYYY'), '') // remove year
    .replace(/\s\s+/g, ' ') // remove double spaces, if any
    .trim() // remove spaces from the start and the end
    .replace(/[рг]\./, '') // remove year letter from RU/UK locales
    .replace(/de$/, '') // remove year prefix from PT
    .replace(/b\.$/, '') // remove year prefix from SE
    .trim() // remove spaces from the start and the end
    .replace(/,$/g, '') // remove comma from the end
}
