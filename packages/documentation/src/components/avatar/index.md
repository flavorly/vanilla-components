---
outline: deep
---

# Avatar

A Avatar component useful for User Profile Pictures, support uploading new pictures or display an existing one.

!!!include(./src/parts/title-preview.md)!!!

<script setup>
    import ExampleAvatar from './ExampleAvatar.vue';
</script>

<ExampleAvatar />

:::details :surfer: Click to expand the code
<<< @/components/avatar/ExampleAvatar.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop                  | Description                    | Accepted Values      | Default       |
|:----------------------|:-------------------------------|:---------------------|:--------------|
| `modelValue`          | The value for the element      | `Any`                | `undefined`   |
| `currentPhotoUrl`     | Current Photo URL              | `[String,undefined]` | `undefined`   |
| `currentPhotoAltTag`  | Alternative Text for the photo | `String`             | `'avatar'`    |
| `avatarInitials`      | Short Initials for the Avatar  | `String`             | `'avatar'`    |
| `uploadButtonLabel`   | Label for the default button   | `String`             | `'avatar'`    |
| `resetButtonLabel`    | Label for the reset button     | `String`             | `'avatar'`    |
| `uploadButtonVariant` | Variant for the upload button  | `[String,undefined]` | `undefined`   |
| `resetButtonVariant`  | Variant for the reset button   | `[String,undefined]` | `'undefined'` |

!!!include(./src/parts/title-slots.md)!!!

### Slot `photo`

Slot dedicated to show the current photo preview, binds *all the props* passed to the component, plus the following:

| Attribute                 | Description                | Type       |
|:--------------------------|:---------------------------|:-----------|
| `triggerFileUploadAction` | Function to trigger upload | `Function` |

### Slot `preview`

Slot dedicated to show the preview of the new uploaded photo, binds *all the props* passed to the component, plus the following:

| Attribute      | Description          | Type             |
|:---------------|:---------------------|:-----------------|
| `photoPreview` | Base64 enconded blob | `[Blog, String]` |

### Slot `uploadButton`

Slot to override the default upload button next to the profile photo

| Attribute                 | Description                 | Type             |
|:--------------------------|:----------------------------|:-----------------|
| `triggerFileUploadAction` | Function to trigger upload  | `Function`       |
| `photoPreview`            | Base64 enconded blob        | `[Blog, String]` |


### Slot `resetButton`

Slot to override the default reset button next to the profile photo and when a preview is in place

| Attribute      | Description                  | Type             |
|:---------------|:-----------------------------|:-----------------|
| `resetPhoto`   | Function to reset the upload | `Function`       |
| `photoPreview` | Base64 enconded blob         | `[Blog, String]` |


!!!include(./src/parts/slots-feedback-errors.md)!!!

