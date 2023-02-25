---
outline: deep
---

# Textarea

A Native `<textarea />` for long text, comments, etc.

<!--@include: ./parts/title-preview.md-->

<ExampleTextarea />

:::details :surfer: Click to expand the code
<<< @/components/ExampleTextarea.vue
:::

<!--@include: ./parts/title-props.md-->

| Prop         | Description                     | Accepted Values | Default     |
|:-------------|:--------------------------------|:----------------|:------------|
| `modelValue` | The value for the element       | `Any`           | `undefined` |
| `rows`       | Number of rows for the textarea | `Number`        | `4`         |


<!--@include: ./parts/title-slots.md-->

<!--@include: ./parts/default-slots.md-->

<!--@include: ./parts/title-events.md-->

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
<!--@include: ./parts/events-model-value.md-->




<script>
    import ExampleTextarea from "../../components/ExampleTextarea.vue";
    export default {
        components: {ExampleTextarea}
    }
</script>
