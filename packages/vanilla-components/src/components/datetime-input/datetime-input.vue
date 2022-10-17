<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import DomHandler from './dom-handler'
import useCalendarState from './useDates'
import type { DateTimeInputProps } from './config'
import { dateTimeInputConfig } from './config'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
import { Button } from '@/index'

const props = defineProps({
  ...useVariantProps(),
  modelValue: {
    default: undefined,
  },
  selectionMode: {
    type: String,
    default: 'single',
  },
  dateFormat: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  showOtherMonths: {
    type: Boolean,
    default: true,
  },
  selectOtherMonths: {
    type: Boolean,
    default: false,
  },
  numberOfMonths: {
    type: Number,
    default: 1,
  },
  responsiveOptions: {
    type: Array,
    default: undefined,
  },
  view: {
    type: String,
    default: 'date',
  },
  touchUI: {
    type: Boolean,
    default: false,
  },
  monthNavigator: {
    type: Boolean,
    default: false,
  },
  yearNavigator: {
    type: Boolean,
    default: false,
  },
  yearRange: {
    type: String,
    default: null,
  },
  minDate: {
    type: Date,
    default: null,
  },
  maxDate: {
    type: Date,
    default: null,
  },
  disabledDates: {
    type: Array,
    default: null,
  },
  disabledDays: {
    type: Array,
    default: null,
  },
  maxDateCount: {
    type: Number,
    default: null,
  },
  showOnFocus: {
    type: Boolean,
    default: true,
  },
  autoZIndex: {
    type: Boolean,
    default: true,
  },
  baseZIndex: {
    type: Number,
    default: 0,
  },
  showButtonBar: {
    type: Boolean,
    default: false,
  },
  shortYearCutoff: {
    type: String,
    default: '+10',
  },
  showTime: {
    type: Boolean,
    default: false,
  },
  timeOnly: {
    type: Boolean,
    default: false,
  },
  hourFormat: {
    type: String,
    default: '24',
  },
  stepHour: {
    type: Number,
    default: 1,
  },
  stepMinute: {
    type: Number,
    default: 1,
  },
  stepSecond: {
    type: Number,
    default: 1,
  },
  showSeconds: {
    type: Boolean,
    default: false,
  },
  hideOnDateTimeSelect: {
    type: Boolean,
    default: false,
  },
  hideOnRangeSelection: {
    type: Boolean,
    default: false,
  },
  timeSeparator: {
    type: String,
    default: ':',
  },
  showWeek: {
    type: Boolean,
    default: false,
  },
  manualInput: {
    type: Boolean,
    default: true,
  },
  appendTo: {
    type: String,
    default: 'body',
  },
})

const emit = defineEmits([
  'show',
  'hide',
  'input',
  'month-change',
  'year-change',
  'date-select',
  'update:modelValue',
  'today-click',
  'clear-click',
  'focus',
  'blur',
  'keydown',
])

const localValue = useVModel(props, 'modelValue')
const { configuration, errors, hasErrors } = useConfiguration<DateTimeInputProps>(dateTimeInputConfig, 'DateTimeInput', localValue)

// Template Refs
const inputRef = ref(null)
const overlayRef = ref(null)

const {
  currentSecond,
  currentMinute,
  currentHour,
  currentMonth,
  currentYear,
  currentView,
  pm,
  viewDate,
  incrementYear,
  incrementMinute,
  incrementHour,
  incrementSecond,
  incrementDecade,
  decrementYear,
  decrementHour,
  decrementMinute,
  decrementSecond,
  decrementDecade,
  isMonthSelected,
  isYearSelected,
  isValidSelection,
  isRangeSelection,
  isMultipleSelection,
  isSingleSelection,
  isComparable,
  isSelected,
  parseValue,
  optionsYearPicker,
  optionsMonthPicker,
  optionsWeekDays,
  optionsMonths,
  locale,
  formatValue,
  formattedCurrentSecond,
  formattedCurrentMinute,
  formattedCurrentHour,
  getMonthName,
  getYear,
  areDatesEqual,
  labelClear,
  labelToday,
  labelWeekHeader,
} = useCalendarState(props, localValue)

// Reactive
const focused = ref(false)
const overlayVisible = ref(true)
const navigationState = ref(null)
const preventFocus = ref(null)
const timePickerChange = ref(null)
const outsideClickListener = ref(null)
const scrollHandlerListener = ref(null)
const typeUpdate = ref(null)
const selectionStartDate = ref(null)
const selectionEndDate = ref(null)
const timePickerTimer = ref(null)

// Computed
const isEnabled = computed<boolean>(() => props?.disabled || props?.readonly || true)

const navigateBackwards = (event: Event | KeyboardEvent) => {
  event.preventDefault()

  if (!isEnabled.value) {
    return
  }

  if (currentView.value === 'month') {
    decrementYear()
  }
  else if (currentView.value === 'year') {
    decrementDecade()
  }
  else {
    if (event.shiftKey) {
      decrementYear()
    }
    else {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        decrementYear()
      }
      else {
        currentMonth.value--
      }
      emit('month-change', { month: currentMonth.value + 1, year: currentYear.value })
    }
  }
}
const navigateForward = (event: Event | KeyboardEvent) => {
  console.log('navigateForward', currentView.value, event, isEnabled.value)

  if (!isEnabled.value) {
    return
  }
  if (currentView.value === 'month') {
    incrementYear()
  }
  else if (currentView.value === 'year') {
    incrementDecade()
  }
  else {
    if (event?.shiftKey) {
      incrementYear()
    }
    else {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        incrementYear()
      }
      else {
        console.log('Im hereeeee', currentMonth.value)
        currentMonth.value = currentMonth.value + 1
        console.log('Im hereeeee', currentMonth.value)
      }
      emit('month-change', { month: currentMonth.value + 1, year: currentYear.value })
    }
  }
}
const switchToMonthView = (event: Event | KeyboardEvent) => {
  currentView.value = 'month'
  setTimeout(focusUpdate, 0)
  event.preventDefault()
}
const switchToYearView = (event: Event | KeyboardEvent) => {
  currentView.value = 'year'
  setTimeout(focusUpdate, 0)
  event.preventDefault()
}

const toggleAMPM = (event: Event | KeyboardEvent) => {
  pm.value = !pm.value
  updateModelTime()
  event.preventDefault()
}

// Methods - Focus & Traps
const focusUpdate = () => {
  let cell

  if (navigationState.value) {
    if (navigationState.value.button) {
      focusableCell()
      if (navigationState.value.backward) {
        DomHandler.findSingle(overlayRef.value, '.p-datepicker-prev').focus()
      }
      else {
        DomHandler.findSingle(overlayRef.value, '.p-datepicker-next').focus()
      }
    }
    else {
      if (navigationState.value.backward) {
        let cells

        if (currentView.value === 'month') {
          cells = DomHandler.find(overlayRef.value, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)')
        }
        else if (currentView.value === 'year') {
          cells = DomHandler.find(overlayRef.value, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)')
        }
        else {
          cells = DomHandler.find(overlayRef.value, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)')
        }

        if (cells && cells.length > 0) {
          cell = cells[cells.length - 1]
        }
      }
      else {
        if (currentView.value === 'month') {
          cell = DomHandler.findSingle(overlayRef.value, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)')
        }
        else if (currentView.value === 'year') {
          cell = DomHandler.findSingle(overlayRef.value, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)')
        }
        else {
          cell = DomHandler.findSingle(overlayRef.value, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)')
        }
      }

      if (cell) {
        cell.tabIndex = '0'
        cell.focus()
      }
    }

    navigationState.value = null
    return
  }

  focusableCell()
}
const focusableCell = () => {
  let cell

  if (currentView.value === 'month') {
    const cells = DomHandler.find(overlayRef.value, '.p-monthpicker .p-monthpicker-month')
    const selectedCell = DomHandler.findSingle(overlayRef.value, '.p-monthpicker .p-monthpicker-month.p-highlight')

    cells.forEach(cell => (cell.tabIndex = -1))
    cell = selectedCell || cells[0]
  }
  else if (currentView.value === 'year') {
    const cells = DomHandler.find(overlayRef.value, '.p-yearpicker .p-yearpicker-year')
    const selectedCell = DomHandler.findSingle(overlayRef.value, '.p-yearpicker .p-yearpicker-year.p-highlight')

    cells.forEach(cell => (cell.tabIndex = -1))
    cell = selectedCell || cells[0]
  }
  else {
    cell = DomHandler.findSingle(overlayRef.value, 'span.p-highlight')

    if (!cell) {
      const todayCell = DomHandler.findSingle(overlayRef.value, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink')

      if (todayCell) {
        cell = todayCell
      }
      else {
        cell = DomHandler.findSingle(overlayRef.value, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink')
      }
    }
  }

  if (cell) {
    cell.tabIndex = '0'

    if (!preventFocus.value && (!navigationState.value || !navigationState.value.button) && !timePickerChange.value) {
      cell.focus()
    }

    preventFocus.value = false
  }
}

// Methods - Update
const updateCurrentTimeMeta = (date) => {
  let currentHour = date.getHours()

  if (props.hourFormat === '12') {
    pm.value = currentHour > 11

    if (currentHour >= 12) {
      currentHour = currentHour === 12 ? 12 : currentHour - 12
    }
    else {
      currentHour = currentHour === 0 ? 12 : currentHour
    }
  }

  currentHour.value = Math.floor(currentHour / props.stepHour) * props.stepHour
  currentMinute.value = Math.floor(date.getMinutes() / props.stepMinute) * props.stepMinute
  currentSecond.value = Math.floor(date.getSeconds() / props.stepSecond) * props.stepSecond
}
const updateCurrentMetaData = () => {
  currentMonth.value = viewDate.value.getMonth()
  currentYear.value = viewDate.value.getFullYear()

  if (props.showTime || props.timeOnly) {
    updateCurrentTimeMeta(viewDate.value)
  }
}

const clearTimePickerTimer = () => {
  if (timePickerTimer.value) {
    clearInterval(timePickerTimer.value)
  }
}

const repeat = (event, interval, type, direction) => {
  const i = interval || 500

  clearTimePickerTimer()

  timePickerTimer.value = setTimeout(() => repeat(event, 100, type, direction), i)

  switch (type) {
    case 0:
      if (direction === 1) {
        incrementHour(event)
      }
      else {
        decrementHour(event)
      }
      break

    case 1:
      if (direction === 1) {
        incrementMinute(event)
      }
      else {
        decrementMinute(event)
      }
      break

    case 2:
      if (direction === 1) {
        incrementSecond(event)
      }
      else {
        decrementSecond(event)
      }
      break
  }
}

const onPreviousButtonClick = (event) => {
  if (props.showOtherMonths) {
    navigationState.value = { backward: true, button: true }
    navigateBackwards(event)
  }
}
const onNextButtonClick = (event) => {
  if (props.showOtherMonths) {
    navigationState.value = { backward: false, button: true }
    navigateForward(event)
  }
}
const onOutsideClickListener = (unbind: boolean) => {
  if (unbind) {
    if (outsideClickListener.value) {
      document.removeEventListener('mousedown', outsideClickListener.value)
      outsideClickListener.value = null
    }
    return
  }

  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (overlayVisible.value) {
        overlayVisible.value = false
      }
    }

    document.addEventListener('mousedown', outsideClickListener.value)
  }
}
const onScrollListener = (unbind: boolean) => {
  // if (scrollHandlerListener.value) {
  //   scrollHandlerListener.value.onScrollListener(true)
  // }
  //
  // if (!scrollHandlerListener.value) {
  //   scrollHandlerListener.value = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
  //     if (overlayVisible.value) {
  //       overlayVisible.value = false
  //     }
  //   })
  // }
  //
  // scrollHandlerListener.value.onScrollListener()
}
const onInput = (event: Event | KeyboardEvent) => {
  try {
    selectionStartDate.value = inputRef.value.selectionStart
    selectionEndDate.value = inputRef.value.selectionEnd

    const value = parseValue(event.target.value)

    if (isValidSelection(value)) {
      typeUpdate.value = true
      updateModel(value)
    }
  }
  catch (err) {}
  emit('input', event)
}

const onInputClick = () => {
  if (props.showOnFocus && isEnabled.value && !overlayVisible.value) {
    overlayVisible.value = true
  }
}

const onFocus = (event: Event | KeyboardEvent) => {
  if (props.showOnFocus && isEnabled.value) {
    overlayVisible.value = true
  }

  focused.value = true
  emit('focus', event)
}

const onBlur = (event: Event | KeyboardEvent) => {
  emit('blur', { originalEvent: event, value: event.target.value })

  focused.value = false
  event.target.value = formatValue(localValue.value)
}

const onKeyDown = (event: Event | KeyboardEvent) => {
  if (event.code === 'ArrowDown' && overlayRef.value) {
    console.log('Focus Trap')

    // this.trapFocus(event)
  }
  else if (event.code === 'ArrowDown' && !overlayRef.value) {
    overlayVisible.value = true
  }
  else if (event.code === 'Escape') {
    if (overlayVisible.value) {
      overlayVisible.value = false
      event.preventDefault()
    }
  }
  else if (event.code === 'Tab') {
    if (overlayRef.value) {
      DomHandler.getFocusableElements(overlayRef.value).forEach(el => (el.tabIndex = '-1'))
    }

    if (overlayVisible.value) {
      overlayVisible.value = false
    }
  }
}

const switchViewButtonDisabled = () => {
  return props.numberOfMonths > 1 || props.disabled
}

const selectDate = (dateMeta) => {
  let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day)

  if (props.showTime) {
    if (props.hourFormat === '12' && pm.value && currentHour.value !== 12) {
      date.setHours(currentHour.value + 12)
    }
    else {
      date.setHours(currentHour.value)
    }

    date.setMinutes(currentMinute.value)
    date.setSeconds(currentSecond.value)
  }

  if (props.minDate && props.minDate > date) {
    date = props.minDate
    currentHour.value = date.getHours()
    currentMinute.value = date.getMinutes()
    currentSecond.value = date.getSeconds()
  }

  if (props.maxDate && props.maxDate < date) {
    date = props.maxDate
    currentHour.value = date.getHours()
    currentMinute.value = date.getMinutes()
    currentSecond.value = date.getSeconds()
  }

  let modelVal = null

  if (isSingleSelection.value) {
    modelVal = date
  }
  else if (isMultipleSelection.value) {
    modelVal = localValue.value ? [...localValue.value, date] : [date]
  }
  else if (isRangeSelection.value) {
    if (localValue.value && localValue.value.length) {
      let startDate = localValue.value[0]
      let endDate = localValue.value[1]

      if (!endDate && date.getTime() >= startDate.getTime()) {
        endDate = date
      }
      else {
        startDate = date
        endDate = null
      }

      modelVal = [startDate, endDate]
    }
    else {
      modelVal = [date, null]
    }
  }

  if (modelVal !== null) {
    updateModel(modelVal)
  }

  if (isRangeSelection.value && props.hideOnRangeSelection && modelVal[1] !== null) {
    setTimeout(() => {
      overlayVisible.value = false
    }, 150)
  }

  emit('date-select', date)
}

const onMonthSelect = (event, index) => {
  if (props.view === 'month') {
    onDateSelect(event, { year: currentYear.value, month: index, day: 1, selectable: true })
  }
 else {
    currentMonth.value = index
    currentView.value = 'date'
    emit('month-change', { month: currentMonth.value + 1, year: currentYear.value })
  }

  // setTimeout(this.updateFocus, 0)
}

const onYearSelect = (event, year) => {
  if (props.view === 'year') {
    onDateSelect(event, { year, month: 0, day: 1, selectable: true })
  }
 else {
    currentYear.value = year
    currentView.value = 'month'
    emit('year-change', { month: currentMonth.value + 1, year: currentYear.value })
  }

  // setTimeout(updateFocus, 0)
}

const onTimePickerElementMouseDown = (event: Event | KeyboardEvent, type, direction) => {
  if (isEnabled.value) {
    repeat(event, null, type, direction)
    event.preventDefault()
  }
}

const onTimePickerElementMouseUp = (event: Event | KeyboardEvent) => {
  if (isEnabled.value) {
    clearTimePickerTimer()
    updateModelTime()
    event.preventDefault()
  }
}

const shouldSelectDate = () => {
  if (isMultipleSelection.value) {
    return props.maxDateCount != null ? props.maxDateCount > (localValue.value ? localValue.value.length : 0) : true
  }
  return true
}

const onDateSelect = (event, dateMeta) => {
  console.log('Date selected', props.disabled)
  if (props.disabled || !dateMeta.selectable) {
    return
  }

  DomHandler.find(overlayRef.value, '.p-datepicker-calendar td span:not(.p-disabled)').forEach(cell => (cell.tabIndex = -1))

  if (event) {
    event.currentTarget.focus()
  }

  if (isMultipleSelection.value && isSelected(dateMeta)) {
    const newValue = localValue.value.filter(date => !areDatesEqual(date, dateMeta))
    updateModel(newValue)
  }
  else {
    if (shouldSelectDate(dateMeta)) {
      if (dateMeta.otherMonth) {
        currentMonth.value = dateMeta.month
        currentYear.value = dateMeta.year
        selectDate(dateMeta)
      }
      else {
        selectDate(dateMeta)
      }
    }
  }

  if (isSingleSelection.value && (!props.showTime || props.hideOnDateTimeSelect)) {
    setTimeout(() => {
      inputRef.value?.focus()
    }, 150)
  }
}

const onTimePickerElementMouseLeave = () => {
  clearTimePickerTimer()
}

const onContainerButtonKeydown = (event: Event | KeyboardEvent) => {
  switch (event.code) {
    case 'Tab':
     // this.trapFocus(event)
      console.log('Trap Focus')
      break

    case 'Escape':
      overlayVisible.value = false
      event.preventDefault()
      break

    default:
      // Noop
      break
  }
  emit('keydown', event)
}

const updateModel = (value) => {
  localValue.value = value
}

const updateModelTime = () => {
  timePickerChange.value = true
  let value = isComparable() ? localValue.value : viewDate

  if (isRangeSelection.value) {
    value = localValue.value[1] || localValue.value[0]
  }

  if (isMultipleSelection.value) {
    value = localValue.value[localValue.value.length - 1]
  }

  value = value ? new Date(value.getTime()) : new Date()

  if (props.hourFormat === '12') {
    if (currentHour.value === 12) {
      value.setHours(pm.value ? 12 : 0)
    }
    else {
      value.setHours(pm.value ? currentHour.value + 12 : currentHour.value)
    }
  }
  else {
    value.setHours(currentHour.value)
  }

  value.setMinutes(currentMinute.value)
  value.setSeconds(currentSecond.value)

  if (isRangeSelection.value) {
    if (localValue.value[1]) {
      value = [localValue.value[0], value]
    }
    else {
      value = [value, null]
    }
  }

  if (isMultipleSelection.value) {
    value = [...localValue.value.slice(0, -1), value]
  }

  updateModel(value)
  emit('date-select', value)
  setTimeout(() => (timePickerChange.value = false), 0)
}

onMounted(() => {
  if (props.inline) {
    overlayRef.value && overlayRef.value.setAttribute(props.name, '')

    if (!props.disabled) {
      preventFocus.value = true
      focusableCell()

      if (props.numberOfMonths === 1) {
        overlayRef.value.style.width = `${DomHandler.getOuterWidth(overlayRef.value.$el)}px`
      }
    }
  }
  else {
    inputRef.value.value = formatValue(localValue.value)
  }

  console.log('here', optionsMonths())
})

onBeforeMount(() => {
  updateCurrentMetaData()
})

watch(() => localValue.value, (newValue) => {
  //
  updateCurrentMetaData()

  if (!typeUpdate.value && !props.inline && inputRef.value) {
    inputRef.value.value = formatValue(newValue)
  }

  typeUpdate.value = false
})

// watch(() => currentMonth.value, () => {
//   updateCurrentMetaData()
// })
</script>

<template>
  <span
    :id="`span.${props.name}`"
    ref="container"
    class="p-calendar p-component p-inputwrapper"
    :class="{
      'p-calendar-w-btn': false,
      'p-calendar-timeonly': props.timeOnly,
      'p-calendar-disabled': props.disabled,
      'p-inputwrapper-filled': localValue.value,
      'p-inputwrapper-focus': focused.value,
    }"
  >
    <input
      v-if="!inline"
      :id="props.name"
      ref="inputRef"
      type="text"
      role="combobox"
      class="p-inputtext p-component"
      aria-autocomplete="none"
      aria-haspopup="dialog"
      :aria-expanded="overlayVisible"
      :aria-controls="props.name"
      aria-labelledby="Input Date"
      :aria-label="props.name"
      inputmode="none"
      :disabled="props.disabled"
      :readonly="!manualInput"
      :tabindex="0"
      @input="onInput"
      @click="onInputClick"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeyDown"
    >
    <teleport
      :to="appendTo"
      :disabled="true"
    >
      <transition
        name="p-connected-overlay"
      >
        <div
          v-if="inline || overlayVisible || true"
          :id="name"
          ref="overlayRef"
          :role="inline ? null : 'dialog'"
          :aria-modal="inline ? null : 'true'"
          aria-label="Choose your date"
          class="p-datepicker p-component fooo mt-20"
          :class="[
            {
              'p-datepicker-inline': props.inline,
              'p-disabled': props.disabled,
              'p-datepicker-timeonly': props.timeOnly,
              'p-datepicker-multiple-month': props.numberOfMonths > 1,
              'p-datepicker-monthpicker': currentView === 'month',
              'p-datepicker-yearpicker': currentView === 'year',
              'p-datepicker-touch-ui': touchUI,
              'p-input-filled': 'filled',
            },
          ]"
        >
          <template v-if="!timeOnly">
            <div class="p-datepicker-group-container">
              <div
                v-for="(month, groupIndex) of optionsMonths()"
                :key="month.month + month.year"
                class="p-datepicker-group"
              >
                <div class="p-datepicker-header">
                  <slot name="header" />
                  <Button
                    v-show="showOtherMonths ? groupIndex === 0 : false"
                    class="p-datepicker-prev p-link"
                    type="button"
                    :aria-label="currentView === 'year' ? locale.prevDecade : currentView === 'month' ? locale.prevYear : locale.prevMonth"
                    @click="onPreviousButtonClick"
                  >
                    <span class="p-datepicker-prev-icon pi pi-chevron-left" />
                  </Button>
                  <div class="p-datepicker-title">
                    <Button
                      v-if="currentView === 'date'"
                      type="button"
                      class="p-datepicker-month p-link"
                      :aria-label="locale.chooseMonth"
                      @click="switchToMonthView"
                    >
                      {{ getMonthName(month.month) }}
                    </Button>
                    <Button
                      v-if="currentView !== 'year'"
                      type="button"
                      class="p-datepicker-year p-link"
                      :aria-label="locale.chooseYear"
                      @click="switchToYearView"
                    >
                      {{ getYear(month) }}
                    </Button>
                    <span
                      v-if="currentView === 'year'"
                      class="p-datepicker-decade"
                    >
                      <slot
                        name="decade"
                        :years="optionsYearPicker"
                      > {{ optionsYearPicker[0] }} - {{ optionsYearPicker[optionsYearPicker.length - 1] }} </slot>
                    </span>
                  </div>
                  <Button
                    v-show="showOtherMonths ? (numberOfMonths === 1 ? true : groupIndex === numberOfMonths - 1) : false"
                    class="p-datepicker-next p-link"
                    type="button"
                    :aria-label="currentView === 'year' ? locale.nextDecade : currentView === 'month' ? locale.nextYear : locale.nextMonth"
                    @click="onNextButtonClick"
                  >
                    <span class="p-datepicker-next-icon pi pi-chevron-right" />
                  </Button>
                </div>
                <div
                  v-if="currentView === 'date'"
                  class="p-datepicker-calendar-container"
                >
                  <table
                    class="p-datepicker-calendar"
                    role="grid"
                  >
                    <thead>
                      <tr>
                        <th
                          v-if="showWeek"
                          scope="col"
                          class="p-datepicker-weekheader p-disabled"
                        >
                          <span>{{ labelWeekHeader }}</span>
                        </th>
                        <th
                          v-for="weekDay of optionsWeekDays()"
                          :key="weekDay"
                          scope="col"
                          :abbr="weekDay"
                        >
                          <span>{{ weekDay }}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(week, i) of month.dates"
                        :key="`${week[0].day}${week[0].month}`"
                      >
                        <td
                          v-if="showWeek"
                          class="p-datepicker-weeknumber"
                        >
                          <span class="p-disabled">
                            <span
                              v-if="month.weekNumbers[i] < 10"
                              style="visibility: hidden"
                            >0</span>
                            {{ month.weekNumbers[i] }}
                          </span>
                        </td>
                        <td
                          v-for="date of week"
                          :key="`${date.day}${date.month}`"
                          :aria-label="date.day"
                          :class="{ 'p-datepicker-other-month': date.otherMonth, 'p-datepicker-today': date.today }"
                        >
                          <span

                            :class="{ 'p-highlight': isSelected(date), 'p-disabled': !date.selectable }"
                            draggable="false"
                            :aria-selected="isSelected(date)"
                            @click="onDateSelect($event, date)"
                            @keydown="onDateCellKeydown($event, date, groupIndex)"
                          >
                            <slot
                              name="date"
                              :date="date"
                            >{{ date.day }}</slot>
                          </span>
                          <div
                            v-if="isSelected(date)"
                            class="p-hidden-accessible"
                            aria-live="polite"
                          >
                            {{ date.day }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              v-if="currentView === 'month'"
              class="p-monthpicker"
            >
              <span
                v-for="(m, i) of optionsMonthPicker()"
                :key="m"
                class="p-monthpicker-month"
                :class="{ 'p-highlight': isMonthSelected(i) }"
                @click="onMonthSelect($event, i)"
                @keydown="onMonthCellKeydown($event, i)"
              >
                {{ m }}
                <div
                  v-if="isMonthSelected(i)"
                  class="p-hidden-accessible"
                  aria-live="polite"
                >
                  {{ m }}
                </div>
              </span>
            </div>
            <div
              v-if="currentView === 'year'"
              class="p-yearpicker"
            >
              <span
                v-for="y of optionsYearPicker()"
                :key="y"

                class="p-yearpicker-year"
                :class="{ 'p-highlight': isYearSelected(y) }"
                @click="onYearSelect($event, y)"
                @keydown="onYearCellKeydown($event, y)"
              >
                {{ y }}
                <div
                  v-if="isYearSelected(y)"
                  class="p-hidden-accessible"
                  aria-live="polite"
                >
                  {{ y }}
                </div>
              </span>
            </div>
          </template>
          <div
            v-if="(showTime || timeOnly) && currentView === 'date'"
            class="p-timepicker"
          >
            <div class="p-hour-picker">
              <Button
                class="p-link"
                :aria-label="locale.nextHour"
                type="button"
                @mousedown="onTimePickerElementMouseDown($event, 0, 1)"
                @mouseup="onTimePickerElementMouseUp($event)"
                @keydown="onContainerButtonKeydown"
                @mouseleave="onTimePickerElementMouseLeave()"
                @keydown.enter="onTimePickerElementMouseDown($event, 0, 1)"
                @keydown.space="onTimePickerElementMouseDown($event, 0, 1)"
                @keyup.enter="onTimePickerElementMouseUp($event)"
                @keyup.space="onTimePickerElementMouseUp($event)"
              >
                <span class="pi pi-chevron-up" />
              </Button>
              <span>{{ formattedCurrentHour }}</span>
              <Button
                class="p-link"
                :aria-label="locale.prevHour"
                type="button"
                @mousedown="onTimePickerElementMouseDown($event, 0, -1)"
                @mouseup="onTimePickerElementMouseUp($event)"
                @keydown="onContainerButtonKeydown"
                @mouseleave="onTimePickerElementMouseLeave()"
                @keydown.enter="onTimePickerElementMouseDown($event, 0, -1)"
                @keydown.space="onTimePickerElementMouseDown($event, 0, -1)"
                @keyup.enter="onTimePickerElementMouseUp($event)"
                @keyup.space="onTimePickerElementMouseUp($event)"
              >
                <span class="pi pi-chevron-down" />
              </Button>
            </div>
            <div class="p-separator">
              <span>{{ timeSeparator }}</span>
            </div>
            <div class="p-minute-picker">
              <Button
                class="p-link"
                :aria-label="locale.nextMinute"
                :disabled="props.disabled"
                type="button"
                @mousedown="onTimePickerElementMouseDown($event, 1, 1)"
                @mouseup="onTimePickerElementMouseUp($event)"
                @keydown="onContainerButtonKeydown"
                @mouseleave="onTimePickerElementMouseLeave()"
                @keydown.enter="onTimePickerElementMouseDown($event, 1, 1)"
                @keydown.space="onTimePickerElementMouseDown($event, 1, 1)"
                @keyup.enter="onTimePickerElementMouseUp($event)"
                @keyup.space="onTimePickerElementMouseUp($event)"
              >
                <span class="pi pi-chevron-up" />
              </Button>
              <span>{{ formattedCurrentMinute }}</span>
              <Button
                class="p-link"
                :aria-label="locale.prevMinute"
                type="button"
                @mousedown="onTimePickerElementMouseDown($event, 1, -1)"
                @mouseup="onTimePickerElementMouseUp($event)"
                @keydown="onContainerButtonKeydown"
                @mouseleave="onTimePickerElementMouseLeave()"
                @keydown.enter="onTimePickerElementMouseDown($event, 1, -1)"
                @keydown.space="onTimePickerElementMouseDown($event, 1, -1)"
                @keyup.enter="onTimePickerElementMouseUp($event)"
                @keyup.space="onTimePickerElementMouseUp($event)"
              >
                <span class="pi pi-chevron-down" />
              </Button>
            </div>
            <div
              v-if="showSeconds"
              class="p-separator"
            >
              <span>{{ timeSeparator }}</span>
            </div>
            <div
              v-if="showSeconds"
              class="p-second-picker"
            >
              <Button
                class="p-link"
                :aria-label="locale.nextSecond"
                type="button"
                @mousedown="onTimePickerElementMouseDown($event, 2, 1)"
                @mouseup="onTimePickerElementMouseUp($event)"
                @keydown="onContainerButtonKeydown"
                @mouseleave="onTimePickerElementMouseLeave()"
                @keydown.enter="onTimePickerElementMouseDown($event, 2, 1)"
                @keydown.space="onTimePickerElementMouseDown($event, 2, 1)"
                @keyup.enter="onTimePickerElementMouseUp($event)"
                @keyup.space="onTimePickerElementMouseUp($event)"
              >
                <span class="pi pi-chevron-up" />
              </Button>
              <span>{{ formattedCurrentSecond }}</span>
              <Button
                class="p-link"
                :aria-label="locale.prevSecond"
                type="button"
                @mousedown="onTimePickerElementMouseDown($event, 2, -1)"
                @mouseup="onTimePickerElementMouseUp($event)"
                @keydown="onContainerButtonKeydown"
                @mouseleave="onTimePickerElementMouseLeave()"
                @keydown.enter="onTimePickerElementMouseDown($event, 2, -1)"
                @keydown.space="onTimePickerElementMouseDown($event, 2, -1)"
                @keyup.enter="onTimePickerElementMouseUp($event)"
                @keyup.space="onTimePickerElementMouseUp($event)"
              >
                <span class="pi pi-chevron-down" />
              </Button>
            </div>
            <div
              v-if="hourFormat === '12'"
              class="p-separator"
            >
              <span>{{ timeSeparator }}</span>
            </div>
            <div
              v-if="hourFormat === '12'"
              class="p-ampm-picker"
            >
              <Button
                class="p-link"
                :aria-label="locale.am"
                type="button"
                @click="toggleAMPM()"
              >
                <span class="pi pi-chevron-up" />
              </Button>
              <span>{{ pm ? 'PM' : 'AM' }}</span>
              <Button
                class="p-link"
                :aria-label="locale.pm"
                type="button"
                @click="toggleAMPM"
              >
                <span class="pi pi-chevron-down" />
              </Button>
            </div>
          </div>
          <div
            v-if="showButtonBar"
            class="p-datepicker-buttonbar"
          >
            <!--            <CalendarButton -->
            <!--              type="button" -->
            <!--              :label="todayLabel" -->
            <!--              class="p-button-text" -->
            <!--              @click="onTodayButtonClick($event)" -->
            <!--              @keydown="onContainerButtonKeydown" -->
            <!--            /> -->
            <!--            <CalendarButton -->
            <!--              type="button" -->
            <!--              :label="clearLabel" -->
            <!--              class="p-button-text" -->
            <!--              @click="onClearButtonClick($event)" -->
            <!--              @keydown="onContainerButtonKeydown" -->
            <!--            /> -->
          </div>
          <slot name="footer" />
        </div>
      </transition>
    </teleport>
  </span>
</template>

<style scoped>
.p-calendar {
  position: relative;
  display: inline-flex;
  max-width: 100%;
}

.p-calendar .p-inputtext {
  flex: 1 1 auto;
  width: 1%;
}

.p-calendar-w-btn .p-inputtext {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.p-calendar-w-btn .p-datepicker-trigger {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Fluid */
.p-fluid .p-calendar {
  display: flex;
}

.p-fluid .p-calendar .p-inputtext {
  width: 1%;
}

/* Datepicker */
.p-calendar .p-datepicker {
  min-width: 100%;
}

.p-datepicker {
  width: auto;
  position: absolute;
  top: 0;
  left: 0;
}

.p-datepicker-inline {
  display: inline-block;
  position: static;
  overflow-x: auto;
}

/* Header */
.p-datepicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.p-datepicker-header .p-datepicker-title {
  margin: 0 auto;
}

.p-datepicker-prev,
.p-datepicker-next {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

/* Multiple Month DatePicker */
.p-datepicker-multiple-month .p-datepicker-group-container {
  display: flex;
}

.p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group {
  flex: 1 1 auto;
}

/* DatePicker Table */
.p-datepicker table {
  width: 100%;
  border-collapse: collapse;
}

.p-datepicker td > span {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

/* Month Picker */
.p-monthpicker-month {
  width: 33.3%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

/* Year Picker */
.p-yearpicker-year {
  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

/*  Button Bar */
.p-datepicker-buttonbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Time Picker */
.p-timepicker {
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-timepicker button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.p-timepicker > div {
  display: flex;
  align-items: center;
  flex-direction: column;
}

/* Touch UI */
.p-datepicker-touch-ui,
.p-calendar .p-datepicker-touch-ui {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 80vw;
  transform: translate(-50%, -50%);
}
</style>
