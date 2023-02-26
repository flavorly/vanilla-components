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


| Prop         | Description                                           | Accepted Values | Default     |
|:-------------|:------------------------------------------------------|:----------------|:------------|
| `title`      | Title for the alert                                   | `String`        | `undefined` |
| `subtitle`   | Subtitle for the alert                                | `String`        | `undefined` |
| `closable`   | Show the close button                                 | `Boolean`       | `false`     |
| `closeAfter` | Emit close event after defined amount of milliseconds | `Number`        | `undefined` |


<!--@include: ../../parts/title-slots.md-->

### Slot `default`

Default slot, overrides everything inside the alert, please beware that this will remove the title, subtitle and disable closing events.

### Slot `title`

Slot to override the title of the alert.

### Slot `subtitle`

Slot to override the subtitle of the alert.

### Slot `actions`

Slot for the alert on the bottom, below the subtitle.

<!--@include: ../../parts/title-events.md)-->

| Event   | Description      | Value     |
|:--------|:-----------------|:----------|
| `close` | Alert was closed | `Boolean` |

:::warning :bulb: A note on closing the alert
The `close` event is emitted when close button is clicked or automatically after `closeAfter` amount of milliseconds, if defined.
:::
