---
outline: deep
---

# Select

A Native `<select />` support regular options, multiple & many more.

<!--@include: ../../parts/title-preview.md-->

<ExampleSelect />

:::details :surfer: Click to expand the code
<<< @/components/ExampleSelect.vue
:::

<!--@include: ../../parts/title-props.md-->


| Prop               | Description                                       | Type      | Default            |
|:-------------------|:--------------------------------------------------|:----------|:-------------------|
| `modelValue`       | The value for the element                         | `Any`     | `undefined`        |
| `name`             | The name for the actual underlying select         | `String`  | `''`               |
| `options`          | Array of options for the select                   | `Array`   | `undefined`        |
| `normalizeOptions` | If we should normalize the options                | `Array`   | `undefined`        |
| `multiple`         | Allow/Deny multiple selections                    | `Boolean` | `false`            |
| `disabled`         | Disable the select                                | `Boolean` | `false`            |
| `showEmpty`        | Show a empty placeholder when nothing is selected | `Boolean` | `true`             |
| `placeholder`      | Placeholder for when no options are shown         | `String`  | `Select an option` |
| `empty`            | The object or value when nothing is selected      | `String`  | `undefined`        |


<!--@include: ../../parts/title-slots.md-->

By default all slots get all the props and configuration from the component.

### Slot `option`

This slot is used to render each option, please keep mind if you override this slot
You must also make sure to support nested/children elements for groups.
If you are looking for a select with more options please checkout the [RichSelect](/guide/components/rich-select) component.

| Attribute       | Description                                  | Type              |
|:----------------|:---------------------------------------------|:------------------|
| `option`        | The actual option on the loop                | `Object`, `Array` |
| `safe`          | If its save to print HTML or we should scape | `Boolean`         |

<!--@include: ../../parts/default-slots.md-->


<!--@include: ../../parts/title-events.md-->

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
<!--@include: ../../parts/events-model-value.md-->
