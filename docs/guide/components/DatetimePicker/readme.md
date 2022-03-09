# Datetime Picker

Datetime picker using FlatPicker themed with Tailwindcss

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop          | Description                | Accepted Values | Default                               |
|:--------------|:---------------------------|:----------------|:--------------------------------------|
| `placeholder` | Placeholder for this input | String          | `''`                                  |
| `options`     | Flatpickr Options          | Object          | ` {enableTime: true,time_24hr: true}` |

## Events
Events Emmit for this Component

| Event        | Description                | Parameters |
|:-------------|:---------------------------|:-----------|
| `modelValue` | Value emmited              | `$event`   |
| `labelClick` | When user clicks the label | `$event`   |

## Slots

Slots Available for this Component

| Name           | Description                                     | Parameters            |
|:---------------|:------------------------------------------------|:----------------------|
!!!include(./docs/guide/includes/slots-default.md)!!!

## Options

This component supports the default FlatPicker options. Please kindly refer to the [FlatPicker documentation](https://flatpickr.js.org/options/).


## Example

```vue
<template>
    <vanilla-datetime-picker
        v-model="value"
        class="inline-flex"
        layout="naked"
        :errors="'This date is invalid'"
    />
  <pre>{{ JSON.stringify(value) }}</pre>
</template>
<script>
import {VanillaDatetimePicker} from "@vanilla-components";
export default {
  components: {
      VanillaDatetimePicker
  },
  data() {
    return {
        value: '2011-01-01 0:00:01',
    }
  }
}
</script>
```

## Preview
<wrapper src="components/DatetimePicker/demo" />
