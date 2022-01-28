# Password Input

Password Input with option to show / hide password

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

| Name | Description | Parameters |
|:-----|:------------|:-----------|
!!!include(./docs/guide/includes/slots-default.md)!!!

## Example
```vue
<template>
    <vanilla-input-password
        class="inline-flex"
        layout="naked"
        placeholder="Input your secure password"
        v-model="value"
        helper="Must have at least 8 characters"
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
<wrapper src="inputs/password/demo" />
