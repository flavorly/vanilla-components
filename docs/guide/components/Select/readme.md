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
    <VanillaSelect 
        v-model="value"
        :feedback="'Im useful helper out here, choose wisely'"
        :options="options"
        placeholder="Elon Musk"
    />
</template>
<script lang="ts">
import { VanillaSelect } from '@vanilla-components';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
		    VanillaSelect
    },
    setup() {
        const value = ref(null);
        const options = [
                { value: 'Option 1', 'text': 'One Option' },
                { value: 'Option 2', text: 'Two Options' },
                { value: { nested: true, type: 'nested' }, text: 'Complex Object' },
        ];
        return {
            value,
            options
        };
    },
});
</script>
```
:::

## Preview
<wrapper src="components/Select/demo" />
