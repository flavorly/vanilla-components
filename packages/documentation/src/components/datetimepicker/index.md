---
outline: deep
---

# Datetime Picker

A date time picker bootstrap by [VCalendar](https://vcalendar.io/). Styled and aligned with your current theme & styles from vanilla components.
This component is just a wrapper around the original component with a few tweaks to make it work with vanilla components & provide a smoother expirience for daily usage
So expect the same props, slots, events & more.

:::warning
This is NOT an office vanilla components component, a full-fledged date time picker takes a lot of effort, so we have have just bootstrapped this one for now :)
There are plans to port an official datetime picker. But meanwhile enjoy this amazing experience by V-Calendar!

**Note:** Please keep in mind for this case you must include the CSS file. Please check the [theme](#theme-styles)
:::

### Install V-Calendar

Start by installing the [VCalendar](https://vcalendar.io/) for this case we will be using the @next branch, that brings support to vue 3
and will soon be refactored properly to composition API. Please follow the V-Calendar installation guide for more details.

```bash
# Using pnpm
pnpm add v-calendar@next
# Using Yarn
yarn add v-calendar@next
# Using npm
npm add v-calendar@next
```


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

All the default slots of [VCalendar](https://vcalendar.io/api/v1.0/datepicker.html#scoped-slots) are available normally for usage.
The default slot is pre-filled, please check bellow.

### Slot `default`

This is the default slot of the component, by default a [Vanilla Text Input](/components/input) is used to display the value.
But you are free to use whatever you want for this slot, the slot is also forwarded to the V-Calendar component.

| Attribute   | Description      | Type     |
|:------------|:-----------------|:---------|
| `className` | Classes injected | `String` |


## Theme & Styles



