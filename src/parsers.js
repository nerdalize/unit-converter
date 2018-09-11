import durationDefinitions from './parser-definitions/duration'
import storageDefinitions from './parser-definitions/storage'

// Parser originally from https://github.com/jkroso/parse-duration

const splitter = /(-?\s*\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-zμ]*)/ig

function parse(str, definitions, fallbackUnit) {
	
	var result = 0
	// Converst commas to periods
	str = str.replace(/(\d),(\d)/g, '$1.$2')
	str.replace(splitter, (_, n, units) => {
		units = definitions[units] || definitions[units.toLowerCase().replace(/s$/, '')] || definitions[fallbackUnit] || 1
		result += parseFloat(n.replace(' ', ''), 10) * units
	})
	
	return result
}

export function duration(str, fallbackUnit) {
	
	return parse(str, durationDefinitions, fallbackUnit)
	
}

export function storage(str, fallbackUnit) {
	
	return parse(str, storageDefinitions, fallbackUnit)
	
}