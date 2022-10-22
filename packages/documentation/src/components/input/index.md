---
outline: deep
---

# Input

A Native `<input />` for text, number, etc. with additional features for password input with hide & show button.

!!!include(./src/parts/title-preview.md)!!!

<script setup>
import ExampleInput from './ExampleInput.vue';
</script>

<ExampleInput />

:::details :surfer: Click to expand the code
<<< @/components/input/ExampleInput.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop          | Description                | Accepted Values | Default     |
|:--------------|:---------------------------|:----------------|:------------|
| `modelValue`  | The value for the element  | `Any`           | `undefined` |
| `placeholder` | Placeholder for this input | `String`        | `''`        |
| `type`        | Type of input              | `String`        | `'text'`    |


!!!include(./src/parts/title-slots.md)!!!

!!!include(./src/parts/default-slots.md)!!!

!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
!!!include(./src/parts/events-model-value.md)!!!



