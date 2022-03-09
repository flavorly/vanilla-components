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

## Example & Snippet
:::demo
```vue
<template>
    <VanillaCheckbox 
        v-model="value"
    />
</template>
<script lang="ts">
import { VanillaCheckbox } from '@vanilla-components';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
		    VanillaCheckbox
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
<wrapper src="components/Checkbox/demo" />
