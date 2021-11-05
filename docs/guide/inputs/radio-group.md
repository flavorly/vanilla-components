# Rich Radio Group

Nice and beautiful styled radio groups based on Headless UI

## Properties

Inherits the default Layout Options and the following options:

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `options`| Array/Object of options | Object|Array | `undefined` |
| `separated`| If wants the options separated or stick together | Boolean | `false` |
| `radio` | If you want a radio button or a SVG icon | `Boolean` | `false`|
| `dark`| If dark mode is enable/disable | `Boolean` | `true`|

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
      :separted="true"
      :dark="false"
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
          description: 'Checkout using Paypal',
        },
        {
          value: 'credit-card',
          label: 'Credit Card ( Visa / Master Card )',
          description: 'Checkout using Stripe and use your favorite Payment provider.',
        },
      ]
    }
  }
}
</script>
```

## Preview
<x-wrapper src="input-radio-group" />
