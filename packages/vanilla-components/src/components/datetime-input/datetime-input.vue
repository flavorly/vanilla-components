<script setup>
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import {
  areDatesEqual,
  convertTo24Hour,
  isDateBetween,
} from './useDates'
import Button from '@/components/button/button.vue'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
import type { InputProps } from '@/components/input/config'
import { inputConfig } from '@/components/input/config'

/* eslint @typescript-eslint/no-use-before-define: ["off"] */

const props = defineProps({
  ...useVariantProps(),
  modelValue: {
    type: [String, undefined],
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

// Template Refs

// Reactive
const currentMonth = ref(null)
const currentYear = ref(null)
const currentHour = ref(null)
const currentMinute = ref(null)
const currentSecond = ref(null)
const pm = ref(null)
const focused = ref(false)
const overlayVisible = ref(false)
const currentView = ref(props.view)
const navigationState = ref(null)

const localValue = useVModel(props, 'modelValue')
const { configuration, errors, hasErrors } = useConfiguration<InputProps>(inputConfig, 'DateTimeInput', localValue)

// Computed
const isSingleSelection = computed<boolean>(() => props.selectionMode === 'single')

const isRangeSelection = computed<boolean>(() => props.selectionMode === 'range')

const isMultipleSelection = computed<boolean>(() => props.selectionMode === 'multiple')

const isEnabled = computed<boolean>(() => props?.disabled || props?.readonly)

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

// Methods - Random
const validateTime = (hour, minute, second, pm) => {
  let value = isComparable() ? localValue.value : this.viewDate
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

// Methods - Increment / Decrement

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

// Methods - Is booleans
const isComparable = () => localValue.value !== undefined && typeof props.modelValue !== 'string'

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
  event.preventDefault()

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
    if (event.shiftKey) {
      incrementYear()
    }
    else {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        incrementYear()
      }
      else {
        currentMonth.value++
      }
      emit('month-change', { month: currentMonth.value + 1, year: currentYear.value })
    }
  }
}

// Methods - Events Listeners
const onPreviousButtonClick = (event) => {
  if (props.showOtherMonths) {
    navigationState.value = { backward: true, button: true }
    navigateBackwards(event)
  }
}

const onNextButtonClick = (event) => {
  if (props.showOtherMonths) {
    navigationState.value = { backward: false, button: true }
    navForward(event)
  }
}
</script>

<template>
  <span
    :id="id"
    ref="container"
    :class="containerClass"
  >
    <input
      v-if="!inline"
      :id="inputId"
      :ref="inputRef"
      type="text"
      role="combobox"
      class="p-inputtext p-component"
      :class="[inputClass]"
      :style="inputStyle"
      :placeholder="placeholder"
      aria-autocomplete="none"
      aria-haspopup="dialog"
      :aria-expanded="overlayVisible"
      :aria-controls="panelId"
      :aria-labelledby="ariaLabelledby"
      :aria-label="ariaLabel"
      inputmode="none"
      :disabled="disabled"
      :readonly="!manualInput"
      :tabindex="0"
      v-bind="inputProps"
      @input="onInput"
      @click="onInputClick"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeyDown"
    >
    <CalendarButton
      v-if="showIcon"
      :icon="icon"
      class="p-datepicker-trigger"
      :disabled="disabled"
      type="button"
      :aria-label="$primevue.config.locale.chooseDate"
      aria-haspopup="dialog"
      :aria-expanded="overlayVisible"
      :aria-controls="panelId"
      @click="onButtonClick"
    />
    <Portal
      :append-to="appendTo"
      :disabled="inline"
    >
      <transition
        name="p-connected-overlay"
        @enter="onOverlayEnter($event)"
        @after-enter="onOverlayEnterComplete"
        @after-leave="onOverlayAfterLeave"
        @leave="onOverlayLeave"
      >
        <div
          v-if="inline || overlayVisible"
          :id="panelId"
          :ref="overlayRef"
          :class="panelStyleClass"
          :style="panelStyle"
          :role="inline ? null : 'dialog'"
          :aria-modal="inline ? null : 'true'"
          :aria-label="$primevue.config.locale.chooseDate"
          v-bind="panelProps"
          @click="onOverlayClick"
          @keydown="onOverlayKeyDown"
          @mouseup="onOverlayMouseUp"
        >
          <template v-if="!timeOnly">
            <div class="p-datepicker-group-container">
              <div
                v-for="(month, groupIndex) of months"
                :key="month.month + month.year"
                class="p-datepicker-group"
              >
                <div class="p-datepicker-header">
                  <slot name="header" />
                  <Button
                    v-show="showOtherMonths ? groupIndex === 0 : false"
                    v-ripple
                    class="p-datepicker-prev p-link"
                    type="button"
                    :disabled="disabled"
                    :aria-label="currentView === 'year' ? $primevue.config.locale.prevDecade : currentView === 'month' ? $primevue.config.locale.prevYear : $primevue.config.locale.prevMonth"
                    @click="onPrevButtonClick"
                    @keydown="onContainerButtonKeydown"
                  >
                    <span class="p-datepicker-prev-icon pi pi-chevron-left" />
                  </Button>
                  <div class="p-datepicker-title">
                    <Button
                      v-if="currentView === 'date'"
                      type="button"
                      class="p-datepicker-month p-link"
                      :disabled="switchViewButtonDisabled"
                      :aria-label="$primevue.config.locale.chooseMonth"
                      @click="switchToMonthView"
                      @keydown="onContainerButtonKeydown"
                    >
                      {{ getMonthName(month.month) }}
                    </Button>
                    <Button
                      v-if="currentView !== 'year'"
                      type="button"
                      class="p-datepicker-year p-link"
                      :disabled="switchViewButtonDisabled"
                      :aria-label="$primevue.config.locale.chooseYear"
                      @click="switchToYearView"
                      @keydown="onContainerButtonKeydown"
                    >
                      {{ getYear(month) }}
                    </Button>
                    <span
                      v-if="currentView === 'year'"
                      class="p-datepicker-decade"
                    >
                      <slot
                        name="decade"
                        :years="yearPickerValues"
                      > {{ yearPickerValues[0] }} - {{ yearPickerValues[yearPickerValues.length - 1] }} </slot>
                    </span>
                  </div>
                  <Button
                    v-show="showOtherMonths ? (numberOfMonths === 1 ? true : groupIndex === numberOfMonths - 1) : false"
                    v-ripple
                    class="p-datepicker-next p-link"
                    type="button"
                    :disabled="disabled"
                    :aria-label="currentView === 'year' ? $primevue.config.locale.nextDecade : currentView === 'month' ? $primevue.config.locale.nextYear : $primevue.config.locale.nextMonth"
                    @click="onNextButtonClick"
                    @keydown="onContainerButtonKeydown"
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
                          <span>{{ weekHeaderLabel }}</span>
                        </th>
                        <th
                          v-for="weekDay of weekDays"
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
                            v-ripple
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
                v-for="(m, i) of monthPickerValues"
                :key="m"
                v-ripple
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
                v-for="y of yearPickerValues"
                :key="y"
                v-ripple
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
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.nextHour"
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
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.prevHour"
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
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.nextMinute"
                :disabled="disabled"
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
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.prevMinute"
                :disabled="disabled"
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
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.nextSecond"
                :disabled="disabled"
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
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.prevSecond"
                :disabled="disabled"
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
              v-if="hourFormat == '12'"
              class="p-separator"
            >
              <span>{{ timeSeparator }}</span>
            </div>
            <div
              v-if="hourFormat == '12'"
              class="p-ampm-picker"
            >
              <Button
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.am"
                type="button"
                :disabled="disabled"
                @click="toggleAMPM($event)"
              >
                <span class="pi pi-chevron-up" />
              </Button>
              <span>{{ pm ? 'PM' : 'AM' }}</span>
              <Button
                v-ripple
                class="p-link"
                :aria-label="$primevue.config.locale.pm"
                type="button"
                :disabled="disabled"
                @click="toggleAMPM($event)"
              >
                <span class="pi pi-chevron-down" />
              </Button>
            </div>
          </div>
          <div
            v-if="showButtonBar"
            class="p-datepicker-buttonbar"
          >
            <CalendarButton
              type="button"
              :label="todayLabel"
              class="p-button-text"
              @click="onTodayButtonClick($event)"
              @keydown="onContainerButtonKeydown"
            />
            <CalendarButton
              type="button"
              :label="clearLabel"
              class="p-button-text"
              @click="onClearButtonClick($event)"
              @keydown="onContainerButtonKeydown"
            />
          </div>
          <slot name="footer" />
        </div>
      </transition>
    </Portal>
  </span>
</template>

<style>
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
