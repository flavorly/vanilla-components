---
outline: deep
---

# Avatar

A Avatar component useful for User Profile Pictures, support uploading new pictures or display an existing one.

## Preview & Playground :framed_picture:

Here you may find a preview of the component, with error & possible variants.

<wrapper src="components/avatar/demo" />

## Props :inbox_tray:

Props available for this component extending the default variant & global props.


| Prop                  | Description                                     | Accepted Values       | Default       |
|:----------------------|:------------------------------------------------|:----------------------|:--------------|
| `currentPhotoUrl`     | The current URL for the photo                   | `String`,`undefined`  | `undefined`   |
| `currentPhotoAltTag`  | Alternative Text for the photo                  | `String`              | `'avatar'`    |
| `avatarInitials`      | Initials text if no currentPhotoUrl is provided | `String`              | `'avatar'`    |
| `avatarInitials`      | Initials text if no currentPhotoUrl is provided | `String`              | `'avatar'`    |
| `uploadButtonLabel`   | Label for the default button                    | `String`              | `'avatar'`    |
| `resetButtonLabel`    | Label for the reset button                      | `String`              | `'avatar'`    |
| `uploadButtonVariant` | Variant for the upload button                   | `String` ,`undefined` | `undefined`   |
| `resetButtonVariant`  | Variant for the reset button                    | `String` ,`undefined` | `'undefined'` |

## Slots :dna:

Extends the default slots but binds the following properties to the `after`


| Slot              | Description/Type  |
|:------------------|:------------------|
| `hasErrors`       | true / false      | 
| `type`            | Type of input     |
| `showingPassword` | true/false        |


Slots available for this component extending the default variant & global slots.

## Snippet :surfer:

Here you may find a preview of the component, with error & possible variants.

<<< @/components/avatar/ExampleAvatar.vue

