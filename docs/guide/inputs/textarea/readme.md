# Textarea Input

Native styled Textarea inputs with Tailwind CSS

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop          | Description                   | Accepted Values | Default |
|:--------------|:------------------------------|:----------------|:--------|
| `placeholder` | Placeholder for this input    | String          | `''`    |
| `rows`        | Number of rows for this input | Number          | `3`     |

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
    <vanilla-textarea
        placeholder="Elon Musk"
        v-model="value"
        helper="Write your first and last name"
    />
</template>
<script>
import {VanillaInputTextarea} from "@vanilla-components";
export default {
  components: {
      VanillaInputTextarea
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
<wrapper src="inputs/textarea/demo" />
