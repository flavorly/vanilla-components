### Slot `before`

Slot to override or pre-pend to the component before the component, ex: icon, etc.

| Attribute   | Description      | Type     |
|:------------|:-----------------|:---------|
| `className` | Classes injected | `String` |

### Slot `after`

Slot to override or append to the component before the component, ex: icon, etc.

Attributes specially injected to the `after` slot for some inputs ( Ex: Password )

| Attribute         | Description                        | Type      |
|:------------------|:-----------------------------------|:----------|
| `hasErrors`       | If the field has errors            | `Boolean` | 
| `type`            | Type of input                      | `String`  |
| `showingPassword` | If the password showing is toggled | `Boolean` |

!!!include(./slots-feedback-errors.md)!!!
