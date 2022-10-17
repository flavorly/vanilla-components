import { computed, ref, watch } from 'vue'
import type { MaybeRef } from '@vueuse/core'

/* eslint @typescript-eslint/no-use-before-define: ["off"] */
const useCalendarState = (props, localValue: MaybeRef<any>) => {
  const locale = {
    startsWith: 'Starts with',
    contains: 'Contains',
    notContains: 'Not contains',
    endsWith: 'Ends with',
    equals: 'Equals',
    notEquals: 'Not equals',
    noFilter: 'No Filter',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dateBefore: 'Date is before',
    dateAfter: 'Date is after',
    clear: 'Clear',
    apply: 'Apply',
    matchAll: 'Match All',
    matchAny: 'Match Any',
    addRule: 'Add Rule',
    removeRule: 'Remove Rule',
    accept: 'Yes',
    reject: 'No',
    choose: 'Choose',
    upload: 'Upload',
    cancel: 'Cancel',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    chooseYear: 'Choose Year',
    chooseMonth: 'Choose Month',
    chooseDate: 'Choose Date',
    prevDecade: 'Previous Decade',
    nextDecade: 'Next Decade',
    prevYear: 'Previous Year',
    nextYear: 'Next Year',
    prevMonth: 'Previous Month',
    nextMonth: 'Next Month',
    prevHour: 'Previous Hour',
    nextHour: 'Next Hour',
    prevMinute: 'Previous Minute',
    nextMinute: 'Next Minute',
    prevSecond: 'Previous Second',
    nextSecond: 'Next Second',
    am: 'am',
    pm: 'pm',
    today: 'Today',
    weekHeader: 'Wk',
    firstDayOfWeek: 0,
    dateFormat: 'mm/dd/yy',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
    emptyFilterMessage: 'No results found', // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: '{0} results are available',
    selectionMessage: '{0} items selected',
    emptySelectionMessage: 'No selected item',
    emptySearchMessage: 'No results found',
    emptyMessage: 'No available options',
    aria: {
      trueLabel: 'True',
      falseLabel: 'False',
      nullLabel: 'Not Selected',
      star: '1 star',
      stars: '{star} stars',
      selectAll: 'All items selected',
      unselectAll: 'All items unselected',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      navigation: 'Navigation',
    },
  }
  const currentMonth = ref(null)
  const currentYear = ref(null)
  const currentHour = ref(null)
  const currentMinute = ref(null)
  const currentSecond = ref(null)
  const pm = ref(null)
  const currentView = ref(props.view)

  // Computed
  const isSingleSelection = computed<boolean>(() => props.selectionMode === 'single')
  const isRangeSelection = computed<boolean>(() => props.selectionMode === 'range')
  const isMultipleSelection = computed<boolean>(() => props.selectionMode === 'multiple')
  const viewDate = computed(() => {
    let propValue = localValue.value

    if (propValue && Array.isArray(propValue)) {
      if (isRangeSelection.value) {
        propValue = propValue[1] || propValue[0]
      }
      else if (isMultipleSelection.value) {
        propValue = propValue[propValue.length - 1]
      }
    }

    if (propValue && typeof propValue !== 'string') {
      return propValue
    }
    else {
      const today = new Date()

      if (props.maxDate && props.maxDate < today) {
        return props.maxDate
      }

      if (props.minDate && props.minDate > today) {
        return props.minDate
      }

      return today
    }
  })

  const formatDateTime = (date) => {
    let formattedValue = null

    if (date) {
      if (props.timeOnly) {
        formattedValue = formatTime(date)
      }
      else {
        formattedValue = formatDate(date, props.dateFormat || locale.dateFormat)

        if (props.showTime) {
          formattedValue += ` ${formatTime(date)}`
        }
      }
    }

    return formattedValue
  }
  const formatDate = (date, format) => {
    if (!date) {
      return ''
    }

    let iFormat = 0

    const lookAhead = (match) => {
        const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match

        if (matches) {
          iFormat++
        }

        return matches
      }
      const formatNumber = (match, value, len) => {
        let num = `${value}`

        if (lookAhead(match)) {
          while (num.length < len) {
            num = `0${num}`
          }
        }

        return num
      }
      const formatName = (match, value, shortNames, longNames) => {
        return lookAhead(match) ? longNames[value] : shortNames[value]
      }

    let output = ''
    let literal = false

    if (date) {
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
            literal = false
          }
          else {
            output += format.charAt(iFormat)
          }
        }
        else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', date.getDate(), 2)
              break
            case 'D':
              output += formatName('D', date.getDay(), locale.dayNamesShort, locale.dayNames)
              break
            case 'o':
              output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3)
              break
            case 'm':
              output += formatNumber('m', date.getMonth() + 1, 2)
              break
            case 'M':
              output += formatName('M', date.getMonth(), locale.monthNamesShort, locale.monthNames)
              break
            case 'y':
              output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100)
              break
            case '@':
              output += date.getTime()
              break
            case '!':
              output += date.getTime() * 10000 + optionsTicksTo1970()
              break
            case '\'':
              if (lookAhead('\'')) {
                output += '\''
              }
              else {
                literal = true
              }

              break
            default:
              output += format.charAt(iFormat)
          }
        }
      }
    }

    return output
  }
  const formatTime = (date) => {
    if (!date) {
      return ''
    }

    let output = ''
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    if (props.hourFormat === '12' && hours > 11 && hours !== 12) {
      hours -= 12
    }

    if (props.hourFormat === '12') {
      output += hours === 0 ? 12 : hours < 10 ? `0${hours}` : hours
    }
    else {
      output += hours < 10 ? `0${hours}` : hours
    }

    output += ':'
    output += minutes < 10 ? `0${minutes}` : minutes

    if (props.showSeconds) {
      output += ':'
      output += seconds < 10 ? `0${seconds}` : seconds
    }

    if (props.hourFormat === '12') {
      output += date.getHours() > 11 ? ' PM' : ' AM'
    }

    return output
  }
  const formatValue = (value) => {
    if (typeof value === 'string') {
      return value
    }

    let formattedValue = ''

    if (value) {
      try {
        if (isSingleSelection.value) {
          formattedValue = formatDateTime(value)
        }
        else if (isMultipleSelection.value) {
          for (let i = 0; i < value.length; i++) {
            const dateAsString = formatDateTime(value[i])

            formattedValue += dateAsString

            if (i !== value.length - 1) {
              formattedValue += ', '
            }
          }
        }
        else if (isRangeSelection.value) {
          if (value && value.length) {
            const startDate = value[0]
            const endDate = value[1]

            formattedValue = formatDateTime(startDate)

            if (endDate) {
              formattedValue += ` - ${formatDateTime(endDate)}`
            }
          }
        }
      }
      catch (err) {
        formattedValue = value
      }
    }

    return formattedValue
  }

  const parseDate = (value, format) => {
    if (format == null || value == null) {
      throw 'Invalid arguments'
    }

    value = typeof value === 'object' ? value.toString() : `${value}`

    if (value === '') {
      return null
    }

    let iFormat = 0
      let dim
      let extra
      let iValue = 0
      const shortYearCutoff = typeof props.shortYearCutoff !== 'string' ? props.shortYearCutoff : (new Date().getFullYear() % 100) + parseInt(props.shortYearCutoff, 10)
      let year = -1
      let month = -1
      let day = -1
      let doy = -1
      let literal = false
      let date

      const lookAhead = (match) => {
        const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match

        if (matches) {
          iFormat++
        }

        return matches
      }

      const getNumber = (match) => {
        const isDoubled = lookAhead(match)
          const size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2
          const minSize = match === 'y' ? size : 1
          const digits = new RegExp(`^\\d{${minSize},${size}}`)
          const num = value.substring(iValue).match(digits)

        if (!num) {
          throw `Missing number at position ${iValue}`
        }

        iValue += num[0].length

        return parseInt(num[0], 10)
      }

      const getName = (match, shortNames, longNames) => {
        let index = -1
        const arr = lookAhead(match) ? longNames : shortNames
        const names = []

        for (let i = 0; i < arr.length; i++) {
          names.push([i, arr[i]])
        }

        names.sort((a, b) => {
          return -(a[1].length - b[1].length)
        })

        for (let i = 0; i < names.length; i++) {
          const name = names[i][1]

          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index = names[i][0]
            iValue += name.length
            break
          }
        }

        if (index !== -1) {
          return index + 1
        }
        else {
          throw `Unknown name at position ${iValue}`
        }
      }

      const checkLiteral = () => {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw `Unexpected literal at position ${iValue}`
        }

        iValue++
      }

    if (currentView.value === 'month') {
      day = 1
    }

    for (iFormat = 0; iFormat < format.length; iFormat++) {
      if (literal) {
        if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
          literal = false
        }
        else {
          checkLiteral()
        }
      }
      else {
        switch (format.charAt(iFormat)) {
          case 'd':
            day = getNumber('d')
            break
          case 'D':
            getName('D', locale.dayNamesShort, locale.dayNames)
            break
          case 'o':
            doy = getNumber('o')
            break
          case 'm':
            month = getNumber('m')
            break
          case 'M':
            month = getName('M', locale.monthNamesShort, locale.monthNames)
            break
          case 'y':
            year = getNumber('y')
            break
          case '@':
            date = new Date(getNumber('@'))
            year = date.getFullYear()
            month = date.getMonth() + 1
            day = date.getDate()
            break
          case '!':
            date = new Date((getNumber('!') - optionsTicksTo1970()) / 10000)
            year = date.getFullYear()
            month = date.getMonth() + 1
            day = date.getDate()
            break
          case '\'':
            if (lookAhead('\'')) {
              checkLiteral()
            }
            else {
              literal = true
            }

            break
          default:
            checkLiteral()
        }
      }
    }

    if (iValue < value.length) {
      extra = value.substr(iValue)

      if (!/^\s+/.test(extra)) {
        throw `Extra/unparsed characters found in date: ${extra}`
      }
    }

    if (year === -1) {
      year = new Date().getFullYear()
    }
    else if (year < 100) {
      year += new Date().getFullYear() - (new Date().getFullYear() % 100) + (year <= shortYearCutoff ? 0 : -100)
    }

    if (doy > -1) {
      month = 1
      day = doy

      do {
        dim = getDaysCountInMonth(year, month - 1)
        if (day <= dim) {
          break
        }
        month++
        day -= dim
      } while (true)
    }

    date = daylightSavingAdjust(new Date(year, month - 1, day))

    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      throw 'Invalid date' // E.g. 31/02/00
    }

    return date
  }
  const parseDateTime = (text) => {
    let date
    const parts = text.split(' ')

    if (props.timeOnly) {
      date = new Date()
      populateTime(date, parts[0], parts[1])
    }
    else {
      const dateFormat = datePattern.value

      if (props.showTime) {
        date = parseDate(parts[0], dateFormat)
        populateTime(date, parts[1], parts[2])
      }
      else {
        date = parseDate(text, dateFormat)
      }
    }

    return date
  }
  const parseValue = (text) => {
    if (!text || text.trim().length === 0) {
      return null
    }

    let value

    if (isSingleSelection.value) {
      value = parseDateTime(text)
    }
    else if (isMultipleSelection.value) {
      const tokens = text.split(',')

      value = []

      for (const token of tokens) {
        value.push(parseDateTime(token.trim()))
      }
    }
    else if (isRangeSelection.value) {
      const tokens = text.split(' - ')

      value = []

      for (let i = 0; i < tokens.length; i++) {
        value[i] = parseDateTime(tokens[i].trim())
      }
    }

    return value
  }
  const parseTime = (value) => {
    const tokens = value.split(':')
    const validTokenLength = props.showSeconds ? 3 : 2
    const regex = /^[0-9][0-9]$/

    if (tokens.length !== validTokenLength || !tokens[0].match(regex) || !tokens[1].match(regex) || (props.showSeconds && !tokens[2].match(regex))) {
      throw 'Invalid time'
    }

    let h = parseInt(tokens[0])
    const m = parseInt(tokens[1])
    const s = props.showSeconds ? parseInt(tokens[2]) : null

    if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (props.hourFormat === '12' && h > 12) || (props.showSeconds && (isNaN(s) || s > 59))) {
      throw 'Invalid time'
    }
    else {
      if (props.hourFormat === '12' && h !== 12 && pm.value) {
        h += 12
      }

      return { hour: h, minute: m, second: s }
    }
  }

  const populateTime = (value, timeString, ampm) => {
    if (props.hourFormat === '12' && !ampm) {
      throw 'Invalid Time'
    }

    pm.value = ampm === 'PM' || ampm === 'pm'
    const time = parseTime(timeString)

    value.setHours(time.hour)
    value.setMinutes(time.minute)
    value.setSeconds(time.second)
  }
  const validateTime = (hour, minute, second, pm) => {
    let value = isComparable() ? localValue.value : viewDate.value
    const convertedHour = convertTo24Hour(hour, pm, props.hourFormat)

    if (isRangeSelection.value) {
      value = localValue.value[1] || localValue.value[0]
    }

    if (isMultipleSelection.value) {
      value = localValue.value[localValue.value.length - 1]
    }

    const valueDateString = value ? value.toDateString() : null

    if (props.minDate && valueDateString && props.minDate.toDateString() === valueDateString) {
      if (props.minDate.getHours() > convertedHour) {
        return false
      }

      if (props.minDate.getHours() === convertedHour) {
        if (props.minDate.getMinutes() > minute) {
          return false
        }

        if (props.minDate.getMinutes() === minute) {
          if (props.minDate.getSeconds() > second) {
            return false
          }
        }
      }
    }

    if (props.maxDate && valueDateString && props.maxDate.toDateString() === valueDateString) {
      if (props.maxDate.getHours() < convertedHour) {
        return false
      }

      if (props.maxDate.getHours() === convertedHour) {
        if (props.maxDate.getMinutes() < minute) {
          return false
        }

        if (props.maxDate.getMinutes() === minute) {
          if (props.maxDate.getSeconds() < second) {
            return false
          }
        }
      }
    }

    return true
  }

  const sundayIndex = () => locale.firstDayOfWeek > 0 ? 7 - locale.firstDayOfWeek : 0
  const datePattern = computed(() => props.dateFormat || locale.dateFormat)
  const areDatesEqual = (value, date) => {
    if (value) {
      return value.getDate() === date.day
        && value.getMonth() === date.month
        && value.getFullYear() === date.year
    }
    return false
  }

  const getFirstDayOfMonthIndex = (month, year) => {
    const day = new Date()

    day.setDate(1)
    day.setMonth(month)
    day.setFullYear(year)

    const dayIndex = day.getDay() + sundayIndex()

    return dayIndex >= 7 ? dayIndex - 7 : dayIndex
  }
  const daylightSavingAdjust = (date) => {
    if (!date) {
      return null
    }

    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0)

    return date
  }
  const getDaysCountInMonth = (month, year) => {
    return 32 - daylightSavingAdjust(new Date(year, month, 32)).getDate()
  }
  const getPreviousMonthAndYear = (month, year) => {
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
  const getNextMonthAndYear = (month, year) => {
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
  const convertTo24Hour = (hours, pm, format) => {
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
  const getDaysCountInPrevMonth = (month, year) => {
    const prev = getPreviousMonthAndYear(month, year)
    return getDaysCountInMonth(prev.month, prev.year)
  }
  const getWeekNumber = (date) => {
    const checkDate = new Date(date.getTime())

    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7))
    const time = checkDate.getTime()

    checkDate.setMonth(0)
    checkDate.setDate(1)

    return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1
  }
  const getMonthName = index => locale.monthNames[index]
  const getYear = month => currentView.value === 'month' ? currentYear.value : month.year

  const isComparable = () => localValue.value !== undefined && typeof localValue.value !== 'string'
  const isSelected = (date) => {
    if (!isComparable()) {
      return false
    }
    if (!localValue.value) {
      return false
    }

    if (isSingleSelection.value) {
      return areDatesEqual(localValue.value, date)
    }

    if (isMultipleSelection.value) {
      let selected = false
      for (const date of localValue.value) {
        selected = areDatesEqual(date, date)
        if (selected) {
          break
        }
      }
      return selected
    }

    if (isRangeSelection.value) {
      if (localValue.value[1]) {
        return areDatesEqual(localValue.value[0], date)
          || areDatesEqual(localValue.value[1], date)
          || isDateBetween(localValue.value[0], localValue.value[1], date)
      }
      else {
        return areDatesEqual(localValue.value[0], date)
      }
    }
    return false
  }
  const isDateDisabled = (day, month, year) => {
    if (props.disabledDates) {
      for (const disabledDate of props.disabledDates) {
        if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
          return true
        }
      }
    }

    return false
  }
  const isDayDisabled = (day, month, year) => {
    if (props.disabledDays) {
      const weekday = new Date(year, month, day)
      const weekdayNumber = weekday.getDay()

      return props.disabledDays.includes(weekdayNumber)
    }

    return false
  }
  const isSelectable = (day, month, year, otherMonth) => {
    let validMin = true
    let validMax = true
    let validDate = true
    let validDay = true

    if (otherMonth && !props.selectOtherMonths) {
      return false
    }

    if (props.minDate) {
      if (props.minDate.getFullYear() > year) {
        validMin = false
      }
      else if (props.minDate.getFullYear() === year) {
        if (props.minDate.getMonth() > month) {
          validMin = false
        }
        else if (props.minDate.getMonth() === month) {
          if (props.minDate.getDate() > day) {
            validMin = false
          }
        }
      }
    }

    if (props.maxDate) {
      if (props.maxDate.getFullYear() < year) {
        validMax = false
      }
      else if (props.maxDate.getFullYear() === year) {
        if (props.maxDate.getMonth() < month) {
          validMax = false
        }
        else if (props.maxDate.getMonth() === month) {
          if (props.maxDate.getDate() < day) {
            validMax = false
          }
        }
      }
    }

    if (props.disabledDates) {
      validDate = !isDateDisabled(day, month, year)
    }

    if (props.disabledDays) {
      validDay = !isDayDisabled(day, month, year)
    }

    return validMin && validMax && validDate && validDay
  }
  const isDateBetween = (start, end, date) => {
    const between = false
    if (start && end) {
      const dateCompare = new Date(date.year, date.month, date.day)
      return start.getTime() <= dateCompare.getTime() && end.getTime() >= dateCompare.getTime()
    }
    return between
  }
  const isToday = (date, day, month, year) => {
    return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year
  }
  const isMonthSelected = (month) => {
    if (isComparable) {
      const value = isRangeSelection.value ? localValue.value[0] : localValue.value
      console.log('here', value)
      return !isMultipleSelection.value ? value.getMonth() === month && value.getFullYear() === currentYear.value : false
    }
    return false
  }
  const isYearSelected = (year) => {
    if (isComparable()) {
      const value = isRangeSelection.value ? localValue.value[0] : localValue.value

      return !isMultipleSelection.value && isComparable ? value.getFullYear() === year : false
    }

    return false
  }
  const isValidSelection = (value) => {
    if (value == null) {
      return true
    }

    let isValid = true

    if (isSingleSelection.value) {
      if (!isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
        isValid = false
      }
    }
    else if (value.every(v => isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
      if (isRangeSelection.value) {
        isValid = !!(value.length > 1 && value[1] > value[0])
      }
    }

    return isValid
  }

  const incrementSecond = (event) => {
    const newSecond = currentSecond.value + props.stepSecond

    if (validateTime(currentHour.value, currentMinute.value, newSecond, true)) {
      currentSecond.value = newSecond > 59 ? newSecond - 60 : newSecond
    }

    event.preventDefault()
  }
  const incrementMinute = (event) => {
    const newMinute = currentMinute.value + props.stepMinute

    if (validateTime(currentHour.value, newMinute, currentSecond.value, true)) {
      currentMinute.value = newMinute > 59 ? newMinute - 60 : newMinute
    }

    event.preventDefault()
  }
  const incrementHour = (event) => {
    const prevHour = currentHour.value
    let newHour = currentHour.value + props.stepHour
    let newPM = pm.value

    if (props.hourFormat === '24') {
      newHour = newHour >= 24 ? newHour - 24 : newHour
    }
    else if (props.hourFormat === '12') {
      // Before the AM/PM break, now after
      if (prevHour < 12 && newHour > 11) {
        newPM = !pm.value
      }

      newHour = newHour >= 13 ? newHour - 12 : newHour
    }

    if (validateTime(newHour, currentMinute.value, currentSecond.value, newPM)) {
      currentHour.value = newHour
      pm.value = newPM
    }

    event.preventDefault()
  }
  const incrementYear = () => currentYear.value++
  const incrementDecade = () => currentYear.value = currentYear.value + 10
  const decrementSecond = (event) => {
    let newSecond = currentSecond.value - props.stepSecond

    newSecond = newSecond < 0 ? 60 + newSecond : newSecond

    if (validateTime(currentHour.value, currentMinute.value, newSecond, true)) {
      currentSecond.value = newSecond
    }

    event.preventDefault()
  }
  const decrementMinute = (event) => {
    let newMinute = currentMinute.value - props.stepMinute

    newMinute = newMinute < 0 ? 60 + newMinute : newMinute

    if (validateTime(currentHour.value, newMinute, currentSecond.value, true)) {
      currentMinute.value = newMinute
    }

    event.preventDefault()
  }
  const decrementHour = (event) => {
    let newHour = currentHour.value - props.stepHour
    let newPM = pm.value

    if (props.hourFormat === '24') {
      newHour = newHour < 0 ? 24 + newHour : newHour
    }
    else if (props.hourFormat === '12') {
      // If we were at noon/midnight, then switch
      if (currentHour.value === 12) {
        newPM = !pm.value
      }
      newHour = newHour <= 0 ? 12 + newHour : newHour
    }

    if (validateTime(newHour, currentMinute.value, currentSecond.value, newPM)) {
      currentHour.value = newHour
      pm.value = newPM
    }
    event.preventDefault()
  }
  const decrementYear = () => currentYear.value--
  const decrementDecade = () => currentYear.value = currentYear.value - 10

  const optionsMonths = () => {
    const months = []

    for (let i = 0; i < props.numberOfMonths; i++) {
      let month = currentMonth.value + i
      let year = currentYear.value

      if (month > 11) {
        month = (month % 11) - 1
        year = year + 1
      }

      const dates = []
      const firstDay = getFirstDayOfMonthIndex(month, year)
      const daysLength = getDaysCountInMonth(month, year)
      const prevMonthDaysLength = getDaysCountInPrevMonth(month, year)
      let dayNo = 1
      const today = new Date()
      const weekNumbers = []
      const monthRows = Math.ceil((daysLength + firstDay) / 7)

      for (let i = 0; i < monthRows; i++) {
        const week = []

        if (i === 0) {
          for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
            const prev = getPreviousMonthAndYear(month, year)

            week.push({
              day: j,
              month: prev.month,
              year: prev.year,
              otherMonth: true,
              today: isToday(today, j, prev.month, prev.year),
              selectable: isSelectable(j, prev.month, prev.year, true),
            })
          }

          const remainingDaysLength = 7 - week.length

          for (let j = 0; j < remainingDaysLength; j++) {
            week.push({
              day: dayNo,
              month,
              year,
              today: isToday(today, dayNo, month, year),
              selectable: isSelectable(dayNo, month, year, false),
            })
            dayNo++
          }
        }
        else {
          for (let j = 0; j < 7; j++) {
            if (dayNo > daysLength) {
              const next = getNextMonthAndYear(month, year)
              week.push({
                day: dayNo - daysLength,
                month: next.month,
                year: next.year,
                otherMonth: true,
                today: isToday(today, dayNo - daysLength, next.month, next.year),
                selectable: isSelectable(dayNo - daysLength, next.month, next.year, true),
              })
            }
            else {
              week.push({
                day: dayNo,
                month,
                year,
                today: isToday(today, dayNo, month, year),
                selectable: isSelectable(dayNo, month, year, false),
              })
            }
            dayNo++
          }
        }

        if (props.showWeek) {
          weekNumbers.push(getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)))
        }

        dates.push(week)
      }

      months.push({
        month,
        year,
        dates,
        weekNumbers,
      })
    }

    return months
  }
  const optionsWeekDays = () => {
    const weekDays = []
    let dayIndex = locale.firstDayOfWeek

    for (let i = 0; i < 7; i++) {
      weekDays.push(locale.dayNamesMin[dayIndex])
      dayIndex = dayIndex === 6 ? 0 : ++dayIndex
    }

    return weekDays
  }
  const optionsMonthPicker = () => {
    const monthPickerValues = []

    for (let i = 0; i <= 11; i++) {
      monthPickerValues.push(locale.monthNamesShort[i])
    }

    return monthPickerValues
  }
  const optionsTicksTo1970 = () => {
    return ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000
  }
  const optionsYear = () => {
    if (props.yearRange) {
      const years = props.yearRange.split(':')
      const yearStart = parseInt(years[0])
      const yearEnd = parseInt(years[1])
      const yearOptions = []

      if (currentYear.value < yearStart) {
        currentYear.value = yearEnd
      }
      else if (currentYear.value > yearEnd) {
        currentYear.value = yearStart
      }

      for (let i = yearStart; i <= yearEnd; i++) {
        yearOptions.push(i)
      }

      return yearOptions
    }
    else {
      return null
    }
  }
  const optionsYearPicker = () => {
    const yearPickerValues = []
    const base = currentYear.value - (currentYear.value % 10)

    for (let i = 0; i < 10; i++) {
      yearPickerValues.push(base + i)
    }

    return yearPickerValues
  }

  const formattedCurrentHour = () => {
    return currentHour.value < 10 ? `0${currentHour.value}` : currentHour.value
  }
  const formattedCurrentMinute = () => {
    return currentMinute.value < 10 ? `0${currentMinute.value}` : currentMinute.value
  }
  const formattedCurrentSecond = () => {
    return currentSecond.value < 10 ? `0${currentSecond.value}` : currentSecond.value
  }

  const labelToday = () => {
    return locale.today
  }
  const labelClear = () => {
    return locale.clear
  }
  const labelWeekHeader = () => {
    return locale.weekHeader
  }

  return {
    areDatesEqual,
    isDateBetween,
    isToday,
    isComparable,
    isSelected,
    isDayDisabled,
    isDateDisabled,
    isSelectable,
    isMonthSelected,
    isYearSelected,
    isValidSelection,
    isRangeSelection,
    isMultipleSelection,
    isSingleSelection,

    incrementSecond,
    incrementMinute,
    incrementHour,
    incrementYear,
    incrementDecade,
    decrementSecond,
    decrementMinute,
    decrementHour,
    decrementYear,
    decrementDecade,

    getFirstDayOfMonthIndex,
    getNextMonthAndYear,
    daylightSavingAdjust,

    getDaysCountInPrevMonth,
    getMonthName,
    getYear,

    optionsMonths,
    optionsWeekDays,
    optionsMonthPicker,
    optionsTicksTo1970,
    optionsYear,
    optionsYearPicker,

    formattedCurrentHour,
    formattedCurrentMinute,
    formattedCurrentSecond,

    labelToday,
    labelClear,
    labelWeekHeader,

    formatValue,
    convertTo24Hour,

    parseValue,
    parseDate,
    parseDateTime,

    currentView,
    currentMonth,
    currentYear,
    currentHour,
    currentMinute,
    currentSecond,
    pm,
    locale,
    viewDate,
  }
}

export default useCalendarState
