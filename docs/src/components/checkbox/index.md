---
outline: deep
---

# Checkbox

A Native `<input type="checkbox" />` to check items or multiple items at once, once again batteries included!

!!!include(./src/parts/title-preview.md)!!!

<wrapper src="components/checkbox/demo" />

!!!include(./src/parts/title-snippet.md)!!!

<<< @/components/checkbox/ExampleCheckbox.vue

!!!include(./src/parts/title-props.md)!!!

| Prop             | Description                | Accepted Values               | Default     |
|:-----------------|:---------------------------|:------------------------------|:------------|
| `modelValue`     | The value for the element  | `Any`                         | `undefined` |
| `checked`        | Default state for checkbox | `Boolean`                     | `false`     |
| `value`          | Initial value              | `[Boolean,Any]`               | `false'`    |
| `checkedValue`   | Checked Value              | `[Boolean,Any]`               | `true'`     |
| `uncheckedValue` | Un-checked Value           | `[Boolean,Any]`               | `false'`    |
| `align`          | Position of the checkbox   | `['left', 'right', 'center']` | `left'`     |


!!!include(./src/parts/title-slots.md)!!!

!!!include(./src/parts/slots-feedback-errors.md)!!!



