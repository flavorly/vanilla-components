---
outline: deep
---

# Input

A Native `<input />` for text, number, etc. with additional features for password input with hide & show button.

## Preview & Playground :framed_picture:

Here you may find a preview of the component, with error & possible variants.

<wrapper src="components/input/demo" />

## Props :inbox_tray:

Props available for this component extending the default variant & global props.


| Prop          | Description                | Accepted Values | Default  |
|:--------------|:---------------------------|:----------------|:---------|
| `placeholder` | Placeholder for this input | `String`        | `''`     |
| `type`        | Type of input              | `String`        | `'text'` |

## Slots :dna:

Extends the default slots but binds the following properties to the `after`


| Slot    | Attribute                  | Description |
|:--------|:---------------------------|:------------|
| `after` | Placeholder for this input | `String`    | 
| `after` | Type of input              | `String`    |


Slots available for this component extending the default variant & global slots.

## Snippet :surfer:

Here you may find a preview of the component, with error & possible variants.

<<< @/components/input/ExampleInput.vue

