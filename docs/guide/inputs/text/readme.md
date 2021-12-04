# Text Input

Native text component gives you the ability to write text and number hein, how amazing isnt it?

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop          | Description                | Accepted Values | Default |
|:--------------|:---------------------------|:----------------|:--------|
| `placeholder` | Placeholder for this input | String          | `''`    |

## Events

Events Emmit for this Component

| Event        | Description   | Parameters |
|:-------------|:--------------|:-----------|
| `modelValue` | Value emitted | `$event`   |

## Slots

Slots Available for this Component

| Event | Description | Parameters |
|:------|:------------|:-----------|
!!!include(./docs/guide/includes/slots-default.md)!!!

## Example
```vue
<template>
    <vanilla-input-text
        class="inline-flex"
        layout="naked"
        placeholder="Elon Musk"
        v-model="value"
        helper="Write your first and last name"
    />
</template>
<script>
import {VanillaInputText} from "@vanilla-components";
export default {
  components: {
    VanillaInputText
  },
  data(){
    return {
      value: null,
    }
  }
}
</script>
```

## Preview
<wrapper src="inputs/text/demo" />
