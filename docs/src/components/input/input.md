---
outline: deep
---

# Input

A Native `<input />` for text, number, etc. with additional features for password input with hide & show button.

## 🎨  Preview & Playground

Here you may find a preview of the component, with error & possible variants.

<wrapper src="components/input/demo" />

## 📥 Props

Props available for this component extending the default variant & global props.


| Prop          | Description                | Accepted Values | Default  |
|:--------------|:---------------------------|:----------------|:---------|
| `placeholder` | Placeholder for this input | `String`        | `''`     |
| `type`        | Type of input              | `String`        | `'text'` |

## 🧬 Slots

Extends the default slots but binds the following properties to the `after`


| Prop              | Description/Type  |
|:------------------|:------------------|
| `hasErrors`       | true / false      | 
| `type`            | Type of input     |
| `showingPassword` | true/false        |


Slots available for this component extending the default variant & global slots.

## 🙇‍♂️ Example & Snippet

Here you may find a preview of the component, with error & possible variants.

<<< @/components/input/ExampleInput.vue

