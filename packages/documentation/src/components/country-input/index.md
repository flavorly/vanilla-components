---
outline: deep
---

# Country Input

A `<RichSelect />` made only to pick a list of countries with beautiful flags for each country. Add your favorite countries & search for other countries. 

!!!include(./src/parts/title-preview.md)!!!

<script setup>
import Demo from './demo.vue';
</script>

<Demo />

!!!include(./src/parts/title-snippet.md)!!!

<<< @/components/country-input/demo.vue

!!!include(./src/parts/title-props.md)!!!

| Prop          | Description                | Accepted Values | Default     |
|:--------------|:---------------------------|:----------------|:------------|
| `modelValue`  | The value for the element  | `Any`           | `undefined` |
| `placeholder` | Placeholder for this input | `String`        | `''`        |
| `type`        | Type of input              | `String`        | `'text'`    |


!!!include(./src/parts/title-slots.md)!!!

!!!include(./src/parts/default-slots.md)!!!



