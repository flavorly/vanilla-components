---
outline: deep
---

# Phone Input

A Native Input dedicated to Mobile & Local Phone numbers, includes a beautiful country picker and a native input.
Exports the national number, local number & country code for flexible & easier way to validate on the backend.

!!!include(./src/parts/title-preview.md)!!!

<script setup>
import Demo from './demo.vue';
</script>

<Demo />

!!!include(./src/parts/title-snippet.md)!!!

<<< @/components/phone-input/demo.vue

!!!include(./src/parts/title-props.md)!!!

| Prop          | Description                | Accepted Values | Default     |
|:--------------|:---------------------------|:----------------|:------------|
| `modelValue`  | The value for the element  | `Any`           | `undefined` |
| `placeholder` | Placeholder for this input | `String`        | `''`        |
| `type`        | Type of input              | `String`        | `'text'`    |


!!!include(./src/parts/title-slots.md)!!!

!!!include(./src/parts/default-slots.md)!!!



