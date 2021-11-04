# Rich Radio Group

Nice and beautiful styled radio groups based on Headless UI

## Properties

Inherits the default Layout Options and the following options:

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `options`| Array/Object of options | Object|Arra y| `undefined` |
| `search`| Function to search threw objects| Boolean|Function | `false` |
| `searchPlaceholder` | A placeholder to show while searching | `String` | `Undefined`|
| `searchable`| If the select should be searchable | `Boolean` | `true`|
| `openOnClickLabel`| If the select should open on click the label | `Boolean` | `false`|
| `noResultsLabel`| When searching and no results | `String` | `false`|

## Events

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `modelValue` | Value emmited | `$event` |
| `labelClick` | When user clicks the label | `$event` |

## Slots

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `label` | Slot to change the label | `none` |
| `query` | Slot to change the label | `query`, `searchable` |
| `option` | Slot the option template | `query`, `searchable` |

## Example

```vue
<template>
  <x-input-radio-group
      :options="options"
      layout="naked"
      v-model="value"
  />
  <pre>{{ JSON.stringify(value) }}</pre>
</template>
<script>
import {XInputRadioGroup} from "@vanilla-components";
export default {
  components: {
    XInputRadioGroup
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    options() {
      return [
        {
          value: 'paypal', 
          label: 'Paypal',
          subtext: 'Checkout using Paypal',
        },
        {
          value: 'credit-card',
          label: 'Credit Card ( Visa / Master Card )',
          subtext: 'Checkout using Stripe and use your favorite Payment provider.',
        },
      ]
    }
  }
}
</script>
```

## Preview
<x-wrapper src="input-radio-group" />
