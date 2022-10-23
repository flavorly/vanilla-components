---
outline: deep
---

# Slideover

A dialog with a slideover behaviour backed by HeadlessUI dialogs :smile:
Useful to display additional context from the edges of the screen.

!!!include(./src/parts/title-preview.md)!!!

<ExampleSlideover />

:::details :surfer: Click to expand the code
<<< @/components/ExampleSlideover.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop                      | Description                                          | Accepted Values                   | Default     |
|:--------------------------|:-----------------------------------------------------|:----------------------------------|:------------|
| `modelValue`              | Show or hide the slideover                           | `Boolean`                         | `false`     |
| `title`                   | Title for the Slideover                              | `String`                          | `undefined` |
| `subtitle`                | Subtitle for the Slideover                           | `String`                          | `undefined` |
| `teleport`                | If we should teleport                                | `Boolean`                         | `true`      |
| `teleportTo`              | Element or ref to teleport into                      | `String`                          | `body`      |
| `overlay`                 | Adds a overlay behind the slideover                  | `Boolean`                         | `true`      |
| `closeable`               | If we should allow open/close the slideover          | `Boolean`                         | `true`      |
| `closeableOnClickOutside` | Clicking outside closes the slideover                | `Boolean`                         | `true`      |
| `closeableOnPressEscape`  | Keyboard ESC closes the slideover                    | `Boolean`                         | `true`      |
| `paddingOnBody`           | Give padding to the whole slideover                  | `Boolean`                         | `true`      |
| `paddingOnContainer`      | Give padding on the container of the whole slideover | `Boolean`                         | `true`      |
| `showHeader`              | Show or hide the slideover header                    | `Boolean`                         | `true`      |
| `as`                      | Render as a the following tag or component           | `String`                          | `div`       |
| `position`                | Position of the slideover                            | `left`,`right`                    | `right`     |
| `size`                    | Size of the slideover                                | `default`,`medium`,`large`,`full` | `medium`    |


!!!include(./src/parts/title-slots.md)!!!

### Slot `default`

Default slot for the slideover is perfect to place your content

### Slot `header`

Overrides the whole header of the slideover, when used, `title` and `subtitle` will not take any effects
The same applies for all the slots inside the header slot
The header by default contains the title, subtitle and close icon.


### Slot `top`

Top section of the slideover that contains the title and subtitle

### Slot `title`

Slot to override the title of the slideover

### Slot `subtitle`

Slot to override the subtitle of the slideover


### Slot `closeIcon`

Slot to override the close icon on the top right corner of the slideover

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





