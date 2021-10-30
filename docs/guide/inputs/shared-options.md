## Input Global Properties

All the inputs have standard layouts & options out-the-box.

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `label`    | The Label for the field     | String   | `''` |
| `name`     | Name for this field, will be also used for ID | String | `Random String`|
| `nameSeed` | Seed the name & ID with a prefix | String | `Random String`|
| `help` | Helper that shows bellow the field | String | `''`|
| `errors` | Array or String of the errors | Array|String | `[]`|
| `showErrors` | Control to show errors or user will handle the errors | Boolean | `true`|
| `showLeadingErrorIcon` | Show or hide the errors icon next to the field | Boolean | `true`|
| `grouped`    | If the field is grouped and has slots above or bellow | 'above', 'bellow' | `undefined` |

## Input Global Events

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `modelValue`    | The Value selected | Any   | `undefined or null` |


## Errors, Label, Helper & Layout

The inputs pair with a set of utilities for daily usage and nice UI and UX
We will include labels, errors, input helpers & layout
You can use the safe option in some of them to ensure html rendering, please keep in mind the XSS attacks.

### Usage
```vue
<x-form-errors :errors="'You are damn wrong'" />

<x-form-helper :text="'In this field you must do something special'" :safe="false" />

<x-form-label :value="'email'" :labelFor="'email'" />
```
