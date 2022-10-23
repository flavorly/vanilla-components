---
outline: deep
---

# Dialog

A Dialog component is a modal window that can be used to display information or ask for user input. It is a wrapper around the Headless UI Dialog component.

!!!include(./src/parts/title-preview.md)!!!

<ExampleDialog />

:::details :surfer: Click to expand the code
<<< @/components/ExampleDialog.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop                      | Description                                    | Accepted Values                           | Default     |
|:--------------------------|:-----------------------------------------------|:------------------------------------------|:------------|
| `modelValue`              | Controls the open/close of the dialog          | `Boolean`                                 | `false`     |
| `title`                   | A title for the dialog                         | `String`                                  | `undefined` |
| `teleport`                | If we should teleport the dropdown             | `Boolean`                                 | `true`      |
| `teleportTo`              | Element to teleport                            | `string`                                  | `body`      |
| `closeableOnClickOutside` | Clicking outside closes the slideover          | `Boolean`                                 | `true`      |
| `overlay`                 | Adds a overlay behind the slideover            | `Boolean`                                 | `true`      |
| `closeable`               | If we should allow open/close the slideover    | `Boolean`                                 | `true`      |
| `closeableOnPressEscape`  | Keyboard ESC closes the slideover              | `Boolean`                                 | `true`      |
| `paddingOnModal`          | Give padding to the whole modal                | `Boolean`                                 | `true`      |
| `bodyDivided`             | Divide the items inside the body               | `Boolean`                                 | `false`     |
| `bodyDarker`              | Darkens the modal body, for easier reading     | `Boolean`                                 | `false`     |
| `bodyWithPadding`         | Gives a slight padding to the whole modal body | `Boolean`                                 | `false`     |
| `bodyClasses`             | Additional classes for the modal body          | `String`                                  | `undefined` |
| `divided`                 | Divide header, body & footer                   | `Boolean`                                 | `true`      |
| `as`                      | Render the modal as this element               | `String`                                  | `div`       |
| `size`                    | Size of the modal                              | `default`,`small`,`medium`,`large`,`full` | `default`   |



!!!include(./src/parts/title-slots.md)!!!

### Slot `default`

Actual content to show inside the modal

### Slot `header`

Header part of the modal, usually used to place the title or/and subtitle.

### Slot `footer`

Footer part of the modal, usually used to place buttons or actions.


!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
!!!include(./src/parts/events-model-value.md)!!!
| `open` | Slideover was opened | `Boolean` |
| `close` | Slideover was closed | `Boolean` |

:::warning :bulb: A note on closing and open
The `open` and `close` events are emitted when the slideover is opened or closed, but the `modelValue` is not updated yet.
It will take a few milliseconds in order to circumvent the `transition` effect and provide a smooth experience.
:::


## Additional Components

Because this is mostly a wrapper around HeadlessUI, you can still use the native headlessUI compoments like `DialogTitle` to achieve any accessibility needs.

### Footer

The dialog footer component is a smart component that will take from 1 to 3 items and will divide them in a smart way.
This is really useful when you have one or more actions on the dialog, it will make sure to apply the correct grid.

