# Toggle Input

Beautiful toggles

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
| `labelBefore` | Change Label to show before the toggle | `label` |
| `labelAfter` | Change Label to show after | `label` |
| `checked` | Checked Icon | `none` |
| `unchecked` | UnChecked Icon | `none` |


## Example
```vue
<template>
    <!-- Simple example with true/false -->
    <vanilla-input-toggle
        class="inline-flex"
        layout="naked"
        v-model="value"
        helper="Write your first and last name"
    />
    
    <!-- Multiple Values to Array -->
    <vanilla-input-toggle
        v-model="valueMultiple"
        :value="'foo'"
        layout="naked"
    />
    <vanilla-input-toggle
        v-model="valueMultiple"
        :value="'bar'"
        layout="naked"
    />

    <pre>{{ JSON.stringify(valueMultiple) }}</pre>

    <!-- With custom Values -->
    <vanilla-input-toggle
        v-model="valueWithError"
        :value="'checked'"
        placeholder="Type to clear errors"
        layout="naked"
        :true-value="'checked'"
        :false-value="'unchecked'"
        :errors="'Sorry, option already taken'"
    />
</template>
<script>
import {VanillaInputToggle} from "@vanilla-components";
export default {
  components: {
      VanillaInputToggle
  },
  data(){
    return {
        value: true,
        valueMultiple: ['foo'],
        valueWithError: 'checked',
    }
  }
}
</script>
```

## Preview
<wrapper src="inputs/toggle/demo" />
