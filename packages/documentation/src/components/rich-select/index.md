---
outline: deep
---

# Rich Select

A full-fledged select component with support for custom options, custom values, ajax loading, options prefetching, tags, keyboard accessibility, searching & many more.

!!!include(./src/parts/title-preview.md)!!!

<script setup>
import ExampleRichSelect from './ExampleRichSelect.vue';
</script>

<ExampleRichSelect />

!!!include(./src/parts/title-snippet.md)!!!

<<< @/components/rich-select/ExampleRichSelectPreview.vue

!!!include(./src/parts/title-props.md)!!!

| Prop          | Description                | Accepted Values | Default     |
|:--------------|:---------------------------|:----------------|:------------|
| `modelValue`  | The value for the element  | `Any`           | `undefined` |
| `placeholder` | Placeholder for this input | `String`        | `''`        |
| `type`        | Type of input              | `String`        | `'text'`    |


!!!include(./src/parts/title-slots.md)!!!



