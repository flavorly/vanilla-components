---
outline: deep
---

# Checkbox

A Native `<input type="checkbox" />` to check items or multiple items at once, once again batteries included!

!!!include(./src/parts/title-preview.md)!!!

<script setup>
    import ExampleCheckbox from './ExampleCheckbox.vue';
</script>

<ExampleCheckbox />

:::details :surfer: Click to expand the code
<<< @/components/checkbox/ExampleCheckbox.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop             | Description                | Accepted Values                                                 | Default     |
|:-----------------|:---------------------------|:----------------------------------------------------------------|:------------|
| `modelValue`     | The value for the element  | `Any`                                                           | `undefined` |
| `checked`        | Default state for checkbox | `Boolean`                                                       | `false`     |
| `value`          | Initial value              | `[Boolean,Any]`                                                 | `false'`    |
| `checkedValue`   | Checked Value              | `[Boolean,Any]`                                                 | `true'`     |
| `uncheckedValue` | Un-checked Value           | `[Boolean,Any]`                                                 | `false'`    |
| `align`          | Position of the checkbox   | `['left-top', 'left-center', 'left-bottom','right-bottom', ..]` | `left-top'` |


!!!include(./src/parts/title-slots.md)!!!

### Slot `default`

The default slot is used to display the label of the checkbox, but you can be creative to do whatever you want.

| Attribute   | Description               | Type                         |
|:------------|:--------------------------|:-----------------------------|
!!!include(./src/parts/slots-default-binds.md)!!!


!!!include(./src/parts/slots-feedback-errors.md)!!!

!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
!!!include(./src/parts/events-model-value.md)!!!
| `click` | When element is clicked | `ClickEvent` |




