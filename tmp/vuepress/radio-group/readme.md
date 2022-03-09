# Rich Radio Group

Phone number input with Country code and Phone Number, supports country code and full number out of the box

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop        | Description                                      | Accepted Values   | Default     |
|:------------|:-------------------------------------------------|:------------------|:------------|
| `options`   | Array/Object of options                          | `Object`, `array` | `undefined` |
| `separated` | Separate the table options with a little padding | `Boolean`         | `false`     |
| `radio`     | Radio Styled Checkboxes or SVG Icon              | `Boolean`         | `false`     |
| `compact`   | Compact style of the Radio                       | `Boolean`         | `false`     |

## Slots

Slots Available for this Component

| Event               | Description                        | Parameters          |
|:--------------------|:-----------------------------------|:--------------------|
!!!include(./docs/guide/includes/slots-default.md)!!!
| `option`            | Slot for the Options item          | `option`, `checked` |
| `optionLabel`       | Slot for the Options Label         | `option`, `checked` |
| `optionDescription` | Slot for the Options Description   | `option`, `checked` |
| `iconSVG`           | Slot for the Icon if its not Radio | `checked`, `dark`   |
| `iconRadio`         | Slot for the Icon if its Radio     | `checked`, `dark`   |


## Options

Options should contain a specific structure, we could leave this to your own choice, but the whole point of this package
is to simplify your life, you are free tho, if you want to modify the default behaviour of this package and use your own structure, just
make sure to also override the slots `option`and `selected` to align with your own logic.

The following key/values are available by default


| key           | value                                                               |
|:--------------|:--------------------------------------------------------------------|
| `value`       | The value for your v-model                                          |
| `label`       | Main Label for this this option                                     |
| `description` | Additional description to show bellow the option, supports html     |

```js
const options = [
    { value: 'Option 1', label: 'One Option'},
    { value: 'Option 2', label: 'Two Options'},
    { value: {foo: 'bar'}, label: 'Complex Object'},
    { value: 'Option 2', label: 'Two Options', description: 'This is my option description'},
    { value: 'Option 2', label: 'Two Options', description: 'red'},
]
```

## Example

```vue
<template>
  <vanilla-input-radio-group
      :options="options"
      :separted="true"
      :compact="false"
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
