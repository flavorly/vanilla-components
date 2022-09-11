---
outline: deep
---

# Avatar

<script setup>
    import ExampleAvatar from './ExampleAvatar.vue';
    import {VanillaButton} from '@indigit/vanilla-components';
</script>

<div class="vp-raw">
<h1>test</h1>
    <button class="rounded-md sm:text-sm text-base font-medium leading-6 whitespace-nowrap focus:outline-none focus:ring-2 dark:focus:ring-offset-gray-900 focus:ring-primary-600 text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:focus:border-primary-600 block justify-center inline-flex items-center shadow px-4 py-2 focus:ring-offset-2 cursor-pointer h-full opacity-100">
    Im   test
    </button>
</div>
<div class="vp-raw">
    <div class="p-6 bg-gray-100 dark:bg-[#282c34] font-inter antialiased text-gray-800 dark:text-white">
        <div class="relative">
            <ExampleAvatar />
        </div>
    </div>
</div>

A Avatar component useful for User Profile Pictures, support uploading new pictures or display an existing one.

!!!include(./src/_includes/title-preview.md)!!!

<wrapper src="components/avatar/demo" />

!!!include(./src/_includes/title-snippet.md)!!!

<<< @/components/avatar/ExampleAvatar.vue

!!!include(./src/_includes/title-props.md)!!!

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

!!!include(./src/_includes/title-slots.md)!!!

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
| `hasErrors`               | If the component has errors | `Boolean`        |
| `photoPreview`            | Base64 enconded blob        | `[Blog, String]` |


### Slot `resetButton`

Slot to override the default reset button next to the profile photo and when a preview is in place

| Attribute      | Description                  | Type             |
|:---------------|:-----------------------------|:-----------------|
| `resetPhoto`   | Function to reset the upload | `Function`       |
| `hasErrors`    | If the component has errors  | `Boolean`        |
| `photoPreview` | Base64 enconded blob         | `[Blog, String]` |


!!!include(./src/_includes/slots-feedback-errors.md)!!!

