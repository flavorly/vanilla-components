---
outline: deep
---

# Checkbox

A Native `<input type="checkbox" />` to check items or multiple items at once, once again batteries included!
This wil also cover Checkbox groups!

!!!include(./src/parts/title-preview.md)!!!

<script setup>
    import ExampleCheckbox from './ExampleCheckbox.vue';
    import ExampleCheckboxGroup from './ExampleCheckboxGroup.vue';
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


## Checkbox Groups

A Checkbox group is a group of checkboxes, it's a wrapper for multiple checkboxes, it's a way to group checkboxes together.
A nice use-case for this, is whenever you want to select multiple items at once, like a list of items.


<ExampleCheckboxGroup />

:::details :surfer: Click to expand the code
<<< @/components/checkbox/ExampleCheckboxGroup.vue
:::

## Checkbox Group Props :inbox_tray:

Props available for this component extending the default variant & global props.

| Prop               | Description                              | Accepted Values | Default     |
|:-------------------|:-----------------------------------------|:----------------|:------------|
| `modelValue`       | A v-model for the elements               | `Array`         | `undefined` |
| `options`          | Array of options for the select          | `Array`         | `undefined` |
| `normalizeOptions` | Array of options already normalized      | `Array`         | `undefined` |
| `valueAttribute`   | Value Attribute key to search on options | `String`        | `undefined` |
| `textAttribute`    | Label Attribute key to search on options | `String`        | `undefined` |

### Checkbox Group Options

The options for the checkbox group, works exactly the same way as the options for [RichSelect](/components/rich-select/#options).
Passing options without any structure defined, will require you to fill the `valueAttribute` and `textAttribute` props so we can grab them from your options

Here is a small example of normalized options:

```js
[
    {
    value: 'batman',
    text: 'Batman',
    description: 'The Dark Knight',
    },
    {
        value: 'robin',
        text: 'Robin',
        description: 'The Dark Knight\'s sidekick',
    },
]
```
