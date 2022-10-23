---
outline: deep
---

# Textarea

A Native `<textarea />` for long text, comments, etc.

!!!include(./src/parts/title-preview.md)!!!

<ExampleTextarea />

:::details :surfer: Click to expand the code
<<< @/components/ExampleTextarea.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop         | Description                     | Accepted Values | Default     |
|:-------------|:--------------------------------|:----------------|:------------|
| `modelValue` | The value for the element       | `Any`           | `undefined` |
| `rows`       | Number of rows for the textarea | `Number`        | `4`         |


!!!include(./src/parts/title-slots.md)!!!

!!!include(./src/parts/default-slots.md)!!!

!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
!!!include(./src/parts/events-model-value.md)!!!




<script>
    import ExampleTextarea from "../../components/ExampleTextarea.vue";
    export default {
        components: {ExampleTextarea}
    }
</script>
