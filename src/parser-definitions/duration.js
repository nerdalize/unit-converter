const d = {}

// NL
d.nanoseconde =
d.nanoseconden =
// EN
d.nanosecond =
d.ns = 1 / 1e6

// NL
d.microseconde =
d.microseconden =
// EN
d.μs =
d.microsecond = 1 / 1e3

// NL
d.milliseconde =
d.milliseconden =
// EN
d.millisecond =
d.ms = 1

// NL
d.seconde =
d.seconden =
// EN
d.second =
d.sec =
d.s = d.ms * 1000

// NL
d.minuut =
d.minuten =
// EN
d.minute =
d.min =
d.m = d.s * 60


// NL
d.uur =
d.uren =
// EN
d.hour =
d.hr =
d.h = d.m * 60

// NL
d.dag =
d.dagen =
// EN
d.day =
d.d = d.h * 24

// NL
d.week =
d.weken =
// EN
d.week =
d.wk =
d.w = d.d * 7

// NL
d.maand =
d.maanden =
// EN
d.b =
d.month = d.d * (365 / 12)

// NL
d.jaar =
d.jaren =
// EN
d.year =
d.yr =
d.y = d.d * 365

export default d