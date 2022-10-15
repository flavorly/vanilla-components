/** Check is two dates are the same */
export const areDatesEqual = (value, date) => {
  if (value) {
    return value.getDate() === date.day
      && value.getMonth() === date.month
      && value.getFullYear() === date.year
  }
  return false
}

/** Checks if a given date is between a given dates */
export const isDateBetween = (start, end, date) => {
  const between = false
  if (start && end) {
    const dateCompare = new Date(date.year, date.month, date.day)
    return start.getTime() <= dateCompare.getTime() && end.getTime() >= dateCompare.getTime()
  }
  return between
}

/** Checks if the given date is today based on the day, year, month */
export const isToday = (date, day, month, year) => {
  return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year
}

/** Get the first day of the month internal index */
export const getFirstDayOfMonthIndex = (month, year) => {
  const day = new Date()

  day.setDate(1)
  day.setMonth(month)
  day.setFullYear(year)

  const dayIndex = day.getDay() + this.sundayIndex

  return dayIndex >= 7 ? dayIndex - 7 : dayIndex
}

/** Get the number of days in the given month + year */
export const getDaysCountInMonth = (month, year) => {
  return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate()
}

/** Get the number of days in the previous month */
export const getDaysCountInPrevMonth = (month, year) => {
  const prev = this.getPreviousMonthAndYear(month, year)
  return this.getDaysCountInMonth(prev.month, prev.year)
}

/** Get the previous month and year */
export const getPreviousMonthAndYear = (month, year) => {
  let m, y
  if (month === 0) {
    m = 11
    y = year - 1
  }
  else {
    m = month - 1
    y = year
  }
  return { month: m, year: y }
}

/** Get the next month and year */
export const getNextMonthAndYear = (month, year) => {
  let m, y

  if (month === 11) {
    m = 0
    y = year + 1
  }
  else {
    m = month + 1
    y = year
  }

  return { month: m, year: y }
}

export const daylightSavingAdjust = (date) => {
  if (!date) {
    return null
  }

  date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0)

  return date
}

export const convertTo24Hour = (hours, pm, format) => {
  if (format === '12') {
    if (hours === 12) {
      return pm ? 12 : 0
    }
    else {
      return pm ? hours + 12 : hours
    }
  }
  return hours
}
