# Text Input

Native styled Text inputs with Tailwind CSS

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

## Example & Snippet
:::demo
```vue
<template>
    <VanillaSelectCountry
        v-model="value"
        placeholder="Select your country"
    />
</template>
<script lang="ts">
import { VanillaSelectCountry } from '@vanilla-components';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
		    VanillaSelectCountry
    },
    setup() {
        const value = ref(null);
        return {
            value,
        };
    },
});
</script>
```
:::

## Preview
<wrapper src="inputs/country-select/demo" />
