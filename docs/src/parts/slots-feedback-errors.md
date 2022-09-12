### Slot  `errors`

Slot that holds the error messages when the component `errors` prop is defined.

| Attribute     | Description               | Type              |
|:--------------|:--------------------------|:------------------|
| `localErrors` | The errors being injected | `[String, Array]` | 
| `hasErrors`   | If the field has errors   | `Boolean`         | 

### Slot `feedback`

Slot that holds the feedback messages when the component `feedback` prop is defined.
When showing errors the feedback will be hidden by default, and vice-versa.

| Attribute     | Description               | Type                         |
|:--------------|:--------------------------|:-----------------------------|
| `localErrors` | The errors being injected | `[String, Array, Undefined]` | 
| `feedback`    | The feedback message      | `[String, Undefined]`        | 
