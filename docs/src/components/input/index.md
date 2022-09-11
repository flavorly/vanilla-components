---
outline: deep
---

# Input

A Native `<input />` for text, number, etc. with additional features for password input with hide & show button.

!!!include(./src/_includes/title-preview.md)!!!

<script setup>
import ExampleInput from './ExampleInput.vue';
</script>


<ExampleInput />

!!!include(./src/_includes/title-snippet.md)!!!

<<< @/components/input/ExampleInput.vue

!!!include(./src/_includes/title-props.md)!!!

| Prop          | Description                | Accepted Values | Default     |
|:--------------|:---------------------------|:----------------|:------------|
| `modelValue`  | The value for the element  | `Any`           | `undefined` |
| `placeholder` | Placeholder for this input | `String`        | `''`        |
| `type`        | Type of input              | `String`        | `'text'`    |


!!!include(./src/_includes/title-slots.md)!!!

!!!include(./src/_includes/default-slots.md)!!!



