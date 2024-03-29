---
outline: deep
---

# Alert

With Alert components you can provide contextual feedback messages for typical user actions with handful of available contexts.

<!--@include: ../../parts/title-preview.md-->

<ExampleAlert />

:::details :surfer: Click to expand the code
<<< @/components/ExampleAlert.vue
:::

<!--@include: ../../parts/title-props.md-->


| Prop           | Description                                                                | Accepted Values | Default     |
|:---------------|:---------------------------------------------------------------------------|:----------------|:------------|
| `modelValue`   | v-model for the alert show/hide                                            | `Boolean`       | `true`      |
| `title`        | Title for the alert                                                        | `String`        | `undefined` |
| `text`         | text for the alert                                                         | `String`        | `undefined` |
| `icon`         | info, warning, error, success                                              | `String`        | `undefined` |
| `iconRaw`      | raw html /                                                                 | `String`        | `undefined` |
| `closable`     | Show the close button                                                      | `Boolean`       | `false`     |
| `timeout`      | Emit close event after defined amount of milliseconds and closes the alert | `Number`        | `undefined` |
| `dismissLabel` | Label for dismiss for screen readers                                       | `String`        | `Close`     |


<!--@include: ../../parts/title-slots.md-->

### Slot `default`

Default slot, overrides everything inside the alert, please beware that this will remove the title, subtitle and disable closing events.

### Slot `title`

Slot to override the title of the alert.

### Slot `text`

Slot to override the subtitle/text of the alert.

### Slot `actions`

Slot for the alert on the bottom, below the subtitle.

### Slot `close`

Slot to override the close button / icon, provides a `close` method to close the alert internally.


### Slot `icon`

Slot to override the icon of the alert, provides a `icon` prop with the icon name.


<!--@include: ../../parts/title-events.md-->


| Event   | Description      | Value     |
|:--------|:-----------------|:----------|
| `close` | Alert was closed | `Boolean` |

:::warning :bulb: A note on closing the alert
The `close` event is emitted when close button is clicked or automatically after `closeAfter` amount of milliseconds, if defined.
also when close is triggered manually via the `close` method the timeout is cleared and close event is instantly emitted.
:::
