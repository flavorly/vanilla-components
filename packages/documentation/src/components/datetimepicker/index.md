---
outline: deep
---

# Datetime Picker

A date time picker bootstrap by [VCalendar](https://vcalendar.io/). Styled and aligned with your current theme & styles from vanilla components.

:::warning
This is NOT an office vanilla components component, a full-fledged date time picker takes a lot of effort, so i have have just bootstraped this one for now :)
There are plans to port an official datetime picker. But meanwhile enjoy this amazing experience by V-Calendar!

**Note: Keep in mind that to have the correct styles you must import the theme css file.**
:::


!!!include(./src/parts/title-preview.md)!!!

<script setup>
    import ExampleDatetimePicker from './ExampleDatetimePicker.vue';
</script>

<ExampleDatetimePicker />

!!!include(./src/parts/title-snippet.md)!!!

<<< @/components/datetimepicker/ExampleDatetimePicker.vue

!!!include(./src/parts/title-props.md)!!!

| Prop         | Description               | Accepted Values | Default     |
|:-------------|:--------------------------|:----------------|:------------|
| `modelValue` | The value for the element | `Any`           | `undefined` |
| `options`    | Flatpickr Options         | `Object`        | `undefined` |
| `type`       | Type of input             | `String`        | `'text'`    |


!!!include(./src/parts/title-slots.md)!!!

!!!include(./src/parts/default-slots.md)!!!



