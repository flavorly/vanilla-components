---
outline: deep
---

# Input

A Native `<input />` for text, number, etc. with additional features for password input with hide & show button.

<!--@include: ./parts/title-preview.md-->

<ExampleInput />

:::details :surfer: Click to expand the code
<<< @/components/ExampleInput.vue
:::

<!--@include: ./parts/title-props.md-->

| Prop          | Description                | Accepted Values | Default     |
|:--------------|:---------------------------|:----------------|:------------|
| `modelValue`  | The value for the element  | `Any`           | `undefined` |
| `placeholder` | Placeholder for this input | `String`        | `''`        |
| `type`        | Type of input              | `String`        | `'text'`    |


<!--@include: ./parts/title-slots.md-->

<!--@include: ./parts/default-slots.md-->

<!--@include: ./parts/title-events.md-->

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
<!--@include: ./parts/events-model-value.md-->



