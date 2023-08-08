---
outline: deep
---

# Changelog

## Vanilla Components

All notable changes to `@flavorly/vanilla-components` will be documented in this section

### 0.7.61
- Textarea: Fix Wait for mount to determine the size

### 0.7.58-0.7.60
- Input: Placeholder empty as default
- Phone Number: Removed `libphonenumber-js` dependency

### 0.7.57
- Datatables: Expose all methods

### 0.7.55 & 0.7.56
- Rich Radio: Allow unselect options on clicking again
- Text Area: Fixed auto-size and added option for max-size in height

### 0.7.54
- Rich Radio Option: Added, success, purple & orange variants
- Form Group: Label Leading classes by default to avoid breaking lines to early

### 0.7.53
- Datatables: Pass the link to fetch the data while refreshing
- Dropdown: new popper modifier

### 0.7.51 & 0.7.52
- Tags Input: New Component Added

### 0.7.48 & 0.7.49
- Checkbox & Checkbox group: Unique Ids for Nested Checkboxes
- Toggle & Toggle group: Unique Ids for Nested Toggles


### 0.7.47
- Checkbox & Checkbox group: Added disabled state
- Toggle & Toggle group: Added disabled state
- Textarea: Added disabled state
- Rich Select: Added disabled state
- Date Input: Added disabled state
- Select Input: Added disabled state
- Dropdown & Dropdown Menu: Added disabled state
- Button : Fixed Disabled State vs Valid State
- Core: Error Variant Fallback
- Docs: Added examples for Disabled State

### 0.7.48
- Textarea: Fix rows prop
- CheckboxGroup: Fix disabled state
- RichRadio: Fix disabled state

### 0.7.47

### 0.7.46
- DropdownOption: Ability to pass components in `as` prop
- DropdownMenu: Added `open` state to trigger slot

### 0.7.45
- Button: Ability to pass components in `as` prop
- Slideover: Added `extraLarge` size

### 0.7.44

- Checkbox: Added High Contrast Support for Checkbox Group

### 0.7.45
- Checkbox Group: Fixed issue with variants
- Global: Fixed issue with errors state

### 0.7.43
- Alert: Added ability to add raw icons/emojis
- Input: Fixed issue with Leading text on tailwind
- Better Input Group formatting
- Button : Can now be fully rounded, or rounded on one side only
- General: Switching Borders to Rings
- Checkbox Group: Added Options to navigate with keyboard
- Textarea: Added `resize` prop to allow for resizing the textarea automatically
- Variants: Ability to use a custom error variant

### 0.7.42
- Dialog : Removed `bodyClasses` prop, please use `classes: { body: '...' }` instead
- Dialog : Removed `bodyDivided` & `bodyDarker` props, please use `classes: { body: 'divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800 bg-gray-50' }` instead
- Dialog : `paddingOnModal` was renamed to `padding` and now defaults to `false`
- Dialog: `bodyWithPadding` was renamed to `bodyPadding` and now defaults to `true`
- Dialog: added `position` prop to allow positioning the dialog on the screen on : `top`, `bottom`, `left`, `right`, `center`
- Dialog: Added more classes for better customization and granular control
- Dialog: Refactor on how the paddings are set, this should be smart enough to understand when it needs to give padding on top/bottom depending on the content / header and footer slots
- Rich Select: Fixed issue that was not able to be focused when clicking a label with a `for` attribute
- Rich Select: Fixed issue that would let re-focus on leave when toggleOnFocus is set
- Button: Changed default text size on Mobile to `text-sm`

### 0.7.41
- Datetime : Removed & Deprecated `@flavorly/v-calendar` dependency, please use `v-calendar@next` instead tagged 3.0.0
- Datetime : Added `v-calendar@next` as a peer dependency
- Targets: Added `esnext` & `node 16` as a target, supporting async component loading
- Dropdown: fixed issues with border radius
- Phone Input: Removed `libphonenumber-js` dependency in favor of `awesome-phonenumber`
- Bundling: Added deps to bundling, and left only `@headlessui/vue` & `@popperjs/core` as a peer dependency
- Country Input: Lazy Load Flag Icons
- Flag: Moved to Async Component

### 0.7.40
- Feature: Introduced Options API for all components, allowing for more flexibility and customization of behavior
- **Breaking Change**: All components by default will not trigger back to regular variant after an error, please use the options API to enable this behavior
- Avatar : Added `size` class to allow for customizing the size of the avatar without breaking the other styles
- Alert: Improved styling
- Card: Fixed issue with `bodyDarker` prop that allowed content to overflow
- Dropdown: Swaped from border to Ring & added small size, also fixed teleport issues & transition effects
- General : Main element ref is now available on all components as `root`
- Input: Defaults to type "text" if no type is provided
- InputGroup: Prefers `gap` over `space` between elements, avoiding empty nodes to create space in DOM & Fixed Types
- Phone Input: Fixed issue that would not allow initial indicative to be set on first render
- Rich Select: Fixed issue that would still allow to clear the input while `clearable` was set to false
- Slideover: Fixed issue with overflow on body, now its set to auto, to avoid scrollbars when they are not needed

### 0.7.39
- Input: Fixed issues with border

### 0.7.38
- Core : Added `$reset` modified to `classes` and `fixedClasses`giving the ability to reset all generated classes BEFORE the modified ( Inspired by Formkit )
- Input: Added more padding to the input element
- Phone Input: Fixed Classes for addon with phone indicative

### 0.7.37
- Inputs & Select : Issues with `focus-within` & `focus outline` element when it was triggered by keyboard event
- Docs: Added more variants to select & input component

### 0.7.36
- Icons : Removing all icons from the package
- Deps: Removing `@heroicons/vue` dependency

### 0.7.35
- Alert Component : `closeAfter` prop renamed to `timeout`
- Alert Component : Icon is no longer auto-generated based on variant, you must provide it yourself as a key `success`,`error`, `warning`, `info`
- Alert Component : Transitions added for better DX
- Alert Component : Re-worked on close event to be more consistent and cleanup
- Alert Component : Added `icon` slot to override icon
- Alert Component : Added 4 new variants: `muted`, `error-muted`, `warning-muted`, `info-muted`, `success-muted`
- Rich Select: Fixed styling issue with `focus-within` on `input` element when it was triggered by keyboard event
- Rich Select: Fixed styling issue with error variant
- Input: Fixed a little issue on error variant that was giving +1px jumps on focus
- Transitionable: Added proper duration & props forwarding
- Variants names should be now `camelCase`, users are able to use any casing they want, but the variants will be converted to `snakeCase` before being applied


### 0.7.34
- Tailwind : Switched Borders with Rings where it makes sense to do so
- Docs: Adjusted documentation theming for better dark mode constrast

### 0.7.33
- Tailwind : Switched Borders with Rings where it makes sense to do so
- Docs: Adjusted documentation theming for better dark mode constrast

### 0.7.32
- Added support [Web Types](https://github.com/JetBrains/web-types/tree/master)

### 0.7.31

- General: Moved compiler to Unbuild for better performance on inertia & hybridly packages
- Docs: Refactor to documentation theme
- General: Optimized build workflow
- General: Optimized tsconfig and package.json deps
- General: Optimized pnpm workflow/workspaces
- Exporting Presets for Tailwind for both docs & dist folders
- Docs: Improved documentation
- Added: defineConfiguration & mergeConfiguration export, to allow for customizing the components while keeping the defaults / deep merge


### 0.7.30

- General: Removed Axios Dependency in favor of native Fetch
- Rich Select: Added support for pulling options from an API endpoint
- Rich Select: Added support for pre-fetching while using API Endpoint
- Rich Select: Emit `optionSelected` event when value changes with the full option(s) object
- Datatables: Rich select filters now supports multiple values
- Datatables: Rich select filters now supports pre-fetching while using API Endpoint
- Datatables: Refactor to how filters are cleaned up, supporting arrays as values for filters
- General : Bugfixes


### 0.7.27

- Nothing

### 0.7.27

- Added `Inertia` & `Hybridly` support for Datatables actions
- Docs: Removed own Kishi implementation
- Created 2 Packages for Inertia & Hybridly Integration
- Published `@flavorly/vanilla-components-inertia`
- Published `@flavorly/vanilla-components-hybridly`



## Laravel Vanilla Components

### 0.0.9

- Added Rich Select prefetch & endpoint support to match the new feature on the frontend
- Added helper method to return formatted results for Rich Select
- Added support for multiple valeus for Rich Select

### 0.0.8

- Added `Inertia` & `Hybridly` support for Datatables actions
- Support for overriding Datatables Query, Filters & Search methods
- Refactor on how the query buildere workings for Datatables



