global.navigator = {}

const assert = require('assert')
const unitConverter = require('..')

// function test(hours, minutes, seconds, expected) {
//   now.setHours(hours);
//   now.setMinutes(minutes);
//   now.setSeconds(seconds);

//   assert.equal(howLongTillLunch(...lunchtime), expected);
//   console.log(`\u001B[32m✓\u001B[39m ${expected}`);
// }

function test (fn, duration, expected, opts) {
  assert.equal(fn(duration, opts), expected)
  console.log(`\u001B[32m✓\u001B[39m ${expected}`)
}

const timeNames = unitConverter.format.timeComponents.names
const fmts = unitConverter.format

console.log('Testing formatters')
// Short
test(fmts.duration, 1, '1s')
test(fmts.duration, 10, '10s')
test(fmts.duration, 86400, '1d')

// Long
test(fmts.duration, 1, '1 second', { names: timeNames.long })
test(fmts.duration, 10, '10 seconds', { names: timeNames.long })
test(fmts.duration, 86400, '1 day', { names: timeNames.long })

// Shouldn't this be 10 days?
test(fmts.duration, 864000, '1 week 3 days', { names: timeNames.long })

test(fmts.storage, 1, '1 B')
test(fmts.storage, 10, '10 B')
test(fmts.storage, 1100, '1.1 KB')
test(fmts.storage, 1100000, '1.1 MB')
test(fmts.storage, 1100000000, '1.1 GB')
test(fmts.storage, 1100000000000, '1.1 TB')

test(fmts.currency, 1000, '€&nbsp;1,000.00')

test(fmts.decimal, 1.123, '1.12')
test(fmts.decimal, 1.128, '1.13')

console.log('Testing parsers')
const parsers = unitConverter.parse

test(parsers.duration, '1 week 3 days', 864000000)
test(parsers.duration, '10 days', 864000000)
test(parsers.duration, '1.5 day', 129600000)
test(parsers.duration, '15 months', 39420000000)
test(parsers.duration, '1s', 1000)

test(parsers.storage, '15 GB', 15000000000)
test(parsers.storage, '15 GiB', 16106127360)
test(parsers.storage, '15 TiB', 16492674416640)
test(parsers.storage, '15 Byte', 15)
