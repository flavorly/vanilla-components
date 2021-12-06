# Rich Radio Group

Phone number input with Country code and Phone Number, supports country code and full number out of the box

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop        | Description                                      | Accepted Values    | Default     |
|:------------|:-------------------------------------------------|:-------------------|:------------|
| `options`   | Array/Object of options                          | `Boolean`, `Array` | `undefined` |
| `separated` | If wants the options separated or stick together | `Boolean`          | `false`     |
| `radio`     | If you want a radio button or a SVG icon         | `Boolean`          | `false`     |
| `dark`      | If dark mode is enable/disable                   | `Boolean`          | `true`      |

## Slots

Slots Available for this Component

| Event    | Description              | Parameters            |
|:---------|:-------------------------|:----------------------|
| `label`  | Slot to change the label | `none`                |
| `query`  | Slot to change the label | `query`, `searchable` |
| `option` | Slot the option template | `query`, `searchable` |

## Example

```vue
<template>
  <vanilla-input-radio-group
      :options="options"
      :separted="true"
      :dark="false"
      layout="naked"
      v-model="value"
  />
  <pre>{{ JSON.stringify(value) }}</pre>
</template>
<script>
import {VanillaInputRadioGroup} from "@vanilla-components";
export default {
  components: {
    VanillaInputRadioGroup
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
<wrapper src="inputs/radio-group/demo" />
