---
outline: deep
---

# Dropdown

A dropdown component based on [HeadlessUI](https://headlessui.com). It is used to display a list of options that can be selected or menus.
You can also leverage this dropdown to create new components, we currently provide 2 dropdowns, one based on HeadlessUI
and another totally done from scratch that provides way more control over the dropdown. The API is pretty similar between both.

!!!include(./src/parts/title-preview.md)!!!

<script setup>
    import ExampleDropdown from './ExampleDropdown.vue';
</script>

<ExampleDropdown />

:::details :surfer: Click to expand the code
<<< @/components/dropdown/ExampleDropdown.vue
:::


!!!include(./src/parts/title-props.md)!!!

### Dropdown Menu Props

Bellow are the props for the Dropdown Menu component based on Headless UI

| Prop              | Description                                     | Accepted Values | Default     |
|:------------------|:------------------------------------------------|:----------------|:------------|
| `modelValue`      | The value for the dropdown                      | `true`, `false` | `false`     |
| `text`            | The label for the button                        | `String`        | `undefined` |
| `buttonVariant`   | The variant for the button                      | `String`        | `undefined` |
| `teleport`        | If we should teleport the dropdown              | `Boolean`       | `true`      |
| `teleportTo`      | Element to teleport                             | `string`        | `body`      |
| `tagName`         | The tag for the trigger button                  | `string`        | `div`       |
| `dropdownTagName` | The tag for the trigger button                  | `string`        | `div`       |
| `disabled`        | Disable or enable the trigger                   | `Boolean`       | `false`     |
| `toggleOnFocus`   | Toggle the dropdown on Focus                    | `Boolean`       | `true`      |
| `toggleOnClick`   | Toggle the dropdown on Click                    | `Boolean`       | `true`      |
| `toggleOnHover`   | Toggle the dropdown on Hover                    | `Boolean`       | `false`     |
| `placement`       | The placement of the dropdown ( Popper )        | `string`        | `undefined` |
| `usePopper`       | If we should use Popper to place the dropdown   | `Boolean`       | `true`      |
| `overlay`         | Focus the dropdown by adding a overlay          | `Boolean`       | `false`     |
| `spacedItems`     | Space the items inside the dropdown             | `Boolean`       | `true`      |
| `showArrow`       | Show the dropdown arrow relative to the trigger | `Boolean`       | `false`     |
| `size`            | The size of the dropdown                        | `string`        | `default`   |
| `position`        | The alignment/position of the trigger           | `string`        | `center`    |

### Dropdown Props

Bellow are the props for the Dropdown component, totally vanilla implementation


| Prop                 | Description                                      | Accepted Values | Default     |
|:---------------------|:-------------------------------------------------|:----------------|:------------|
| `modelValue`         | The value for the dropdown                       | `true`, `false` | `false`     |
| `text`               | The label for the button                         | `String`        | `undefined` |
| `teleport`           | If we should teleport the dropdown               | `Boolean`       | `true`      |
| `teleportTo`         | Element to teleport                              | `string`        | `body`      |
| `tagName`            | The tag for the trigger button                   | `string`        | `div`       |
| `dropdownTagName`    | The tag for the trigger button                   | `string`        | `div`       |
| `dropdownAttributes` | Extra attributes for the dropdown                | `Object`        | `undefined` |
| `disabled`           | Disable or enable the trigger                    | `Boolean`       | `false`     |
| `toggleOnFocus`      | Toggle the dropdown on Focus                     | `Boolean`       | `true`      |
| `toggleOnClick`      | Toggle the dropdown on Click                     | `Boolean`       | `true`      |
| `toggleOnHover`      | Toggle the dropdown on Hover                     | `Boolean`       | `false`     |
| `closeOnClickAway`   | If we should close the dropdown on clicking away | `Boolean`       | `true`      |
| `placement`          | The placement of the dropdown ( Popper )         | `string`        | `undefined` |
| `show`               | If the dropdown should start as shown            | `Boolean`       | `false`     |
| `popperOptions`      | Additional raw popper options                    | `Object`        | `undefined` |


!!!include(./src/parts/title-slots.md)!!!

### Slot `default`

Actual content to show when the trigger is clicked / hovered. This is the actual content of the dropdown

### Slot `trigger`

Slots usually used for the dropdown trigger button or any other element of your choice.


!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
!!!include(./src/parts/events-model-value.md)!!!
| `update:show` | Toggle for open | `Boolean` |
| `focus` | On Focus | `FocusEvent` |
| `blur` | On Blur | `FocusEvent` |
| `blurOnChild` | On Blur to child elements | `FocusEvent` |
| `click` | On Click | `MouseEvent` |
| `mouseover` | On Mouse Hover | `MouseEvent` |
| `mouseleave` | On Mouse Leave | `MouseEvent` |
| `touchstart` | On Touch start | `TouchEvent` |
| `shown` | When dropdown is shown | `Boolean` |
| `hidden` | When dropdown is hidden | `Boolean` |
| `beforeShow` | Before dropdown show | `Boolean` |
| `beforeHide` | Before dropdown hide | `Boolean` |
