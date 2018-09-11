const locale = navigator.language || 'en-us'
const localStringSupported = !!(typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function')

function componentize (value, definitions, maxComponents) {
	// Determine the time components.
  let components = {}
  let componentCount = 0
  for (let [component, multiplier] of Object.entries(definitions)) {
    let count = Math.floor(value / multiplier)
    if (count === 0) continue

    components[component] = count
    value -= components[component] * multiplier

		// Count number of components included and stop adding more if we've reached the maximum.
    if (components[component] > 0) componentCount++
    if (maxComponents && componentCount >= maxComponents) break
  }

  return components
}

export const timeComponents = {
  definitions: {
    real: {
      years: 60 * 60 * 24 * 365,
      weeks: 60 * 60 * 24 * 7,
      days: 60 * 60 * 24,
      hours: 60 * 60,
      minutes: 60,
      seconds: 1
    },
    billing: {
      years: 60 * 60 * 24 * 365,
      months: 60 * 60 * 730,
      weeks: 60 * 60 * 24 * 7,
      days: 60 * 60 * 24,
      hours: 60 * 60,
      minutes: 60,
      seconds: 1
    }
  },
  names: {
    long: {
      singular: {
        years: ' year',
        months: ' month',
        weeks: ' week',
        days: ' day',
        hours: ' hour',
        minutes: ' minute',
        seconds: ' second'
      },
      plural: {
        years: ' years',
        months: ' months',
        weeks: ' weeks',
        days: ' days',
        hours: ' hours',
        minutes: ' minutes',
        seconds: ' seconds'
      }
    },
    short: {
      singular: {
        years: 'y',
        months: 'mo',
        weeks: 'w',
        days: 'd',
        hours: 'h',
        minutes: 'm',
        seconds: 's'
      },
      plural: {
        years: 'y',
        months: 'mo',
        weeks: 'w',
        days: 'd',
        hours: 'h',
        minutes: 'm',
        seconds: 's'
      }
    }
  }
}

// ### readableDuration
// Turn duration in seconds into human readable duration string.
export function duration (duration, { definitions = timeComponents.definitions.billing, names = timeComponents.names.short, maxComponents = 2 } = {}) {
  let components = componentize(duration, definitions, maxComponents)

	// Build an array that contains all the components that should be displayed.
  let durationStrings = Array.from(Object.entries(components)).map(
		([name, value]) => components[name] + names[components[name] > 1 ? 'plural' : 'singular'][name]
	)

  return durationStrings.length > 0 ? durationStrings.join(' ') : `0${names.plural.seconds}`
}

export const storageComponents = {
  definitions: {
    decimal: {
      tb: Math.pow(1000, 4),
      gb: Math.pow(1000, 3),
      mb: Math.pow(1000, 2),
      kb: Math.pow(1000, 1),
      b: Math.pow(1000, 0)
    }
  },
  names: {
    decimal: {
      short: {
        tb: 'TB',
        gb: 'GB',
        mb: 'MB',
        kb: 'KB',
        b: 'B'
      }
    }
  }
}

export function storage (value, { definitions = storageComponents.definitions.decimal, names = storageComponents.names.decimal.short, maxComponents = 1 } = {}) {
  let component, count, multiplier

  for ([component, multiplier] of Object.entries(definitions)) {
    count = value / multiplier
    if (count >= 1) break
  }

  if (count === 0) component = 'gb'

  return `${decimal(count, 1)} ${names[component]}`
}

// ### formatCurrency
// Format currency according to generic format.
export function currency (value, { unit = 'EUR', decimals = 3} = {}) {
  if (value === undefined) return 'N/A'

  let symbol = unit === 'EUR' ? '€' : unit

  if (localStringSupported) return `${symbol}&nbsp;${value.toLocaleString(locale, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: decimals })}`

  let valueString = value.toFixed(decimals)
  if (decimals === 3 && valueString.slice(-1) === '0') valueString = valueString.slice(0, -1)

  return `${symbol}&nbsp;${valueString}`
}

export function decimal (value, maximumFractionDigits = 2, minimumFractionDigits = 0) {
  if (localStringSupported) return value.toLocaleString(locale, { style: 'decimal', minimumFractionDigits, maximumFractionDigits})

  return `${Math.round10(value, -maximumFractionDigits)}`
}
