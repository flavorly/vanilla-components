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

### Slot  `errors`

Slot that holds the error messages when the component `errors` prop is defined.

| Attribute   | Description               | Type              |
|:------------|:--------------------------|:------------------|
| `errors`    | The errors being injected | `[String, Array]` | 
| `hasErrors` | If the field has errors   | `Boolean`         | 

### Slot `feedback`

Slot that holds the feedback messages when the component `feedback` prop is defined.
When showing errors the feedback will be hidden by default, and vice-versa.

| Attribute  | Description               | Type                         |
|:-----------|:--------------------------|:-----------------------------|
| `errors`   | The errors being injected | `[String, Array, Undefined]` | 
| `feedback` | The feedback message      | `[String, Undefined]`        | 

