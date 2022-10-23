---
outline: deep
---

# Shared Properties

Each component has a set of properties that are shared across all components. These properties are used to control the component's behavior and appearance.
Here you will find all of them and their behaviour or usage.

| Prop            | Description                                                             | Type      | Default      |
|:----------------|:------------------------------------------------------------------------|:----------|:-------------|
| `classes`       | List of Classes to override or use for the component                    | `Object`  | `undefined`  |
| `fixedClasses`  | List of Fixed Classes to override or use for the component              | `Object`  | `undefined`  |
| `variants`      | List of Variants to override or use for the component                   | `Object`  | `undefined`  |
| `variant`       | Variant to use for the component                                        | `String`  | `undefined`  |
| `errors`        | String with the errors for the component                                | `String`  | `undefined`  |
| `feedback`      | A feedback to show bellow the component, hidden when errors are present | `String`  | `undefined`  |
| `name`          | A name for the component or input                                       | `String`  | `uniqueId()` |
| `autocomplete`  | A name for the component or input to auto-complete from browser         | `String`  | `uniqueId()` |
| `hasItemBellow` | If the component has more components bellow                             | `Boolean` | `false`      |
| `hasItemAbove`  | If the component has more components above                              | `Boolean` | `false`      |
| `rounded`       | If the component should be rounded on what corners                      | `string`  | `full`       |
| `showErrors`    | If we should show the errors for this component                         | `Boolean` | `true`       |
| `showFeedback`  | If we should show the feedback for this component                       | `Boolean` | `true`       |

